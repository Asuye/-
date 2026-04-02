import type { CalculatedStats } from './ability';

export interface BattleUnit {
  name: string;
  maxHp: number;
  currentHp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
  critDamage: number;
}

export interface BattleLogEntry {
  turn: number;
  actor: string;
  action: string;
  target?: string;
  damage?: number;
  heal?: number;
  effect?: string;
  specialEffect?: string;
}

export interface BattleState {
  turn: number;
  phase: 'player' | 'enemy' | 'victory' | 'defeat';
  player: BattleUnit;
  enemy: BattleUnit;
  logs: BattleLogEntry[];
}

export interface Enemy {
  id: string;
  name: string;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
  critDamage: number;
  description: string;
  rewards: {
    gold: number;
    exp: number;
    gems: number;
  };
  specialAbilities?: string[];
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare' | 'legendary';
}
