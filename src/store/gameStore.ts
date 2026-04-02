import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Ability, ActiveAbility, AbilitySynergy, CalculatedStats } from '@/types/ability';
import { calculateStats, calculatePower, rollGacha } from '@/utils/abilityEngine';

const STORAGE_KEY = 'ability-game-state';

interface GameState {
  player: {
    level: number;
    exp: number;
    expToNext: number;
    gold: number;
    gems: number;
  };
  ownedAbilities: Ability[];
  activeAbilities: ActiveAbility[];
  unlockedStages: string[];
  completedStages: string[];
  gacha: {
    pityEpic: number;
    pityLegendary: number;
    totalPulls: number;
  };
  stats: CalculatedStats;
  conflicts: string[];
  synergies: AbilitySynergy[];
  power: number;
  
  addExp: (amount: number) => void;
  addGold: (amount: number) => void;
  addGems: (amount: number) => void;
  addAbility: (ability: Ability) => void;
  removeAbility: (abilityId: string) => void;
  setActiveAbilities: (abilityIds: string[]) => void;
  activateAbility: (abilityId: string) => void;
  deactivateAbility: (abilityId: string) => void;
  unlockStage: (stageId: string) => void;
  completeStage: (stageId: string, stars: number) => void;
  doGacha: (count: number) => Ability[] | null;
  updateStats: () => void;
  resetGame: () => void;
}

const initialState: Omit<GameState, 'stats' | 'conflicts' | 'synergies' | 'power' | keyof Omit<GameState, 'player' | 'ownedAbilities' | 'activeAbilities' | 'unlockedStages' | 'completedStages' | 'gacha'>> = {
  player: {
    level: 1,
    exp: 0,
    expToNext: 100,
    gold: 500,
    gems: 300
  },
  ownedAbilities: [],
  activeAbilities: [],
  unlockedStages: ['stage_001'],
  completedStages: [],
  gacha: {
    pityEpic: 0,
    pityLegendary: 0,
    totalPulls: 0
  }
};

const initialCalculation = calculateStats([]);

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      stats: initialCalculation.stats,
      conflicts: initialCalculation.conflicts,
      synergies: initialCalculation.synergies,
      power: calculatePower(initialCalculation.stats),
      
      addExp: (amount: number) => {
        set(state => {
          let newExp = state.player.exp + amount;
          let newLevel = state.player.level;
          let newExpToNext = state.player.expToNext;
          
          while (newExp >= newExpToNext) {
            newExp -= newExpToNext;
            newLevel++;
            newExpToNext = Math.floor(newExpToNext * 1.5);
          }
          
          return {
            player: {
              ...state.player,
              exp: newExp,
              level: newLevel,
              expToNext: newExpToNext
            }
          };
        });
      },
      
      addGold: (amount: number) => {
        set(state => ({
          player: { ...state.player, gold: state.player.gold + amount }
        }));
      },
      
      addGems: (amount: number) => {
        set(state => ({
          player: { ...state.player, gems: state.player.gems + amount }
        }));
      },
      
      addAbility: (ability: Ability) => {
        set(state => {
          if (state.ownedAbilities.find(a => a.id === ability.id)) {
            return state;
          }
          return {
            ownedAbilities: [...state.ownedAbilities, ability]
          };
        });
      },
      
      removeAbility: (abilityId: string) => {
        set(state => ({
          ownedAbilities: state.ownedAbilities.filter(a => a.id !== abilityId),
          activeAbilities: state.activeAbilities.filter(a => a.ability.id !== abilityId)
        }));
        get().updateStats();
      },
      
      setActiveAbilities: (abilityIds: string[]) => {
        set(state => ({
          activeAbilities: state.ownedAbilities
            .filter(a => abilityIds.includes(a.id))
            .slice(0, 6)
            .map(a => ({ ability: a, level: 1 }))
        }));
        get().updateStats();
      },
      
      activateAbility: (abilityId: string) => {
        set(state => {
          if (state.activeAbilities.length >= 6) return state;
          if (state.activeAbilities.find(a => a.ability.id === abilityId)) return state;
          
          const ability = state.ownedAbilities.find(a => a.id === abilityId);
          if (!ability) return state;
          
          return {
            activeAbilities: [...state.activeAbilities, { ability, level: 1 }]
          };
        });
        get().updateStats();
      },
      
      deactivateAbility: (abilityId: string) => {
        set(state => ({
          activeAbilities: state.activeAbilities.filter(a => a.ability.id !== abilityId)
        }));
        get().updateStats();
      },
      
      unlockStage: (stageId: string) => {
        set(state => ({
          unlockedStages: [...new Set([...state.unlockedStages, stageId])]
        }));
      },
      
      completeStage: (stageId: string, stars: number) => {
        set(state => ({
          completedStages: [...new Set([...state.completedStages, stageId])]
        }));
      },
      
      doGacha: (count: number) => {
        const state = get();
        const cost = count === 1 ? 50 : count === 10 ? 450 : count * 50;
        
        if (state.player.gems < cost) {
          return null;
        }
        
        const results: Ability[] = [];
        let currentPityEpic = state.gacha.pityEpic;
        let currentPityLegendary = state.gacha.pityLegendary;
        
        for (let i = 0; i < count; i++) {
          const roll = rollGacha(currentPityEpic, currentPityLegendary);
          results.push(roll.ability);
          currentPityEpic = roll.pityEpic;
          currentPityLegendary = roll.pityLegendary;
          get().addAbility(roll.ability);
        }
        
        set(state => ({
          player: {
            ...state.player,
            gems: state.player.gems - cost
          },
          gacha: {
            pityEpic: currentPityEpic,
            pityLegendary: currentPityLegendary,
            totalPulls: state.gacha.totalPulls + count
          }
        }));
        
        return results;
      },
      
      updateStats: () => {
        const state = get();
        const result = calculateStats(state.activeAbilities);
        set({
          stats: result.stats,
          conflicts: result.conflicts,
          synergies: result.synergies,
          power: calculatePower(result.stats)
        });
      },
      
      resetGame: () => {
        const initialCalc = calculateStats([]);
        set({
          ...initialState,
          stats: initialCalc.stats,
          conflicts: initialCalc.conflicts,
          synergies: initialCalc.synergies,
          power: calculatePower(initialCalc.stats)
        });
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        player: state.player,
        ownedAbilities: state.ownedAbilities,
        activeAbilities: state.activeAbilities,
        unlockedStages: state.unlockedStages,
        completedStages: state.completedStages,
        gacha: state.gacha
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.updateStats();
        }
      }
    }
  )
);
