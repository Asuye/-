import type { Ability, AbilitySynergy } from '@/types/ability';

export const abilityDatabase: Ability[] = [
  {
    id: 'ability_001',
    name: '双重打击',
    rarity: 'common',
    category: 'attack',
    description: '30%几率进行两次攻击',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'double_strike',
          chance: 30,
          value: 2,
          description: '30%几率进行两次攻击'
        }
      }
    ],
    tags: ['attack', 'strike'],
    conflictsWith: ['ability_002'],
    synergizesWith: ['ability_005', 'ability_006']
  },
  {
    id: 'ability_002',
    name: '三连击',
    rarity: 'rare',
    category: 'attack',
    description: '20%几率进行三次攻击',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'triple_strike',
          chance: 20,
          value: 3,
          description: '20%几率进行三次攻击'
        }
      }
    ],
    tags: ['attack', 'strike'],
    conflictsWith: ['ability_001'],
    synergizesWith: ['ability_005', 'ability_006']
  },
  {
    id: 'ability_003',
    name: '吸血打击',
    rarity: 'common',
    category: 'attack',
    description: '攻击时回复15%伤害的生命',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'lifesteal',
          value: 15,
          description: '攻击时回复15%伤害的生命'
        }
      }
    ],
    tags: ['attack', 'heal'],
    conflictsWith: [],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_004',
    name: '血之渴望',
    rarity: 'epic',
    category: 'attack',
    description: '攻击时回复30%伤害的生命',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'lifesteal',
          value: 30,
          description: '攻击时回复30%伤害的生命'
        }
      }
    ],
    tags: ['attack', 'heal'],
    conflictsWith: [],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_005',
    name: '致命弱点',
    rarity: 'common',
    category: 'attack',
    description: '暴击伤害+50%',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'critical_bonus',
          value: 50,
          description: '暴击伤害+50%'
        }
      }
    ],
    tags: ['attack', 'crit'],
    conflictsWith: [],
    synergizesWith: ['ability_001', 'ability_002', 'ability_006']
  },
  {
    id: 'ability_006',
    name: '精准狙击',
    rarity: 'rare',
    category: 'attack',
    description: '暴击率+25%，暴击伤害+75%',
    effects: [
      {
        type: 'stat_boost',
        stat: 'crit_rate',
        value: 25,
        isPercentage: true
      },
      {
        type: 'special_effect',
        specialEffect: {
          type: 'critical_bonus',
          value: 75,
          description: '暴击伤害+75%'
        }
      }
    ],
    tags: ['attack', 'crit'],
    conflictsWith: [],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_007',
    name: '破甲之刃',
    rarity: 'common',
    category: 'attack',
    description: '攻击无视30%防御',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'pierce',
          value: 30,
          description: '攻击无视30%防御'
        }
      }
    ],
    tags: ['attack', 'pierce'],
    conflictsWith: [],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_008',
    name: '贯穿之枪',
    rarity: 'epic',
    category: 'attack',
    description: '攻击无视60%防御',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'pierce',
          value: 60,
          description: '攻击无视60%防御'
        }
      }
    ],
    tags: ['attack', 'pierce'],
    conflictsWith: [],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_009',
    name: '毒素之刃',
    rarity: 'common',
    category: 'attack',
    description: '攻击附加中毒，每回合造成10%伤害',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'poison',
          value: 10,
          description: '攻击附加中毒，每回合造成10%伤害'
        }
      }
    ],
    tags: ['attack', 'dot'],
    conflictsWith: ['ability_010', 'ability_011'],
    synergizesWith: ['ability_007', 'ability_008']
  },
  {
    id: 'ability_010',
    name: '烈焰之怒',
    rarity: 'rare',
    category: 'attack',
    description: '攻击附加灼烧，每回合造成15%伤害',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'burn',
          value: 15,
          description: '攻击附加灼烧，每回合造成15%伤害'
        }
      }
    ],
    tags: ['attack', 'dot'],
    conflictsWith: ['ability_009', 'ability_011'],
    synergizesWith: ['ability_007', 'ability_008']
  },
  {
    id: 'ability_011',
    name: '冰封之触',
    rarity: 'epic',
    category: 'attack',
    description: '攻击附加冰冻，降低敌人速度30%',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'freeze',
          value: 30,
          description: '攻击附加冰冻，降低敌人速度30%'
        }
      }
    ],
    tags: ['attack', 'control'],
    conflictsWith: ['ability_009', 'ability_010'],
    synergizesWith: ['ability_007', 'ability_008']
  },
  {
    id: 'ability_012',
    name: '斩杀者',
    rarity: 'legendary',
    category: 'attack',
    description: '敌人生命值低于30%时，伤害翻倍',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'execute',
          value: 30,
          description: '敌人生命值低于30%时，伤害翻倍'
        }
      }
    ],
    tags: ['attack', 'finish'],
    conflictsWith: [],
    synergizesWith: ['ability_002', 'ability_006']
  },
  {
    id: 'ability_013',
    name: '闪电反应',
    rarity: 'common',
    category: 'defense',
    description: '20%几率闪避攻击',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'dodge',
          chance: 20,
          value: 1,
          description: '20%几率闪避攻击'
        }
      }
    ],
    tags: ['defense', 'dodge'],
    conflictsWith: [],
    synergizesWith: ['ability_014', 'ability_015']
  },
  {
    id: 'ability_014',
    name: '幻影步',
    rarity: 'rare',
    category: 'defense',
    description: '35%几率闪避攻击',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'dodge',
          chance: 35,
          value: 1,
          description: '35%几率闪避攻击'
        }
      }
    ],
    tags: ['defense', 'dodge'],
    conflictsWith: [],
    synergizesWith: ['ability_013', 'ability_015']
  },
  {
    id: 'ability_015',
    name: '铁壁守护',
    rarity: 'common',
    category: 'defense',
    description: '受到伤害减少20%',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'damage_reduction',
          value: 20,
          description: '受到伤害减少20%'
        }
      }
    ],
    tags: ['defense', 'tank'],
    conflictsWith: [],
    synergizesWith: ['ability_016', 'ability_017']
  },
  {
    id: 'ability_016',
    name: '钢铁堡垒',
    rarity: 'epic',
    category: 'defense',
    description: '受到伤害减少40%',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'damage_reduction',
          value: 40,
          description: '受到伤害减少40%'
        }
      }
    ],
    tags: ['defense', 'tank'],
    conflictsWith: [],
    synergizesWith: ['ability_015', 'ability_017']
  },
  {
    id: 'ability_017',
    name: '魔法护盾',
    rarity: 'common',
    category: 'defense',
    description: '每3回合获得一个护盾，吸收最大生命值15%的伤害',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'shield',
          value: 15,
          description: '每3回合获得一个护盾，吸收最大生命值15%的伤害'
        }
      }
    ],
    tags: ['defense', 'shield'],
    conflictsWith: [],
    synergizesWith: ['ability_015', 'ability_016']
  },
  {
    id: 'ability_018',
    name: '反击之怒',
    rarity: 'rare',
    category: 'defense',
    description: '受到攻击时，50%几率反击造成30%伤害',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'counter',
          chance: 50,
          value: 30,
          description: '受到攻击时，50%几率反击造成30%伤害'
        }
      }
    ],
    tags: ['defense', 'counter'],
    conflictsWith: ['ability_019'],
    synergizesWith: ['ability_015', 'ability_016']
  },
  {
    id: 'ability_019',
    name: '荆棘护甲',
    rarity: 'epic',
    category: 'defense',
    description: '受到攻击时，反弹25%伤害给攻击者',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'thorns',
          value: 25,
          description: '受到攻击时，反弹25%伤害给攻击者'
        }
      }
    ],
    tags: ['defense', 'thorns'],
    conflictsWith: ['ability_018'],
    synergizesWith: ['ability_015', 'ability_016']
  },
  {
    id: 'ability_020',
    name: '不死之身',
    rarity: 'legendary',
    category: 'defense',
    description: '受到致命伤害时，有一次机会保留1点生命',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'heal_over_time',
          value: 1,
          description: '受到致命伤害时，有一次机会保留1点生命'
        }
      }
    ],
    tags: ['defense', 'survive'],
    conflictsWith: [],
    synergizesWith: ['ability_016', 'ability_017']
  },
  {
    id: 'ability_021',
    name: '疾风步',
    rarity: 'common',
    category: 'utility',
    description: '速度+30%，闪避+10%',
    effects: [
      {
        type: 'stat_boost',
        stat: 'speed',
        value: 30,
        isPercentage: true
      },
      {
        type: 'special_effect',
        specialEffect: {
          type: 'dodge',
          chance: 10,
          value: 1,
          description: '闪避+10%'
        }
      }
    ],
    tags: ['utility', 'speed'],
    conflictsWith: [],
    synergizesWith: ['ability_013', 'ability_014']
  },
  {
    id: 'ability_022',
    name: '狂暴冲锋',
    rarity: 'rare',
    category: 'utility',
    description: '每回合开始时，攻击力+10%（最多+50%）',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'power_surge',
          value: 10,
          description: '每回合开始时，攻击力+10%（最多+50%）'
        }
      }
    ],
    tags: ['utility', 'buff'],
    conflictsWith: [],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_023',
    name: '分裂攻击',
    rarity: 'rare',
    category: 'attack',
    description: '攻击时对相邻敌人造成50%溅射伤害',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'splash',
          value: 50,
          description: '攻击时对相邻敌人造成50%溅射伤害'
        }
      }
    ],
    tags: ['attack', 'aoe'],
    conflictsWith: ['ability_024'],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_024',
    name: '横扫千军',
    rarity: 'epic',
    category: 'attack',
    description: '攻击时对所有敌人造成30%伤害',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'cleave',
          value: 30,
          description: '攻击时对所有敌人造成30%伤害'
        }
      }
    ],
    tags: ['attack', 'aoe'],
    conflictsWith: ['ability_023'],
    synergizesWith: ['ability_001', 'ability_002']
  },
  {
    id: 'ability_025',
    name: '神击',
    rarity: 'legendary',
    category: 'attack',
    description: '15%几率触发，造成3倍伤害并眩晕敌人',
    effects: [
      {
        type: 'special_effect',
        specialEffect: {
          type: 'power_surge',
          chance: 15,
          value: 300,
          description: '15%几率触发，造成3倍伤害并眩晕敌人'
        }
      }
    ],
    tags: ['attack', 'ultimate'],
    conflictsWith: [],
    synergizesWith: ['ability_002', 'ability_006']
  }
];

