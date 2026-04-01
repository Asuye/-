export type Rarity = 'N' | 'R' | 'SR' | 'SSR';
export type CardType = 'attack' | 'defense' | 'support' | 'special';
export type Element = 'fire' | 'water' | 'wind' | 'earth' | 'light' | 'dark';

export interface Stats {
  attack: number;
  defense: number;
  hp: number;
  speed: number;
}

export interface SkillEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff';
  value: number;
  element?: Element;
  stat?: keyof Stats;
}

export interface Skill {
  name: string;
  description: string;
  cooldown: number;
  effect: SkillEffect;
}

export interface Card {
  id: string;
  name: string;
  rarity: Rarity;
  type: CardType;
  element: Element;
  baseStats: Stats;
  skill: Skill;
  bondTags: string[];
  description: string;
}

export interface OwnedCard extends Card {
  instanceId: string;
  level: number;
}
