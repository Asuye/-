import { create } from 'zustand';
import type { BattleState } from '@/types/battle';
import type { Card } from '@/types/card';
import type { ActiveBond } from '@/types/bond';
import type { Enemy } from '@/types/battle';
import { 
  initializeBattle, 
  executePlayerAttack, 
  executePlayerSkill, 
  executeEnemyTurn 
} from '@/utils/battleEngine';

interface BattleStore {
  battleState: BattleState | null;
  isBattling: boolean;
  
  startBattle: (cards: Card[], bonds: ActiveBond[], enemy: Enemy) => void;
  playerAttack: () => void;
  playerSkill: (skillIndex: number) => void;
  enemyTurn: () => void;
  endBattle: () => void;
  getBattleResult: () => 'victory' | 'defeat' | null;
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  battleState: null,
  isBattling: false,
  
  startBattle: (cards, bonds, enemy) => {
    const battleState = initializeBattle(cards, bonds, enemy);
    set({ battleState, isBattling: true });
  },
  
  playerAttack: () => {
    set(state => {
      if (!state.battleState || state.battleState.phase !== 'player') {
        return state;
      }
      const newBattleState = executePlayerAttack(state.battleState);
      return { battleState: newBattleState };
    });
  },
  
  playerSkill: (skillIndex: number) => {
    set(state => {
      if (!state.battleState || state.battleState.phase !== 'player') {
        return state;
      }
      const newBattleState = executePlayerSkill(state.battleState, skillIndex);
      return { battleState: newBattleState };
    });
  },
  
  enemyTurn: () => {
    set(state => {
      if (!state.battleState || state.battleState.phase !== 'enemy') {
        return state;
      }
      const newBattleState = executeEnemyTurn(state.battleState);
      return { battleState: newBattleState };
    });
  },
  
  endBattle: () => {
    set({ battleState: null, isBattling: false });
  },
  
  getBattleResult: () => {
    const state = get();
    if (!state.battleState) return null;
    if (state.battleState.phase === 'victory') return 'victory';
    if (state.battleState.phase === 'defeat') return 'defeat';
    return null;
  }
}));
