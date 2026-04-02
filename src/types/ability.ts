export type AbilityRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type AbilityCategory = 'attack' | 'defense' | 'utility' | 'special';

export type SpecialEffectType =
  | 'double_strike'
  | 'triple_strike'
  | 'lifesteal'
  | 'dodge'
  | 'counter'
  | 'pierce'
  | 'poison'
  | 'burn'
  | 'freeze'
  | 'shield'
  | 'heal_over_time'
  | 'damage_reduction'
  | 'reflect'
  | 'thorns'
  | 'speed_burst'
  | 'power_surge'
  | 'critical_bonus'
  | 'execute'
  | 'cleave'
  | 'splash';

export interface SpecialEffect {
  type: SpecialEffectType;
  value: number;
  chance?: number;
  description: string;
}

export interface AbilityEffect {
  type: 'stat_boost' | 'special_effect';
  stat?: 'attack' | 'defense' | 'hp' | 'speed' | 'crit_rate' | 'crit_damage';
  value?: number;
  isPercentage?: boolean;
  specialEffect?: SpecialEffect;
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
  specialEffects: SpecialEffect[];
}

export interface AbilitySynergy {
  name: string;
  description: string;
  abilities: string[];
  effect: AbilityEffect;
}
