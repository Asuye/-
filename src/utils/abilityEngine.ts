import type { Ability, PlayerStats, CalculatedStats, ActiveAbility, AbilitySynergy, SpecialEffect } from '@/types/ability';
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
  const specialEffects: SpecialEffect[] = [];
  
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
    if (effect.type === 'stat_boost' && effect.stat) {
      if (effect.isPercentage) {
        percentBoosts[effect.stat] = (percentBoosts[effect.stat] || 0) + (effect.value || 0);
      } else {
        flatBoosts[effect.stat] = (flatBoosts[effect.stat] || 0) + (effect.value || 0);
      }
    } else if (effect.type === 'special_effect' && effect.specialEffect) {
      const existingEffect = specialEffects.find(
        e => e.type === effect.specialEffect!.type
      );
      if (existingEffect) {
        existingEffect.value += effect.specialEffect.value;
        if (effect.specialEffect.chance && existingEffect.chance) {
          existingEffect.chance = Math.min(100, existingEffect.chance + effect.specialEffect.chance);
        }
      } else {
        specialEffects.push({ ...effect.specialEffect });
      }
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
      critDamage,
      specialEffects
    },
    conflicts,
    synergies: activeSynergies
  };
}

export function calculatePower(stats: CalculatedStats): number {
  let power = Math.floor(
    stats.attack * 2 +
    stats.defense * 1.5 +
    stats.hp / 10 +
    stats.speed * 3 +
    stats.critRate * 2 +
    stats.critDamage
  );
  
  for (const effect of stats.specialEffects) {
    switch (effect.type) {
      case 'double_strike':
        power += (effect.chance || 0) * 2;
        break;
      case 'triple_strike':
        power += (effect.chance || 0) * 3;
        break;
      case 'lifesteal':
        power += effect.value * 3;
        break;
      case 'dodge':
        power += (effect.chance || 0) * 2;
        break;
      case 'counter':
        power += (effect.chance || 0) * 1.5;
        break;
      case 'pierce':
        power += effect.value * 1.5;
        break;
      case 'poison':
      case 'burn':
      case 'freeze':
        power += effect.value * 2;
        break;
      case 'shield':
        power += effect.value * 3;
        break;
      case 'heal_over_time':
        power += effect.value * 4;
        break;
      case 'damage_reduction':
        power += effect.value * 2;
        break;
      case 'reflect':
      case 'thorns':
        power += effect.value * 1.5;
        break;
      case 'speed_burst':
      case 'power_surge':
        power += effect.value * 2;
        break;
      case 'critical_bonus':
        power += effect.value;
        break;
      case 'execute':
        power += effect.value * 3;
        break;
      case 'cleave':
      case 'splash':
        power += effect.value * 2;
        break;
    }
  }
  
  return power;
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

export function getEffectIcon(type: string): string {
  const icons: Record<string, string> = {
    double_strike: '⚔️',
    triple_strike: '⚔️⚔️',
    lifesteal: '💉',
    dodge: '💨',
    counter: '↩️',
    pierce: '🔱',
    poison: '☠️',
    burn: '🔥',
    freeze: '❄️',
    shield: '🛡️',
    heal_over_time: '💚',
    damage_reduction: '⛓️',
    reflect: '🔙',
    thorns: '🌵',
    speed_burst: '⚡',
    power_surge: '💥',
    critical_bonus: '💢',
    execute: '💀',
    cleave: '🗡️',
    splash: '💦'
  };
  return icons[type] || '✨';
}

export function getEffectName(type: string): string {
  const names: Record<string, string> = {
    double_strike: '双重打击',
    triple_strike: '三连击',
    lifesteal: '吸血',
    dodge: '闪避',
    counter: '反击',
    pierce: '破甲',
    poison: '中毒',
    burn: '灼烧',
    freeze: '冰冻',
    shield: '护盾',
    heal_over_time: '再生',
    damage_reduction: '减伤',
    reflect: '反射',
    thorns: '荆棘',
    speed_burst: '疾风',
    power_surge: '狂暴',
    critical_bonus: '暴击强化',
    execute: '斩杀',
    cleave: '横扫',
    splash: '溅射'
  };
  return names[type] || '特殊效果';
}