export const synergyDatabase: AbilitySynergy[] = [
  {
    name: '连击大师',
    description: '双重打击+致命弱点：连击时暴击率额外+30%',
    abilities: ['ability_001', 'ability_005'],
    effect: {
      type: 'special_effect',
      specialEffect: {
        type: 'critical_bonus',
        value: 30,
        description: '连击时暴击率额外+30%'
      }
    }
  },
  {
    name: '血之狂暴',
    description: '吸血打击+双重打击：连击时吸血效果翻倍',
    abilities: ['ability_001', 'ability_003'],
    effect: {
      type: 'special_effect',
      specialEffect: {
        type: 'lifesteal',
        value: 30,
        description: '连击时吸血效果翻倍'
      }
    }
  },
  {
    name: '钢铁幻影',
    description: '闪电反应+铁壁守护：闪避成功时，下次受到伤害减少50%',
    abilities: ['ability_013', 'ability_015'],
    effect: {
      type: 'special_effect',
      specialEffect: {
        type: 'damage_reduction',
        value: 50,
        description: '闪避成功时，下次受到伤害减少50%'
      }
    }
  },
  {
    name: '致命毒刃',
    description: '毒素之刃+破甲之刃：中毒伤害无视防御',
    abilities: ['ability_009', 'ability_007'],
    effect: {
      type: 'special_effect',
      specialEffect: {
        type: 'pierce',
        value: 100,
        description: '中毒伤害无视防御'
      }
    }
  },
  {
    name: '无双战神',
    description: '三连击+斩杀者：敌人低血量时必定三连击',
    abilities: ['ability_002', 'ability_012'],
    effect: {
      type: 'special_effect',
      specialEffect: {
        type: 'double_strike',
        chance: 100,
        value: 3,
        description: '敌人低血量时必定三连击'
      }
    }
  },
  {
    name: '不死狂战',
    description: '狂暴冲锋+不死之身：濒死时攻击力翻倍',
    abilities: ['ability_022', 'ability_020'],
    effect: {
      type: 'special_effect',
      specialEffect: {
        type: 'power_surge',
        value: 100,
        description: '濒死时攻击力翻倍'
      }
    }
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
