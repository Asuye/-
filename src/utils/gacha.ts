import type { Card, Rarity } from '@/types/card';
import { cardDatabase, getCardsByRarity } from '@/data/cards';

export interface GachaResult {
  cards: Card[];
  pitySR: number;
  pitySSR: number;
}

function getRandomCardByRarity(rarity: Rarity): Card {
  const cards = getCardsByRarity(rarity);
  return cards[Math.floor(Math.random() * cards.length)];
}

export function performGacha(pitySR: number, pitySSR: number, count: number = 1): GachaResult {
  const cards: Card[] = [];
  let currentPitySR = pitySR;
  let currentPitySSR = pitySSR;
  
  for (let i = 0; i < count; i++) {
    currentPitySR++;
    currentPitySSR++;
    
    let card: Card;
    
    if (currentPitySSR >= 50) {
      card = getRandomCardByRarity('SSR');
      currentPitySSR = 0;
      currentPitySR = 0;
    } else if (currentPitySR >= 10) {
      card = getRandomCardByRarity('SR');
      currentPitySR = 0;
    } else {
      const roll = Math.random() * 100;
      
      if (roll < 2) {
        card = getRandomCardByRarity('SSR');
        currentPitySSR = 0;
        currentPitySR = 0;
      } else if (roll < 10) {
        card = getRandomCardByRarity('SR');
        currentPitySR = 0;
      } else if (roll < 40) {
        card = getRandomCardByRarity('R');
      } else {
        card = getRandomCardByRarity('N');
      }
    }
    
    cards.push(card);
  }
  
  return {
    cards,
    pitySR: currentPitySR,
    pitySSR: currentPitySSR
  };
}

export function getGachaCost(count: number): { gold: number; gems: number } {
  if (count === 1) {
    return { gold: 0, gems: 100 };
  } else if (count === 10) {
    return { gold: 0, gems: 900 };
  }
  return { gold: 0, gems: count * 100 };
}

export const GACHA_RATES = {
  SSR: 2,
  SR: 8,
  R: 30,
  N: 60
};
