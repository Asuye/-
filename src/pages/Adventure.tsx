import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { useBattleStore } from '@/store/battleStore';
import { Button } from '@/components/Button';
import { Battle } from '@/components/Battle';
import { ArrowLeft, Lock, Star, Sword, Shield, Heart, Zap, Sparkles, Coins, Gem, Award } from 'lucide-react';
import { getEnemyById } from '@/data/enemies';

interface Stage {
  id: string;
  name: string;
  description: string;
  requiredLevel: number;
  difficulty: '简单' | '普通' | '困难' | '噩梦' | '传说';
  enemyId: string;
}

export function Adventure() {
  const navigate = useNavigate();
  const { player, stats } = useGameStore();
  const { startBattle } = useBattleStore();
  const [selectedEnemy, setSelectedEnemy] = useState<any>(null);
  const [showBattle, setShowBattle] = useState(false);
  
  const stages: Stage[] = [
    {
      id: 'stage_001',
      name: '新手训练场',
      description: '适合初学者的训练场，熟悉战斗机制',
      requiredLevel: 1,
      difficulty: '简单',
      enemyId: 'enemy_001'
    },
    {
      id: 'stage_002',
      name: '迷雾森林',
      description: '森林中隐藏着各种挑战',
      requiredLevel: 3,
      difficulty: '普通',
      enemyId: 'enemy_002'
    },
    {
      id: 'stage_003',
      name: '幽暗洞穴',
      description: '深入地下的危险地带',
      requiredLevel: 5,
      difficulty: '困难',
      enemyId: 'enemy_003'
    },
    {
      id: 'stage_004',
      name: '冰霜山脉',
      description: '寒冷的高山等待着你',
      requiredLevel: 8,
      difficulty: '噩梦',
      enemyId: 'enemy_004'
    },
    {
      id: 'stage_005',
      name: '深渊裂隙',
      description: '最强大的敌人在这里',
      requiredLevel: 10,
      difficulty: '传说',
      enemyId: 'enemy_005'
    }
  ];
  
  const handleStartBattle = (stage: Stage) => {
    const enemy = getEnemyById(stage.enemyId);
    if (enemy) {
      startBattle(stats, enemy, stats.specialEffects);
      setSelectedEnemy(enemy);
      setShowBattle(true);
    }
  };
  
  const handleVictory = (enemy: any) => {
    // 战斗胜利处理
    setShowBattle(false);
    setSelectedEnemy(null);
  };
  
  const handleDefeat = () => {
    // 战斗失败处理
    setShowBattle(false);
    setSelectedEnemy(null);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单': return 'bg-green-900/50 text-green-400 border-green-700/50';
      case '普通': return 'bg-blue-900/50 text-blue-400 border-blue-700/50';
      case '困难': return 'bg-purple-900/50 text-purple-400 border-purple-700/50';
      case '噩梦': return 'bg-red-900/50 text-red-400 border-red-700/50';
      case '传说': return 'bg-yellow-900/50 text-yellow-400 border-yellow-700/50';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-700/50';
    }
  };
  
  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case '简单': return 'bg-green-600';
      case '普通': return 'bg-blue-600';
      case '困难': return 'bg-purple-600';
      case '噩梦': return 'bg-red-600';
      case '传说': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回主页
        </button>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">冒险关卡</h1>
          <p className="text-gray-400">用你的能力组合挑战冒险</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700"
        >
          <h3 className="text-lg font-bold text-white mb-3">当前能力属性</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <div className="text-center">
              <div className="text-red-400 text-sm">攻击</div>
              <div className="text-xl font-bold text-white">{stats.attack}</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-sm">防御</div>
              <div className="text-xl font-bold text-white">{stats.defense}</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 text-sm">生命</div>
              <div className="text-xl font-bold text-white">{stats.hp}</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-sm">速度</div>
              <div className="text-xl font-bold text-white">{stats.speed}</div>
            </div>
            <div className="text-center">
              <div className="text-pink-400 text-sm">暴击率</div>
              <div className="text-xl font-bold text-white">{stats.critRate}%</div>
            </div>
            <div className="text-center">
              <div className="text-orange-400 text-sm">暴击伤害</div>
              <div className="text-xl font-bold text-white">{stats.critDamage}%</div>
            </div>
          </div>
          
          {stats.specialEffects.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-bold text-white mb-2">特殊效果</h4>
              <div className="flex flex-wrap gap-2">
                {stats.specialEffects.map((effect: any, index: number) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/50">
                    {effect.description}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="grid gap-4">
          {stages.map((stage, index) => {
            const isUnlocked = player.level >= stage.requiredLevel;
            const enemy = getEnemyById(stage.enemyId);
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl transition-all ${isUnlocked ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-purple-500' : 'bg-gray-900/50 border border-gray-800 opacity-60 cursor-not-allowed'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getDifficultyBg(stage.difficulty)}`}>
                      {isUnlocked ? (
                        <Star className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{stage.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(stage.difficulty)}`}>
                          {stage.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">{stage.description}</p>
                      
                      {isUnlocked && enemy && (
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Heart className="w-4 h-4 text-red-400" />
                            <span className="text-gray-400">生命:</span>
                            <span className="text-white">{enemy.maxHp}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Sword className="w-4 h-4 text-red-400" />
                            <span className="text-gray-400">攻击:</span>
                            <span className="text-white">{enemy.attack}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-400">防御:</span>
                            <span className="text-white">{enemy.defense}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-400">速度:</span>
                            <span className="text-white">{enemy.speed}</span>
                          </div>
                        </div>
                      )}
                      
                      {isUnlocked && enemy && (
                        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Coins className="w-3 h-3 text-yellow-400" />
                            <span className="text-gray-400">金币:</span>
                            <span className="text-yellow-400">+{enemy.rewards.gold}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span className="text-gray-400">经验:</span>
                            <span className="text-blue-400">+{enemy.rewards.exp}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gem className="w-3 h-3 text-purple-400" />
                            <span className="text-gray-400">钻石:</span>
                            <span className="text-purple-400">+{enemy.rewards.gems}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {isUnlocked ? (
                      <Button size="lg" onClick={() => handleStartBattle(stage)}>
                        <Sword className="w-5 h-5 mr-2" />
                        开始挑战
                      </Button>
                    ) : (
                      <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-1">
                          <Lock className="w-4 h-4" />
                          <span>需要 Lv.{stage.requiredLevel}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {showBattle && selectedEnemy && (
        <Battle 
          enemy={selectedEnemy} 
          onClose={() => setShowBattle(false)}
          onVictory={handleVictory}
          onDefeat={handleDefeat}
        />
      )}
    </div>
  );
}
