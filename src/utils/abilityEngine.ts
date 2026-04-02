import type { Ability, PlayerStats, CalculatedStats, ActiveAbility, AbilitySynergy } from '@/types/ability';
import { abilityDatabase, synergyDatabase, getAbilityById } from '@/data/abilities';

const baseStats: PlayerStats = {
  baseAttack: 50,
  baseDefense: 30,
  baseHp: 300,
  baseSpeed: 20,
  baseCritRate: 5,
  baseCritDamage: 50
};

export function calculateStats(activeAbilities: ActiveAbility[]): {
  stats: CalculatedStats;
  conflicts: string[];
  synergies: AbilitySynergy[];
} {
  let attack = baseStats.baseAttack;
  let defense = baseStats.baseDefense;
  let hp = baseStats.baseHp;
  let speed = baseStats.baseSpeed;
  let critRate = baseStats.baseCritRate;
  let critDamage = baseStats.baseCritDamage;
  
  const conflicts: string[] = [];
  const activeAbilityIds = activeAbilities.map(a => a.ability.id);
  
  for (const active of activeAbilities) {
    const ability = active.ability;
    for (const conflictId of ability.conflictsWith) {
      if (activeAbilityIds.includes(conflictId) && !conflicts.includes(ability.name)) {
        const conflictAbility = getAbilityById(conflictId);
        if (conflictAbility) {
          conflicts.push(`${ability.name} ↔ ${conflictAbility.name}`);
        }
      }
    }
  }
  
  const activeSynergies: AbilitySynergy[] = [];
  for (const synergy of synergyDatabase) {
    const hasAll = synergy.abilities.every(id => activeAbilityIds.includes(id));
    if (hasAll) {
      activeSynergies.push(synergy);
    }
  }
  
  const allEffects = [
    ...activeAbilities.flatMap(a => a.ability.effects),
    ...activeSynergies.flatMap(s => [s.effect])
  ];
  
  const flatBoosts: Record<string, number> = {};
  const percentBoosts: Record<string, number> = {};
  
  for (const effect of allEffects) {
    if (effect.type !== 'stat_boost' || !effect.stat) continue;
    if (effect.isPercentage) {
      percentBoosts[effect.stat] = (percentBoosts[effect.stat] || 0) + effect.value;
    } else {
      flatBoosts[effect.stat] = (flatBoosts[effect.stat] || 0) + effect.value;
    }
  }
  
  attack += flatBoosts.attack || 0;
  defense += flatBoosts.defense || 0;
  hp += flatBoosts.hp || 0;
  speed += flatBoosts.speed || 0;
  critRate += flatBoosts.crit_rate || 0;
  critDamage += flatBoosts.crit_damage || 0;
  
  attack = Math.max(1, Math.floor(attack * (1 + (percentBoosts.attack || 0) / 100)));
  defense = Math.max(1, Math.floor(defense * (1 + (percentBoosts.defense || 0) / 100)));
  hp = Math.max(1, Math.floor(hp * (1 + (percentBoosts.hp || 0) / 100)));
  speed = Math.max(1, Math.floor(speed * (1 + (percentBoosts.speed || 0) / 100)));
  critRate = Math.max(0, Math.min(100, critRate + (percentBoosts.crit_rate || 0)));
  critDamage = Math.max(50, critDamage + (percentBoosts.crit_damage || 0));
  
  return {
    stats: {
      ...baseStats,
      attack,
      defense,
      hp,
      speed,
      critRate,
      critDamage
    },
    conflicts,
    synergies: activeSynergies
  };
}

export function calculatePower(stats: CalculatedStats): number {
  return Math.floor(
    stats.attack * 2 +
    stats.defense * 1.5 +
    stats.hp / 10 +
    stats.speed * 3 +
    stats.critRate * 2 +
    stats.critDamage
  );
}

export function rollGacha(pityEpic: number, pityLegendary: number): {
  ability: Ability;
  pityEpic: number;
  pityLegendary: number;
} {
  let currentPityEpic = pityEpic + 1;
  let currentPityLegendary = pityLegendary + 1;
  
  let ability: Ability;
  
  if (currentPityLegendary >= 30) {
    const legendaries = abilityDatabase.filter(a => a.rarity === 'legendary');
    ability = legendaries[Math.floor(Math.random() * legendaries.length)];
    currentPityLegendary = 0;
    currentPityEpic = 0;
  } else if (currentPityEpic >= 10) {
    const epics = abilityDatabase.filter(a => a.rarity === 'epic' || a.rarity === 'legendary');
    ability = epics[Math.floor(Math.random() * epics.length)];
    if (ability.rarity === 'epic') {
      currentPityEpic = 0;
    } else {
      currentPityEpic = 0;
      currentPityLegendary = 0;
    }
  } else {
    const roll = Math.random() * 100;
    if (roll < 3) {
      const legendaries = abilityDatabase.filter(a => a.rarity === 'legendary');
      ability = legendaries[Math.floor(Math.random() * legendaries.length)];
      currentPityEpic = 0;
      currentPityLegendary = 0;
    } else if (roll < 15) {
      const epics = abilityDatabase.filter(a => a.rarity === 'epic');
      ability = epics[Math.floor(Math.random() * epics.length)];
      currentPityEpic = 0;
    } else if (roll < 40) {
      const rares = abilityDatabase.filter(a => a.rarity === 'rare');
      ability = rares[Math.floor(Math.random() * rares.length)];
    } else {
      const commons = abilityDatabase.filter(a => a.rarity === 'common');
      ability = commons[Math.floor(Math.random() * commons.length)];
    }
  }
  
  return { ability, pityEpic: currentPityEpic, pityLegendary: currentPityLegendary };
}
