import type { Stage } from '@/types/stage';

export const stageDatabase: Stage[] = [
  {
    id: 'stage_001',
    name: '迷雾森林',
    description: '被浓雾笼罩的神秘森林，传说中隐藏着古老的宝藏。',
    requiredLevel: 1,
    startNodeId: 'node_001',
    nodes: [
      {
        id: 'node_001',
        type: 'story',
        text: '你踏入了一片被浓雾笼罩的森林。四周静悄悄的，只有偶尔传来的鸟鸣声打破寂静。前方的道路分成了两条...',
        nextNodeId: 'node_002'
      },
      {
        id: 'node_002',
        type: 'choice',
        text: '你站在岔路口，需要做出选择。',
        choices: [
          { id: 'choice_001', text: '沿着左边的小路前进', nextNodeId: 'node_003' },
          { id: 'choice_002', text: '沿着右边的大路前进', nextNodeId: 'node_004' }
        ]
      },
      {
        id: 'node_003',
        type: 'story',
        text: '你选择了左边的小路。穿过茂密的灌木丛，你发现了一个隐藏的宝箱！',
        nextNodeId: 'node_003_battle'
      },
      {
        id: 'node_003_battle',
        type: 'battle',
        text: '正当你要打开宝箱时，一只哥布林斥候跳了出来！',
        enemyId: 'enemy_001',
        nextNodeId: 'node_005'
      },
      {
        id: 'node_004',
        type: 'story',
        text: '你沿着大路前进，突然听到前方传来低沉的咆哮声。',
        nextNodeId: 'node_004_battle'
      },
      {
        id: 'node_004_battle',
        type: 'battle',
        text: '一只森林狼挡住了你的去路，它的眼中闪烁着饥饿的光芒！',
        enemyId: 'enemy_002',
        nextNodeId: 'node_005'
      },
      {
        id: 'node_005',
        type: 'story',
        text: '战斗结束后，你继续深入森林。雾气渐渐散去，你看到了一座古老的遗迹入口。',
        nextNodeId: 'node_006'
      },
      {
        id: 'node_006',
        type: 'reward',
        text: '恭喜你完成了迷雾森林的探索！你获得了丰厚的奖励。',
        rewards: { gold: 100, exp: 100 },
        nextNodeId: 'node_end'
      },
      {
        id: 'node_end',
        type: 'story',
        text: '你的冒险才刚刚开始...'
      }
    ],
    rewards: {
      firstClear: { gold: 200, gems: 50, cardId: 'card_013' }
    }
  },
  {
    id: 'stage_002',
    name: '幽暗洞穴',
    description: '深不见底的洞穴中回荡着诡异的声音，据说住着可怕的怪物。',
    requiredLevel: 3,
    startNodeId: 'cave_001',
    nodes: [
      {
        id: 'cave_001',
        type: 'story',
        text: '你走进了一个幽暗的洞穴。火把的光芒只能照亮前方几米的距离，远处传来滴水的回声。',
        nextNodeId: 'cave_002'
      },
      {
        id: 'cave_002',
        type: 'story',
        text: '洞穴的墙壁上刻满了古老的符文，似乎在诉说着某种警告。你继续前进，突然感觉到有什么东西在注视着你...',
        nextNodeId: 'cave_003'
      },
      {
        id: 'cave_003',
        type: 'battle',
        text: '一群暗影蝙蝠从头顶俯冲而下！',
        enemyId: 'enemy_005',
        nextNodeId: 'cave_004'
      },
      {
        id: 'cave_004',
        type: 'choice',
        text: '蝙蝠被击退后，你发现前方有两个通道。左边传来微弱的光芒，右边则是一片漆黑。',
        choices: [
          { id: 'cave_left', text: '走向有光芒的通道', nextNodeId: 'cave_005' },
          { id: 'cave_right', text: '探索黑暗的通道', nextNodeId: 'cave_006' }
        ]
      },
      {
        id: 'cave_005',
        type: 'story',
        text: '光芒来自一块发光的水晶。当你靠近时，水晶突然碎裂，释放出一股神秘的力量！',
        nextNodeId: 'cave_005_battle'
      },
      {
        id: 'cave_005_battle',
        type: 'battle',
        text: '水晶的碎片凝聚成了一个石头巨人！',
        enemyId: 'enemy_006',
        nextNodeId: 'cave_007'
      },
      {
        id: 'cave_006',
        type: 'battle',
        text: '黑暗中突然亮起两盏红灯——那是一双眼睛！骷髅战士从阴影中现身！',
        enemyId: 'enemy_003',
        nextNodeId: 'cave_007'
      },
      {
        id: 'cave_007',
        type: 'story',
        text: '经过艰苦的战斗，你终于来到了洞穴的最深处。这里有一座古老的祭坛，上面放着一件神秘的物品。',
        nextNodeId: 'cave_008'
      },
      {
        id: 'cave_008',
        type: 'reward',
        text: '你完成了幽暗洞穴的探索！祭坛上的物品散发着神秘的光芒。',
        rewards: { gold: 200, exp: 200 },
        nextNodeId: 'cave_end'
      },
      {
        id: 'cave_end',
        type: 'story',
        text: '洞穴的深处似乎还有更多的秘密等待探索...'
      }
    ],
    rewards: {
      firstClear: { gold: 400, gems: 100, cardId: 'card_005' }
    }
  },
  {
    id: 'stage_003',
    name: '冰霜山脉',
    description: '终年积雪的高山，传说山顶住着一位冰霜女巫。',
    requiredLevel: 5,
    startNodeId: 'mountain_001',
    nodes: [
      {
        id: 'mountain_001',
        type: 'story',
        text: '你来到了冰霜山脉的脚下。刺骨的寒风呼啸而过，雪花在空中飞舞。这座山终年被冰雪覆盖，很少有人能够攀登到顶峰。',
        nextNodeId: 'mountain_002'
      },
      {
        id: 'mountain_002',
        type: 'story',
        text: '你开始攀登。每一步都异常艰难，脚下的积雪没过膝盖。突然，你脚下一滑...',
        nextNodeId: 'mountain_003'
      },
      {
        id: 'mountain_003',
        type: 'choice',
        text: '你稳住身形，发现前方有两条路：一条是沿着山脊前进，另一条是穿过一个冰洞。',
        choices: [
          { id: 'ridge', text: '沿着山脊前进', nextNodeId: 'mountain_004' },
          { id: 'cave', text: '穿过冰洞', nextNodeId: 'mountain_005' }
        ]
      },
      {
        id: 'mountain_004',
        type: 'battle',
        text: '山脊上突然出现了一团火焰！是火焰史莱姆！在这冰天雪地中竟然有火焰生物存在！',
        enemyId: 'enemy_004',
        nextNodeId: 'mountain_006'
      },
      {
        id: 'mountain_005',
        type: 'story',
        text: '冰洞内部比想象中要宽敞。墙壁上结满了冰晶，折射出美丽的光芒。但是，你感觉到一股寒意从深处传来...',
        nextNodeId: 'mountain_005_battle'
      },
      {
        id: 'mountain_005_battle',
        type: 'battle',
        text: '冰霜女巫的仆从出现在你面前！',
        enemyId: 'enemy_007',
        nextNodeId: 'mountain_006'
      },
      {
        id: 'mountain_006',
        type: 'story',
        text: '你终于来到了山顶。一座冰晶宫殿矗立在你面前，宫殿的大门缓缓打开...',
        nextNodeId: 'mountain_007'
      },
      {
        id: 'mountain_007',
        type: 'battle',
        text: '冰霜女巫亲自出现在你面前！"愚蠢的旅人，你竟敢打扰我的安宁！"',
        enemyId: 'enemy_007',
        nextNodeId: 'mountain_008'
      },
      {
        id: 'mountain_008',
        type: 'reward',
        text: '冰霜女巫被击败了！她在消失前留下了一件珍贵的宝物。',
        rewards: { gold: 500, exp: 400 },
        nextNodeId: 'mountain_end'
      },
      {
        id: 'mountain_end',
        type: 'story',
        text: '冰霜山脉的秘密已被揭开，但更强大的敌人还在前方等待...'
      }
    ],
    rewards: {
      firstClear: { gold: 800, gems: 150, cardId: 'card_006' }
    }
  },
  {
    id: 'stage_004',
    name: '深渊裂隙',
    description: '大地裂开形成的深渊，据说通向魔界的入口。',
    requiredLevel: 8,
    startNodeId: 'abyss_001',
    nodes: [
      {
        id: 'abyss_001',
        type: 'story',
        text: '你站在深渊裂隙的边缘，向下望去只能看到无尽的黑暗。一股灼热的气息从裂隙中涌出，仿佛地狱的入口。',
        nextNodeId: 'abyss_002'
      },
      {
        id: 'abyss_002',
        type: 'story',
        text: '你开始沿着裂隙的边缘下降。越往下走，温度就越高。四周的岩壁呈现出暗红色，仿佛刚刚冷却的岩浆。',
        nextNodeId: 'abyss_003'
      },
      {
        id: 'abyss_003',
        type: 'battle',
        text: '一只炎魔从岩浆中爬出！"入侵者，你将成为我的燃料！"',
        enemyId: 'enemy_008',
        nextNodeId: 'abyss_004'
      },
      {
        id: 'abyss_004',
        type: 'story',
        text: '炎魔被击败后化作一团火焰消失。你继续深入，来到了一个巨大的地下空间。这里有一座黑色的祭坛，上面站着一个身影...',
        nextNodeId: 'abyss_005'
      },
      {
        id: 'abyss_005',
        type: 'battle',
        text: '"终于有人来了..."暗影领主缓缓转过身，"我已经等待太久了。让我看看你的力量是否值得我出手！"',
        enemyId: 'enemy_boss_001',
        nextNodeId: 'abyss_006'
      },
      {
        id: 'abyss_006',
        type: 'reward',
        text: '暗影领主被击败了！他的身躯化作无数暗影粒子消散，只留下了一件闪耀着神秘光芒的装备。',
        rewards: { gold: 1000, exp: 800 },
        nextNodeId: 'abyss_end'
      },
      {
        id: 'abyss_end',
        type: 'story',
        text: '深渊的秘密被揭开，但传说中最强大的存在还在沉睡中...'
      }
    ],
    rewards: {
      firstClear: { gold: 1500, gems: 300, cardId: 'card_004' }
    }
  },
  {
    id: 'stage_005',
    name: '龙之巢穴',
    description: '传说中远古巨龙的栖息地，只有最勇敢的冒险者才敢踏足。',
    requiredLevel: 10,
    startNodeId: 'dragon_001',
    nodes: [
      {
        id: 'dragon_001',
        type: 'story',
        text: '你来到了龙之巢穴的入口。巨大的洞穴足以容纳一座城堡，空气中弥漫着硫磺的味道。地面上散落着无数冒险者的遗物...',
        nextNodeId: 'dragon_002'
      },
      {
        id: 'dragon_002',
        type: 'story',
        text: '你小心翼翼地前进。洞穴深处传来沉重的呼吸声，每一次呼吸都让整个洞穴震动。你终于看到了它——一头沉睡中的远古巨龙！',
        nextNodeId: 'dragon_003'
      },
      {
        id: 'dragon_003',
        type: 'choice',
        text: '巨龙似乎在沉睡，你有机会悄悄绕过它，或者直接发起挑战。',
        choices: [
          { id: 'sneak', text: '悄悄绕过巨龙', nextNodeId: 'dragon_004' },
          { id: 'fight', text: '直接挑战巨龙！', nextNodeId: 'dragon_005' }
        ]
      },
      {
        id: 'dragon_004',
        type: 'story',
        text: '你屏住呼吸，小心翼翼地从巨龙身边绕过。就在你即将成功时，你不小心踩到了一块金币——',
        nextNodeId: 'dragon_005'
      },
      {
        id: 'dragon_005',
        type: 'battle',
        text: '"谁敢打扰我的沉眠？！"远古巨龙睁开了它那燃烧着火焰的眼睛，"愚蠢的人类，你将成为我的点心！"',
        enemyId: 'enemy_boss_002',
        nextNodeId: 'dragon_006'
      },
      {
        id: 'dragon_006',
        type: 'reward',
        text: '传说中的远古巨龙被你击败了！它的身体化作无数光芒消散，留下了最珍贵的宝藏。',
        rewards: { gold: 2000, exp: 1500 },
        nextNodeId: 'dragon_end'
      },
      {
        id: 'dragon_end',
        type: 'story',
        text: '你成为了传说中的屠龙者。但这个世界还有更多的秘密等待你去探索...'
      }
    ],
    rewards: {
      firstClear: { gold: 3000, gems: 500, cardId: 'card_001' }
    }
  }
];

export function getStageById(id: string): Stage | undefined {
  return stageDatabase.find(stage => stage.id === id);
}

export function getUnlockedStages(playerLevel: number): Stage[] {
  return stageDatabase.filter(stage => stage.requiredLevel <= playerLevel);
}
