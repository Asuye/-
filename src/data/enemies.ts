import type { Enemy } from '@/types/battle';

export const enemyDatabase: Enemy[] = [
  {
    id: 'enemy_001',
    name: '训练假人',
    maxHp: 100,
    attack: 10,
    defense: 5,
    speed: 5,
    critRate: 0,
    critDamage: 50,
    description: '训练用的假人，不会主动攻击',
    rewards: {
      gold: 50,
      exp: 100,
      gems: 5
    },
    difficulty: 'easy'
  },
  {
    id: 'enemy_002',
    name: '森林狼',
    maxHp: 200,
    attack: 25,
    defense: 10,
    speed: 15,
    critRate: 10,
    critDamage: 75,
    description: '森林中的掠食者，速度较快',
    rewards: {
      gold: 100,
      exp: 150,
      gems: 10
    },
    difficulty: 'normal'
  },
  {
    id: 'enemy_003',
    name: '洞穴巨蜥',
    maxHp: 350,
    attack: 40,
    defense: 20,
    speed: 8,
    critRate: 15,
    critDamage: 100,
    description: '洞穴中的强大生物，防御很高',
    rewards: {
      gold: 200,
      exp: 250,
      gems: 15
    },
    difficulty: 'hard'
  },
  {
    id: 'enemy_004',
    name: '冰霜巨人',
    maxHp: 500,
    attack: 60,
    defense: 30,
    speed: 5,
    critRate: 20,
    critDamage: 125,
    description: '冰霜山脉的守护者，拥有强大的力量',
    rewards: {
      gold: 350,
      exp: 400,
      gems: 25
    },
    difficulty: 'nightmare'
  },
  {
    id: 'enemy_005',
    name: '深渊领主',
    maxHp: 800,
    attack: 80,
    defense: 40,
    speed: 10,
    critRate: 25,
    critDamage: 150,
    description: '深渊的统治者，拥有毁灭性的力量',
    rewards: {
      gold: 500,
      exp: 600,
      gems: 40
    },
    difficulty: 'legendary'
  },
  {
    id: 'enemy_006',
    name: '毒蜘蛛',
    maxHp: 180,
    attack: 20,
    defense: 8,
    speed: 12,
    critRate: 8,
    critDamage: 75,
    description: '带有剧毒的蜘蛛，会降低敌人的防御',
    rewards: {
      gold: 80,
      exp: 120,
      gems: 8
    },
    difficulty: 'normal'
  },
  {
    id: 'enemy_007',
    name: '火焰元素',
    maxHp: 250,
    attack: 35,
    defense: 15,
    speed: 10,
    critRate: 12,
    critDamage: 90,
    description: '燃烧的元素生物，攻击带有火焰伤害',
    rewards: {
      gold: 150,
      exp: 200,
      gems: 12
    },
    difficulty: 'hard'
  },
  {
    id: 'enemy_008',
    name: '黑暗骑士',
    maxHp: 400,
    attack: 50,
    defense: 25,
    speed: 18,
    critRate: 20,
    critDamage: 110,
    description: '被诅咒的骑士，速度和攻击力都很出色',
    rewards: {
      gold: 250,
      exp: 300,
      gems: 20
    },
    difficulty: 'nightmare'
  }
];

export function getEnemyById(id: string): Enemy | undefined {
  return enemyDatabase.find(enemy => enemy.id === id);
}

export function getEnemiesByDifficulty(difficulty: string): Enemy[] {
  return enemyDatabase.filter(enemy => enemy.difficulty === difficulty);
}
