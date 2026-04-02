import type { Ability, AbilitySynergy } from '@/types/ability';

export const abilityDatabase: Ability[] = [
  {
    id: 'ability_001',
    name: '猛击',
    rarity: 'common',
    category: 'attack',
    description: '攻击力+20',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 20, isPercentage: false }
    ],
    tags: ['attack', 'simple'],
    conflictsWith: [],
    synergizesWith: ['ability_002', 'ability_005']
  },
  {
    id: 'ability_002',
    name: '重击',
    rarity: 'rare',
    category: 'attack',
    description: '攻击力+40',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 40, isPercentage: false }
    ],
    tags: ['attack', 'simple'],
    conflictsWith: ['ability_003'],
    synergizesWith: ['ability_001', 'ability_004']
  },
  {
    id: 'ability_003',
    name: '精准打击',
    rarity: 'epic',
    category: 'attack',
    description: '攻击力+15，暴击率+30%',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 15, isPercentage: false },
      { type: 'stat_boost', stat: 'crit_rate', value: 30, isPercentage: true }
    ],
    tags: ['attack', 'crit'],
    conflictsWith: ['ability_002', 'ability_006'],
    synergizesWith: ['ability_004', 'ability_008']
  },
  {
    id: 'ability_004',
    name: '暴击强化',
    rarity: 'common',
    category: 'attack',
    description: '暴击伤害+50%',
    effects: [
      { type: 'stat_boost', stat: 'crit_damage', value: 50, isPercentage: true }
    ],
    tags: ['attack', 'crit'],
    conflictsWith: [],
    synergizesWith: ['ability_003', 'ability_005']
  },
  {
    id: 'ability_005',
    name: '狂暴',
    rarity: 'legendary',
    category: 'attack',
    description: '攻击力+100，防御力-50',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 100, isPercentage: false },
      { type: 'stat_boost', stat: 'defense', value: -50, isPercentage: true }
    ],
    tags: ['attack', 'risky'],
    conflictsWith: ['ability_007', 'ability_008'],
    synergizesWith: ['ability_004', 'ability_009']
  },
  {
    id: 'ability_006',
    name: '稳扎稳打',
    rarity: 'common',
    category: 'attack',
    description: '攻击力+10，暴击率+5%，暴击伤害+20%',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 10, isPercentage: false },
      { type: 'stat_boost', stat: 'crit_rate', value: 5, isPercentage: true },
      { type: 'stat_boost', stat: 'crit_damage', value: 20, isPercentage: true }
    ],
    tags: ['attack', 'balanced'],
    conflictsWith: ['ability_003'],
    synergizesWith: ['ability_001', 'ability_007']
  },
  {
    id: 'ability_007',
    name: '铁壁',
    rarity: 'rare',
    category: 'defense',
    description: '防御力+50',
    effects: [
      { type: 'stat_boost', stat: 'defense', value: 50, isPercentage: false }
    ],
    tags: ['defense', 'simple'],
    conflictsWith: ['ability_005'],
    synergizesWith: ['ability_008', 'ability_010']
  },
  {
    id: 'ability_008',
    name: '不屈',
    rarity: 'epic',
    category: 'defense',
    description: '生命值+200，防御力+20',
    effects: [
      { type: 'stat_boost', stat: 'hp', value: 200, isPercentage: false },
      { type: 'stat_boost', stat: 'defense', value: 20, isPercentage: false }
    ],
    tags: ['defense', 'hp'],
    conflictsWith: ['ability_005'],
    synergizesWith: ['ability_007', 'ability_009']
  },
  {
    id: 'ability_009',
    name: '再生',
    rarity: 'common',
    category: 'defense',
    description: '生命值+100',
    effects: [
      { type: 'stat_boost', stat: 'hp', value: 100, isPercentage: false }
    ],
    tags: ['defense', 'hp'],
    conflictsWith: [],
    synergizesWith: ['ability_008', 'ability_010']
  },
  {
    id: 'ability_010',
    name: '钢躯',
    rarity: 'legendary',
    category: 'defense',
    description: '防御力+80，攻击力-30',
    effects: [
      { type: 'stat_boost', stat: 'defense', value: 80, isPercentage: false },
      { type: 'stat_boost', stat: 'attack', value: -30, isPercentage: false }
    ],
    tags: ['defense', 'risky'],
    conflictsWith: ['ability_005'],
    synergizesWith: ['ability_007', 'ability_009']
  },
  {
    id: 'ability_011',
    name: '疾风',
    rarity: 'common',
    category: 'utility',
    description: '速度+15',
    effects: [
      { type: 'stat_boost', stat: 'speed', value: 15, isPercentage: false }
    ],
    tags: ['utility', 'speed'],
    conflictsWith: [],
    synergizesWith: ['ability_012', 'ability_014']
  },
  {
    id: 'ability_012',
    name: '迅雷',
    rarity: 'rare',
    category: 'utility',
    description: '速度+30，暴击率+10%',
    effects: [
      { type: 'stat_boost', stat: 'speed', value: 30, isPercentage: false },
      { type: 'stat_boost', stat: 'crit_rate', value: 10, isPercentage: true }
    ],
    tags: ['utility', 'speed', 'crit'],
    conflictsWith: [],
    synergizesWith: ['ability_011', 'ability_003']
  },
  {
    id: 'ability_013',
    name: '敏捷',
    rarity: 'epic',
    category: 'utility',
    description: '速度+40，暴击率+15%，暴击伤害+25%',
    effects: [
      { type: 'stat_boost', stat: 'speed', value: 40, isPercentage: false },
      { type: 'stat_boost', stat: 'crit_rate', value: 15, isPercentage: true },
      { type: 'stat_boost', stat: 'crit_damage', value: 25, isPercentage: true }
    ],
    tags: ['utility', 'speed', 'crit'],
    conflictsWith: ['ability_016'],
    synergizesWith: ['ability_003', 'ability_004']
  },
  {
    id: 'ability_014',
    name: '先见',
    rarity: 'common',
    category: 'utility',
    description: '速度+10，防御力+10',
    effects: [
      { type: 'stat_boost', stat: 'speed', value: 10, isPercentage: false },
      { type: 'stat_boost', stat: 'defense', value: 10, isPercentage: false }
    ],
    tags: ['utility', 'speed', 'defense'],
    conflictsWith: [],
    synergizesWith: ['ability_011', 'ability_007']
  },
  {
    id: 'ability_015',
    name: '神速',
    rarity: 'legendary',
    category: 'utility',
    description: '速度+100，生命值-100',
    effects: [
      { type: 'stat_boost', stat: 'speed', value: 100, isPercentage: false },
      { type: 'stat_boost', stat: 'hp', value: -100, isPercentage: false }
    ],
    tags: ['utility', 'speed', 'risky'],
    conflictsWith: ['ability_008', 'ability_010'],
    synergizesWith: ['ability_012', 'ability_013']
  },
  {
    id: 'ability_016',
    name: '全能',
    rarity: 'common',
    category: 'special',
    description: '全属性+5',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 5, isPercentage: false },
      { type: 'stat_boost', stat: 'defense', value: 5, isPercentage: false },
      { type: 'stat_boost', stat: 'hp', value: 50, isPercentage: false },
      { type: 'stat_boost', stat: 'speed', value: 5, isPercentage: false },
      { type: 'stat_boost', stat: 'crit_rate', value: 3, isPercentage: true },
      { type: 'stat_boost', stat: 'crit_damage', value: 5, isPercentage: true }
    ],
    tags: ['special', 'balanced'],
    conflictsWith: ['ability_013'],
    synergizesWith: ['ability_006', 'ability_014']
  },
  {
    id: 'ability_017',
    name: '赌徒',
    rarity: 'rare',
    category: 'special',
    description: '暴击率+25%，暴击伤害+25%，攻击力-20',
    effects: [
      { type: 'stat_boost', stat: 'crit_rate', value: 25, isPercentage: true },
      { type: 'stat_boost', stat: 'crit_damage', value: 25, isPercentage: true },
      { type: 'stat_boost', stat: 'attack', value: -20, isPercentage: false }
    ],
    tags: ['special', 'crit', 'risky'],
    conflictsWith: [],
    synergizesWith: ['ability_003', 'ability_004']
  },
  {
    id: 'ability_018',
    name: '背水一战',
    rarity: 'epic',
    category: 'special',
    description: '攻击力+80，防御力-40，生命值-150',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 80, isPercentage: false },
      { type: 'stat_boost', stat: 'defense', value: -40, isPercentage: true },
      { type: 'stat_boost', stat: 'hp', value: -150, isPercentage: false }
    ],
    tags: ['special', 'risky', 'attack'],
    conflictsWith: ['ability_005', 'ability_010'],
    synergizesWith: ['ability_004', 'ability_017']
  },
  {
    id: 'ability_019',
    name: '均衡之道',
    rarity: 'common',
    category: 'special',
    description: '攻击力+15，防御力+15，生命值+100',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 15, isPercentage: false },
      { type: 'stat_boost', stat: 'defense', value: 15, isPercentage: false },
      { type: 'stat_boost', stat: 'hp', value: 100, isPercentage: false }
    ],
    tags: ['special', 'balanced'],
    conflictsWith: [],
    synergizesWith: ['ability_006', 'ability_016']
  },
  {
    id: 'ability_020',
    name: '孤注一掷',
    rarity: 'legendary',
    category: 'special',
    description: '攻击力+150，暴击率+50%，暴击伤害+100%，防御力-80，生命值-300，速度-50',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 150, isPercentage: false },
      { type: 'stat_boost', stat: 'crit_rate', value: 50, isPercentage: true },
      { type: 'stat_boost', stat: 'crit_damage', value: 100, isPercentage: true },
      { type: 'stat_boost', stat: 'defense', value: -80, isPercentage: true },
      { type: 'stat_boost', stat: 'hp', value: -300, isPercentage: false },
      { type: 'stat_boost', stat: 'speed', value: -50, isPercentage: false }
    ],
    tags: ['special', 'risky', 'extreme'],
    conflictsWith: ['ability_005', 'ability_010', 'ability_015', 'ability_018'],
    synergizesWith: ['ability_004', 'ability_017']
  }
];

