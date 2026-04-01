import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, OwnedCard, PlayerState, ActiveBond } from '@/types/game';
import type { Card } from '@/types/card';
import { cardDatabase } from '@/data/cards';
import { detectBonds, calculateTotalPower } from '@/utils/bondCalculator';
import { performGacha, getGachaCost } from '@/utils/gacha';

const STORAGE_KEY = 'card-game-state';

const initialPlayer: PlayerState = {
  level: 1,
  exp: 0,
  expToNext: 100,
  gold: 500,
  gems: 500,
  energy: 100,
  maxEnergy: 100
};

const initialCards: OwnedCard[] = [
  { ...cardDatabase[12], instanceId: 'starter_1', level: 1 },
  { ...cardDatabase[13], instanceId: 'starter_2', level: 1 },
  { ...cardDatabase[14], instanceId: 'starter_3', level: 1 }
];

interface GameStore extends GameState {
  addExp: (amount: number) => void;
  addGold: (amount: number) => void;
  addGems: (amount: number) => void;
  addCard: (card: Card) => void;
  removeCard: (instanceId: string) => void;
  setDeck: (cardIds: string[]) => void;
  addToDeck: (instanceId: string) => void;
  removeFromDeck: (instanceId: string) => void;
  unlockStage: (stageId: string) => void;
  completeStage: (stageId: string, stars: number) => void;
  doGacha: (count: number) => Card[] | null;
  updateActiveBonds: () => void;
  getDeckCards: () => OwnedCard[];
  getTotalPower: () => number;
  resetGame: () => void;
}

const initialState: GameState = {
  player: initialPlayer,
  ownedCards: initialCards,
  deck: initialCards.map(c => c.instanceId),
  unlockedStages: ['stage_001'],
  completedStages: [],
  stageStars: {},
  gacha: {
    pitySR: 0,
    pitySSR: 0,
    totalPulls: 0
  },
  activeBonds: []
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
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
      
      addCard: (card: Card) => {
        const instanceId = `${card.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const ownedCard: OwnedCard = { ...card, instanceId, level: 1 };
        set(state => ({
          ownedCards: [...state.ownedCards, ownedCard]
        }));
      },
      
      removeCard: (instanceId: string) => {
        set(state => ({
          ownedCards: state.ownedCards.filter(c => c.instanceId !== instanceId),
          deck: state.deck.filter(id => id !== instanceId)
        }));
      },
      
      setDeck: (cardIds: string[]) => {
        set({ deck: cardIds.slice(0, 5) });
        get().updateActiveBonds();
      },
      
      addToDeck: (instanceId: string) => {
        set(state => {
          if (state.deck.length >= 5 || state.deck.includes(instanceId)) {
            return state;
          }
          return { deck: [...state.deck, instanceId] };
        });
        get().updateActiveBonds();
      },
      
      removeFromDeck: (instanceId: string) => {
        set(state => ({
          deck: state.deck.filter(id => id !== instanceId)
        }));
        get().updateActiveBonds();
      },
      
      unlockStage: (stageId: string) => {
        set(state => ({
          unlockedStages: [...new Set([...state.unlockedStages, stageId])]
        }));
      },
      
      completeStage: (stageId: string, stars: number) => {
        set(state => ({
          completedStages: [...new Set([...state.completedStages, stageId])],
          stageStars: {
            ...state.stageStars,
            [stageId]: Math.max(state.stageStars[stageId] || 0, stars)
          }
        }));
      },
      
      doGacha: (count: number) => {
        const state = get();
        const cost = getGachaCost(count);
        
        if (state.player.gems < cost.gems) {
          return null;
        }
        
        const result = performGacha(state.gacha.pitySR, state.gacha.pitySSR, count);
        
        for (const card of result.cards) {
          get().addCard(card);
        }
        
        set(state => ({
          player: {
            ...state.player,
            gems: state.player.gems - cost.gems
          },
          gacha: {
            pitySR: result.pitySR,
            pitySSR: result.pitySSR,
            totalPulls: state.gacha.totalPulls + count
          }
        }));
        
        return result.cards;
      },
      
      updateActiveBonds: () => {
        const state = get();
        const deckCards = state.ownedCards.filter(c => state.deck.includes(c.instanceId));
        const bonds = detectBonds(deckCards);
        set({ activeBonds: bonds });
      },
      
      getDeckCards: () => {
        const state = get();
        return state.ownedCards.filter(c => state.deck.includes(c.instanceId));
      },
      
      getTotalPower: () => {
        const state = get();
        const deckCards = state.getDeckCards();
        return calculateTotalPower(deckCards, state.activeBonds);
      },
      
      resetGame: () => {
        set(initialState);
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        player: state.player,
        ownedCards: state.ownedCards,
        deck: state.deck,
        unlockedStages: state.unlockedStages,
        completedStages: state.completedStages,
        stageStars: state.stageStars,
        gacha: state.gacha
      })
    }
  )
);

useGameStore.getState().updateActiveBonds();
