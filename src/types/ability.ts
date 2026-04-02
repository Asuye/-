export type AbilityRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type AbilityCategory = 'attack' | 'defense' | 'utility' | 'special';

export interface AbilityEffect {
  type: 'stat_boost' | 'skill_mod' | 'special' | 'conditional';
  stat?: 'attack' | 'defense' | 'hp' | 'speed' | 'crit_rate' | 'crit_damage';
  value: number;
  isPercentage: boolean;
  condition?: string;
}

export interface Ability {
  id: string;
  name: string;
  rarity: AbilityRarity;
  category: AbilityCategory;
  description: string;
  effects: AbilityEffect[];
  tags: string[];
  conflictsWith: string[];
  synergizesWith: string[];
}

export interface ActiveAbility {
  ability: Ability;
  level: number;
}

export interface PlayerStats {
  baseAttack: number;
  baseDefense: number;
  baseHp: number;
  baseSpeed: number;
  baseCritRate: number;
  baseCritDamage: number;
}

export interface CalculatedStats extends PlayerStats {
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  critRate: number;
  critDamage: number;
}

export interface AbilitySynergy {
  name: string;
  description: string;
  abilities: string[];
  effect: AbilityEffect;
}
