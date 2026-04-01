import type { Card, Stats } from '@/types/card';
import type { Bond, ActiveBond, BondEffect } from '@/types/bond';
import { bondDatabase } from '@/data/bonds';

export function detectBonds(cards: Card[]): ActiveBond[] {
  const activeBonds: ActiveBond[] = [];
  const cardIds = cards.map(c => c.id);
  
  const elements = new Set(cards.map(c => c.element));
  const ssrCount = cards.filter(c => c.rarity === 'SSR').length;
  
  for (const bond of bondDatabase) {
    let activated = true;
    const sourceCards: string[] = [];
    
    for (const req of bond.requiredTags) {
      if (req.tag === 'elemental_diverse') {
        if (elements.size < req.count) {
          activated = false;
          break;
        }
        sourceCards.push(...cardIds.slice(0, req.count));
      } else if (req.tag === 'ssr_card') {
        if (ssrCount < req.count) {
          activated = false;
          break;
        }
        sourceCards.push(...cards.filter(c => c.rarity === 'SSR').map(c => c.id).slice(0, req.count));
      } else {
        const matchingCards = cards.filter(c => c.bondTags.includes(req.tag));
        if (matchingCards.length < req.count) {
          activated = false;
          break;
        }
        sourceCards.push(...matchingCards.slice(0, req.count).map(c => c.id));
      }
    }
    
    if (activated) {
      activeBonds.push({
        ...bond,
        sourceCards
      });
    }
  }
  
  return activeBonds;
}

export function calculateBondEffects(bonds: ActiveBond[]): BondEffect[] {
  return bonds.flatMap(bond => bond.effects);
}

export function applyEffects(baseStats: Stats, effects: BondEffect[]): Stats {
  const flatBoosts: Record<string, number> = {};
  const percentBoosts: Record<string, number> = {};
  
  for (const effect of effects) {
    if (effect.type === 'stat_boost' && effect.stat) {
      if (effect.isPercentage) {
        percentBoosts[effect.stat] = (percentBoosts[effect.stat] || 0) + effect.value;
      } else {
        flatBoosts[effect.stat] = (flatBoosts[effect.stat] || 0) + effect.value;
      }
    }
  }
  
  const result = { ...baseStats };
  for (const [stat, value] of Object.entries(flatBoosts)) {
    if (stat in result) {
      result[stat as keyof Stats] += value;
    }
  }
  for (const [stat, value] of Object.entries(percentBoosts)) {
    if (stat in result) {
      result[stat as keyof Stats] = Math.floor(result[stat as keyof Stats] * (1 + value / 100));
    }
  }
  
  return result;
}

export function calculateTotalPower(cards: Card[], bonds: ActiveBond[]): number {
  if (cards.length === 0) return 0;
  
  const totalBaseStats = cards.reduce((sum, card) => {
    return sum + card.baseStats.attack + card.baseStats.defense + card.baseStats.hp / 10 + card.baseStats.speed;
  }, 0);
  
  const effects = calculateBondEffects(bonds);
  const avgStats = {
    attack: cards.reduce((s, c) => s + c.baseStats.attack, 0) / cards.length,
    defense: cards.reduce((s, c) => s + c.baseStats.defense, 0) / cards.length,
    hp: cards.reduce((s, c) => s + c.baseStats.hp, 0) / cards.length,
    speed: cards.reduce((s, c) => s + c.baseStats.speed, 0) / cards.length
  };
  
  const boostedStats = applyEffects(avgStats, effects);
  const totalBoostedStats = boostedStats.attack + boostedStats.defense + boostedStats.hp / 10 + boostedStats.speed;
  
  return Math.floor(totalBaseStats + (totalBoostedStats - (avgStats.attack + avgStats.defense + avgStats.hp / 10 + avgStats.speed)) * cards.length);
}
