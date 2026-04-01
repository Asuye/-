import type { Enemy } from '@/types/battle';

export const enemyDatabase: Enemy[] = [
  {
    id: 'enemy_001',
    name: '哥布林斥候',
    stats: { attack: 30, defense: 15, hp: 150, speed: 40 },
    skills: [{ name: '偷袭', cooldown: 2, damage: 40 }],
    description: '森林中常见的哥布林斥候，狡猾而敏捷。',
    rewards: { gold: 50, exp: 30 }
  },
  {
    id: 'enemy_002',
    name: '森林狼',
    stats: { attack: 45, defense: 20, hp: 200, speed: 60 },
    skills: [{ name: '撕咬', cooldown: 2, damage: 55 }],
    description: '栖息在森林中的狼群，凶猛而团结。',
    rewards: { gold: 80, exp: 50 }
  },
  {
    id: 'enemy_003',
    name: '骷髅战士',
    stats: { attack: 55, defense: 35, hp: 280, speed: 35 },
    skills: [{ name: '骨刃斩击', cooldown: 3, damage: 70 }],
    description: '被黑暗魔法复活的骷髅战士，永不知疲倦。',
    rewards: { gold: 120, exp: 80 }
  },
  {
    id: 'enemy_004',
    name: '火焰史莱姆',
    stats: { attack: 40, defense: 25, hp: 250, speed: 30 },
    skills: [{ name: '火焰喷射', cooldown: 2, damage: 50 }],
    description: '由岩浆形成的史莱姆，浑身散发着灼热的气息。',
    rewards: { gold: 100, exp: 60 }
  },
  {
    id: 'enemy_005',
    name: '暗影蝙蝠',
    stats: { attack: 50, defense: 15, hp: 180, speed: 80 },
    skills: [{ name: '暗影吸血', cooldown: 2, damage: 45 }],
    description: '生活在黑暗洞穴中的蝙蝠，以血液为食。',
    rewards: { gold: 90, exp: 55 }
  },
  {
    id: 'enemy_006',
    name: '石头巨人',
    stats: { attack: 70, defense: 80, hp: 500, speed: 20 },
    skills: [{ name: '岩石粉碎', cooldown: 4, damage: 100 }],
    description: '由魔法赋予生命的岩石巨人，坚不可摧。',
    rewards: { gold: 200, exp: 150 }
  },
  {
    id: 'enemy_007',
    name: '冰霜女巫',
    stats: { attack: 90, defense: 40, hp: 350, speed: 55 },
    skills: [{ name: '冰霜新星', cooldown: 3, damage: 120 }],
    description: '掌握冰霜魔法的女巫，冷酷无情。',
    rewards: { gold: 250, exp: 180 }
  },
  {
    id: 'enemy_008',
    name: '炎魔',
    stats: { attack: 120, defense: 60, hp: 600, speed: 50 },
    skills: [{ name: '地狱烈焰', cooldown: 3, damage: 150 }],
    description: '来自深渊的炎魔，浑身燃烧着不灭的火焰。',
    rewards: { gold: 400, exp: 300 }
  },
  {
    id: 'enemy_boss_001',
    name: '暗影领主',
    stats: { attack: 150, defense: 80, hp: 1000, speed: 60 },
    skills: [
      { name: '暗影斩', cooldown: 2, damage: 180 },
      { name: '深渊凝视', cooldown: 4, damage: 250 }
    ],
    description: '统治暗影领域的领主，拥有毁灭一切的力量。',
    rewards: { gold: 800, exp: 500 }
  },
  {
    id: 'enemy_boss_002',
    name: '远古巨龙',
    stats: { attack: 200, defense: 100, hp: 1500, speed: 45 },
    skills: [
      { name: '龙息', cooldown: 3, damage: 220 },
      { name: '尾击', cooldown: 2, damage: 180 }
    ],
    description: '沉睡千年的远古巨龙，苏醒时天地变色。',
    rewards: { gold: 1500, exp: 1000 }
  }
];

export function getEnemyById(id: string): Enemy | undefined {
  return enemyDatabase.find(enemy => enemy.id === id);
}
