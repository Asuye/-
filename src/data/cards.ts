import type { Card } from '@/types/card';

export const cardDatabase: Card[] = [
  {
    id: 'card_001',
    name: '烈焰剑士',
    rarity: 'SSR',
    type: 'attack',
    element: 'fire',
    baseStats: { attack: 150, defense: 60, hp: 800, speed: 90 },
    skill: {
      name: '烈焰斩击',
      description: '造成150%攻击力的火焰伤害',
      cooldown: 3,
      effect: { type: 'damage', value: 1.5, element: 'fire' }
    },
    bondTags: ['fire', 'warrior', 'sword'],
    description: '掌握火焰之力的剑士，每一击都燃烧着不灭的烈焰。'
  },
  {
    id: 'card_002',
    name: '寒冰法师',
    rarity: 'SSR',
    type: 'attack',
    element: 'water',
    baseStats: { attack: 140, defense: 50, hp: 700, speed: 85 },
    skill: {
      name: '冰霜新星',
      description: '造成130%攻击力的冰冻伤害，降低敌人速度',
      cooldown: 4,
      effect: { type: 'damage', value: 1.3, element: 'water' }
    },
    bondTags: ['water', 'mage', 'staff'],
    description: '来自极北之地的法师，操控着永恒的冰霜。'
  },
  {
    id: 'card_003',
    name: '圣光守护者',
    rarity: 'SSR',
    type: 'defense',
    element: 'light',
    baseStats: { attack: 80, defense: 120, hp: 1200, speed: 60 },
    skill: {
      name: '神圣护盾',
      description: '恢复30%最大生命值，提升防御20%',
      cooldown: 4,
      effect: { type: 'heal', value: 0.3 }
    },
    bondTags: ['light', 'guardian', 'shield'],
    description: '圣光的化身，守护着一切正义与光明。'
  },
  {
    id: 'card_004',
    name: '暗影刺客',
    rarity: 'SSR',
    type: 'attack',
    element: 'dark',
    baseStats: { attack: 160, defense: 40, hp: 600, speed: 120 },
    skill: {
      name: '暗影突袭',
      description: '造成180%攻击力的暗影伤害',
      cooldown: 3,
      effect: { type: 'damage', value: 1.8, element: 'dark' }
    },
    bondTags: ['dark', 'assassin', 'dagger'],
    description: '行走于暗影之中的杀手，无声无息地终结敌人。'
  },
  {
    id: 'card_005',
    name: '狂风游侠',
    rarity: 'SR',
    type: 'attack',
    element: 'wind',
    baseStats: { attack: 120, defense: 50, hp: 650, speed: 100 },
    skill: {
      name: '疾风连射',
      description: '造成120%攻击力的风属性伤害',
      cooldown: 2,
      effect: { type: 'damage', value: 1.2, element: 'wind' }
    },
    bondTags: ['wind', 'ranger', 'bow'],
    description: '与风同行的游侠，箭矢如疾风般迅捷。'
  },
  {
    id: 'card_006',
    name: '大地骑士',
    rarity: 'SR',
    type: 'defense',
    element: 'earth',
    baseStats: { attack: 90, defense: 100, hp: 1000, speed: 70 },
    skill: {
      name: '岩石壁垒',
      description: '提升防御50%持续3回合',
      cooldown: 4,
      effect: { type: 'buff', value: 0.5, stat: 'defense' }
    },
    bondTags: ['earth', 'warrior', 'shield'],
    description: '大地的守护者，坚如磐石不可撼动。'
  },
  {
    id: 'card_007',
    name: '火焰术士',
    rarity: 'SR',
    type: 'attack',
    element: 'fire',
    baseStats: { attack: 130, defense: 45, hp: 600, speed: 80 },
    skill: {
      name: '火球术',
      description: '造成140%攻击力的火焰伤害',
      cooldown: 2,
      effect: { type: 'damage', value: 1.4, element: 'fire' }
    },
    bondTags: ['fire', 'mage', 'staff'],
    description: '操控火焰的术士，将敌人化为灰烬。'
  },
  {
    id: 'card_008',
    name: '水流治愈者',
    rarity: 'SR',
    type: 'support',
    element: 'water',
    baseStats: { attack: 70, defense: 60, hp: 750, speed: 75 },
    skill: {
      name: '治愈之泉',
      description: '恢复40%最大生命值',
      cooldown: 3,
      effect: { type: 'heal', value: 0.4 }
    },
    bondTags: ['water', 'healer', 'staff'],
    description: '水之精灵的眷属，用治愈之水抚平伤痛。'
  },
  {
    id: 'card_009',
    name: '光明牧师',
    rarity: 'R',
    type: 'support',
    element: 'light',
    baseStats: { attack: 60, defense: 50, hp: 600, speed: 65 },
    skill: {
      name: '光明祝福',
      description: '恢复25%最大生命值',
      cooldown: 3,
      effect: { type: 'heal', value: 0.25 }
    },
    bondTags: ['light', 'healer', 'staff'],
    description: '信仰光明的牧师，用神圣之力治愈同伴。'
  },
  {
    id: 'card_010',
    name: '黑暗术士',
    rarity: 'R',
    type: 'attack',
    element: 'dark',
    baseStats: { attack: 100, defense: 40, hp: 550, speed: 75 },
    skill: {
      name: '暗影箭',
      description: '造成110%攻击力的暗影伤害',
      cooldown: 2,
      effect: { type: 'damage', value: 1.1, element: 'dark' }
    },
    bondTags: ['dark', 'mage', 'staff'],
    description: '研究禁忌之术的术士，操控黑暗的力量。'
  },
  {
    id: 'card_011',
    name: '风之舞者',
    rarity: 'R',
    type: 'support',
    element: 'wind',
    baseStats: { attack: 75, defense: 45, hp: 580, speed: 90 },
    skill: {
      name: '风之加护',
      description: '提升速度30%持续3回合',
      cooldown: 3,
      effect: { type: 'buff', value: 0.3, stat: 'speed' }
    },
    bondTags: ['wind', 'dancer', 'dagger'],
    description: '与风共舞的精灵，带来迅捷的祝福。'
  },
  {
    id: 'card_012',
    name: '岩石卫士',
    rarity: 'R',
    type: 'defense',
    element: 'earth',
    baseStats: { attack: 70, defense: 85, hp: 850, speed: 55 },
    skill: {
      name: '石化皮肤',
      description: '提升防御30%持续2回合',
      cooldown: 3,
      effect: { type: 'buff', value: 0.3, stat: 'defense' }
    },
    bondTags: ['earth', 'guardian', 'shield'],
    description: '大地的子民，皮肤如岩石般坚硬。'
  },
  {
    id: 'card_013',
    name: '见习剑士',
    rarity: 'N',
    type: 'attack',
    element: 'fire',
    baseStats: { attack: 70, defense: 35, hp: 450, speed: 60 },
    skill: {
      name: '普通攻击',
      description: '造成100%攻击力的伤害',
      cooldown: 1,
      effect: { type: 'damage', value: 1.0 }
    },
    bondTags: ['fire', 'warrior', 'sword'],
    description: '刚刚踏上剑道的新人，怀揣着成为强者的梦想。'
  },
  {
    id: 'card_014',
    name: '学徒法师',
    rarity: 'N',
    type: 'attack',
    element: 'water',
    baseStats: { attack: 65, defense: 30, hp: 400, speed: 55 },
    skill: {
      name: '水弹',
      description: '造成90%攻击力的水属性伤害',
      cooldown: 1,
      effect: { type: 'damage', value: 0.9, element: 'water' }
    },
    bondTags: ['water', 'mage', 'staff'],
    description: '魔法学院的学徒，正在学习基础的元素魔法。'
  },
  {
    id: 'card_015',
    name: '村庄守卫',
    rarity: 'N',
    type: 'defense',
    element: 'earth',
    baseStats: { attack: 50, defense: 60, hp: 600, speed: 45 },
    skill: {
      name: '防御姿态',
      description: '提升防御20%持续2回合',
      cooldown: 2,
      effect: { type: 'buff', value: 0.2, stat: 'defense' }
    },
    bondTags: ['earth', 'guardian', 'shield'],
    description: '守护村庄的勇士，用生命保护着家园。'
  },
  {
    id: 'card_016',
    name: '暗夜猎手',
    rarity: 'SR',
    type: 'attack',
    element: 'dark',
    baseStats: { attack: 125, defense: 45, hp: 620, speed: 95 },
    skill: {
      name: '夜幕突袭',
      description: '造成130%攻击力的暗影伤害',
      cooldown: 2,
      effect: { type: 'damage', value: 1.3, element: 'dark' }
    },
    bondTags: ['dark', 'assassin', 'dagger'],
    description: '在夜色中狩猎的刺客，从不失手。'
  },
  {
    id: 'card_017',
    name: '圣殿骑士',
    rarity: 'SR',
    type: 'defense',
    element: 'light',
    baseStats: { attack: 85, defense: 95, hp: 950, speed: 65 },
    skill: {
      name: '圣光守护',
      description: '恢复20%生命值并提升防御25%',
      cooldown: 4,
      effect: { type: 'heal', value: 0.2 }
    },
    bondTags: ['light', 'warrior', 'shield'],
    description: '圣殿的守护骑士，光明与正义的化身。'
  },
  {
    id: 'card_018',
    name: '自然德鲁伊',
    rarity: 'SR',
    type: 'support',
    element: 'earth',
    baseStats: { attack: 75, defense: 65, hp: 700, speed: 70 },
    skill: {
      name: '自然之力',
      description: '恢复30%生命值并提升攻击15%',
      cooldown: 3,
      effect: { type: 'heal', value: 0.3 }
    },
    bondTags: ['earth', 'healer', 'staff'],
    description: '与自然沟通的德鲁伊，借用大地的力量。'
  },
  {
    id: 'card_019',
    name: '雷霆战士',
    rarity: 'SSR',
    type: 'attack',
    element: 'wind',
    baseStats: { attack: 145, defense: 55, hp: 750, speed: 110 },
    skill: {
      name: '雷霆一击',
      description: '造成160%攻击力的风属性伤害',
      cooldown: 3,
      effect: { type: 'damage', value: 1.6, element: 'wind' }
    },
    bondTags: ['wind', 'warrior', 'sword'],
    description: '掌握雷霆之力的战士，每一击都伴随着风暴。'
  },
  {
    id: 'card_020',
    name: '深渊领主',
    rarity: 'SSR',
    type: 'special',
    element: 'dark',
    baseStats: { attack: 135, defense: 80, hp: 900, speed: 85 },
    skill: {
      name: '深渊凝视',
      description: '造成140%攻击力的暗影伤害并恢复等量生命',
      cooldown: 4,
      effect: { type: 'damage', value: 1.4, element: 'dark' }
    },
    bondTags: ['dark', 'warrior', 'special'],
    description: '来自深渊的领主，掌握着生与死的边界。'
  }
];

export function getCardById(id: string): Card | undefined {
  return cardDatabase.find(card => card.id === id);
}

export function getCardsByRarity(rarity: Card['rarity']): Card[] {
  return cardDatabase.filter(card => card.rarity === rarity);
}

export function getCardsByElement(element: Card['element']): Card[] {
  return cardDatabase.filter(card => card.element === element);
}
