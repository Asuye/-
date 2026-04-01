import type { Bond } from '@/types/bond';

export const bondDatabase: Bond[] = [
  {
    id: 'bond_fire_trio',
    name: '火焰三重奏',
    description: '队伍中有3张火元素卡片时，全队攻击力+30%',
    requiredTags: [{ tag: 'fire', count: 3 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 30, isPercentage: true, stat: 'attack' }
    ],
    icon: '🔥'
  },
  {
    id: 'bond_water_trio',
    name: '冰霜契约',
    description: '队伍中有3张水元素卡片时，全队生命+25%',
    requiredTags: [{ tag: 'water', count: 3 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 25, isPercentage: true, stat: 'hp' }
    ],
    icon: '💧'
  },
  {
    id: 'bond_wind_trio',
    name: '疾风阵列',
    description: '队伍中有3张风元素卡片时，全队速度+40%',
    requiredTags: [{ tag: 'wind', count: 3 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 40, isPercentage: true, stat: 'speed' }
    ],
    icon: '🌪️'
  },
  {
    id: 'bond_earth_trio',
    name: '大地守护',
    description: '队伍中有3张土元素卡片时，全队防御+35%',
    requiredTags: [{ tag: 'earth', count: 3 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 35, isPercentage: true, stat: 'defense' }
    ],
    icon: '🪨'
  },
  {
    id: 'bond_light_trio',
    name: '光明圣域',
    description: '队伍中有3张光元素卡片时，全队生命+30%，攻击+15%',
    requiredTags: [{ tag: 'light', count: 3 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 30, isPercentage: true, stat: 'hp' },
      { type: 'stat_boost', target: 'team', value: 15, isPercentage: true, stat: 'attack' }
    ],
    icon: '✨'
  },
  {
    id: 'bond_dark_trio',
    name: '暗影议会',
    description: '队伍中有3张暗元素卡片时，全队攻击+35%',
    requiredTags: [{ tag: 'dark', count: 3 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 35, isPercentage: true, stat: 'attack' }
    ],
    icon: '🌑'
  },
  {
    id: 'bond_warrior_duo',
    name: '战士之魂',
    description: '队伍中有2张战士卡片时，攻击+20%',
    requiredTags: [{ tag: 'warrior', count: 2 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'attack' }
    ],
    icon: '⚔️'
  },
  {
    id: 'bond_mage_duo',
    name: '魔法共鸣',
    description: '队伍中有2张法师卡片时，攻击+15%，速度+10%',
    requiredTags: [{ tag: 'mage', count: 2 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 15, isPercentage: true, stat: 'attack' },
      { type: 'stat_boost', target: 'team', value: 10, isPercentage: true, stat: 'speed' }
    ],
    icon: '🔮'
  },
  {
    id: 'bond_guardian_duo',
    name: '守护誓言',
    description: '队伍中有2张守护者卡片时，防御+25%，生命+15%',
    requiredTags: [{ tag: 'guardian', count: 2 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 25, isPercentage: true, stat: 'defense' },
      { type: 'stat_boost', target: 'team', value: 15, isPercentage: true, stat: 'hp' }
    ],
    icon: '🛡️'
  },
  {
    id: 'bond_healer_duo',
    name: '治愈之心',
    description: '队伍中有2张治愈者卡片时，生命+30%',
    requiredTags: [{ tag: 'healer', count: 2 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 30, isPercentage: true, stat: 'hp' }
    ],
    icon: '💚'
  },
  {
    id: 'bond_sword_shield',
    name: '剑与盾',
    description: '剑士与守护者同行，攻击+15%，防御+15%',
    requiredTags: [
      { tag: 'sword', count: 1 },
      { tag: 'shield', count: 1 }
    ],
    effects: [
      { type: 'stat_boost', target: 'team', value: 15, isPercentage: true, stat: 'attack' },
      { type: 'stat_boost', target: 'team', value: 15, isPercentage: true, stat: 'defense' }
    ],
    icon: '🗡️'
  },
  {
    id: 'bond_assassin_duo',
    name: '暗影双煞',
    description: '队伍中有2张刺客卡片时，攻击+25%，速度+20%',
    requiredTags: [{ tag: 'assassin', count: 2 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 25, isPercentage: true, stat: 'attack' },
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'speed' }
    ],
    icon: '🗡️'
  },
  {
    id: 'bond_ranger_duo',
    name: '神射手',
    description: '队伍中有2张游侠卡片时，速度+30%，攻击+10%',
    requiredTags: [{ tag: 'ranger', count: 2 }],
    effects: [
      { type: 'stat_boost', target: 'team', value: 30, isPercentage: true, stat: 'speed' },
      { type: 'stat_boost', target: 'team', value: 10, isPercentage: true, stat: 'attack' }
    ],
    icon: '🏹'
  },
  {
    id: 'bond_light_dark',
    name: '光暗交织',
    description: '光与暗的平衡，攻击+20%，生命+20%',
    requiredTags: [
      { tag: 'light', count: 1 },
      { tag: 'dark', count: 1 }
    ],
    effects: [
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'attack' },
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'hp' }
    ],
    icon: '☯️'
  },
  {
    id: 'bond_fire_water',
    name: '冰火之歌',
    description: '火与水的对立，攻击+25%，生命+15%',
    requiredTags: [
      { tag: 'fire', count: 1 },
      { tag: 'water', count: 1 }
    ],
    effects: [
      { type: 'stat_boost', target: 'team', value: 25, isPercentage: true, stat: 'attack' },
      { type: 'stat_boost', target: 'team', value: 15, isPercentage: true, stat: 'hp' }
    ],
    icon: '🔥'
  },
  {
    id: 'bond_all_ssr',
    name: '传说之力',
    description: '全SSR阵容，全属性+50%',
    requiredTags: [
      { tag: 'ssr_card', count: 3 }
    ],
    effects: [
      { type: 'stat_boost', target: 'team', value: 50, isPercentage: true, stat: 'attack' },
      { type: 'stat_boost', target: 'team', value: 50, isPercentage: true, stat: 'defense' },
      { type: 'stat_boost', target: 'team', value: 50, isPercentage: true, stat: 'hp' },
      { type: 'stat_boost', target: 'team', value: 50, isPercentage: true, stat: 'speed' }
    ],
    icon: '👑'
  },
  {
    id: 'bond_elemental_mastery',
    name: '元素大师',
    description: '队伍中有4种不同元素，全属性+20%',
    requiredTags: [
      { tag: 'elemental_diverse', count: 4 }
    ],
    effects: [
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'attack' },
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'defense' },
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'hp' },
      { type: 'stat_boost', target: 'team', value: 20, isPercentage: true, stat: 'speed' }
    ],
    icon: '🌈'
  }
];

export function getBondById(id: string): Bond | undefined {
  return bondDatabase.find(bond => bond.id === id);
}

export function getBondsByTag(tag: string): Bond[] {
  return bondDatabase.filter(bond => 
    bond.requiredTags.some(req => req.tag === tag)
  );
}
