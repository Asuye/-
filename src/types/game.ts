import type { Card, OwnedCard } from './card';
import type { Bond, ActiveBond } from './bond';
import type { Stage } from './stage';

export interface PlayerState {
  level: number;
  exp: number;
  expToNext: number;
  gold: number;
  gems: number;
  energy: number;
  maxEnergy: number;
}

export interface GachaState {
  pitySR: number;
  pitySSR: number;
  totalPulls: number;
}

export interface GameState {
  player: PlayerState;
  ownedCards: OwnedCard[];
  deck: string[];
  unlockedStages: string[];
  completedStages: string[];
  stageStars: Record<string, number>;
  gacha: GachaState;
  activeBonds: ActiveBond[];
}

export type { Card, OwnedCard, Bond, ActiveBond, Stage };
