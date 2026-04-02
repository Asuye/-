import { create } from 'zustand';
import type { BattleState } from '@/types/battle';
import type { Enemy } from '@/types/battle';
import type { CalculatedStats } from '@/types/ability';
import { 
  createBattleState, 
  processBattle 
} from '@/utils/battleEngine';

interface BattleStore {
  battleState: BattleState | null;
  isBattling: boolean;
  specialEffects: any[];
  
  startBattle: (playerStats: CalculatedStats, enemy: Enemy, specialEffects: any[]) => void;
  nextTurn: () => void;
  endBattle: () => void;
  getBattleResult: () => 'victory' | 'defeat' | null;
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  battleState: null,
  isBattling: false,
  specialEffects: [],
  
  startBattle: (playerStats, enemy, specialEffects) => {
    const battleState = createBattleState(playerStats, enemy);
    set({ battleState, isBattling: true, specialEffects });
  },
  
  nextTurn: () => {
    set(state => {
      if (!state.battleState || state.battleState.phase === 'victory' || state.battleState.phase === 'defeat') {
        return state;
      }
      const newBattleState = processBattle(state.battleState, state.specialEffects);
      return { battleState: newBattleState };
    });
  },
  
  endBattle: () => {
    set({ battleState: null, isBattling: false, specialEffects: [] });
  },
  
  getBattleResult: () => {
    const state = get();
    if (!state.battleState) return null;
    if (state.battleState.phase === 'victory') return 'victory';
    if (state.battleState.phase === 'defeat') return 'defeat';
    return null;
  }
}));