export const synergyDatabase: AbilitySynergy[] = [
  {
    name: '暴击组合',
    description: '精准打击+暴击强化：暴击伤害额外+30%',
    abilities: ['ability_003', 'ability_004'],
    effect: { type: 'stat_boost', stat: 'crit_damage', value: 30, isPercentage: true }
  },
  {
    name: '钢铁堡垒',
    description: '铁壁+不屈+再生：防御力额外+40，生命值额外+150',
    abilities: ['ability_007', 'ability_008', 'ability_009'],
    effect: { type: 'stat_boost', stat: 'defense', value: 40, isPercentage: false }
  },
  {
    name: '致命疾风',
    description: '迅雷+敏捷：速度额外+30，暴击率额外+15%',
    abilities: ['ability_012', 'ability_013'],
    effect: { type: 'stat_boost', stat: 'speed', value: 30, isPercentage: false }
  },
  {
    name: '赌徒的胜利',
    description: '赌徒+孤注一掷：虽然风险极高，但攻击力额外+50',
    abilities: ['ability_017', 'ability_020'],
    effect: { type: 'stat_boost', stat: 'attack', value: 50, isPercentage: false }
  },
  {
    name: '稳定输出',
    description: '稳扎稳打+均衡之道+全能：全属性额外+10',
    abilities: ['ability_006', 'ability_016', 'ability_019'],
    effect: { type: 'stat_boost', stat: 'attack', value: 10, isPercentage: false }
  },
  {
    name: '以命相搏',
    description: '狂暴+背水一战：攻击力额外+80，但防御力额外-20%',
    abilities: ['ability_005', 'ability_018'],
    effect: { type: 'stat_boost', stat: 'attack', value: 80, isPercentage: false }
  }
];

export function getAbilityById(id: string): Ability | undefined {
  return abilityDatabase.find(ability => ability.id === id);
}

export function getAbilitiesByRarity(rarity: string): Ability[] {
  return abilityDatabase.filter(ability => ability.rarity === rarity);
}

export function getAbilitiesByCategory(category: string): Ability[] {
  return abilityDatabase.filter(ability => ability.category === category);
}
