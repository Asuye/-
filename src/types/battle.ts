import type { Stats } from './card';
import type { ActiveBond } from './bond';

export interface BattleUnit {
  name: string;
  maxHp: number;
  currentHp: number;
  attack: number;
  defense: number;
  speed: number;
  skills: { name: string; cooldown: number; currentCooldown: number }[];
}

export interface BattleLogEntry {
  turn: number;
  actor: string;
  action: string;
  target?: string;
  damage?: number;
  heal?: number;
  effect?: string;
}

export interface BattleState {
  turn: number;
  phase: 'player' | 'enemy' | 'victory' | 'defeat';
  player: BattleUnit;
  enemy: BattleUnit;
  activeBonds: ActiveBond[];
  logs: BattleLogEntry[];
}

export interface Enemy {
  id: string;
  name: string;
  stats: Stats;
  skills: { name: string; cooldown: number; damage: number }[];
  description: string;
  rewards: {
    gold: number;
    exp: number;
  };
}
