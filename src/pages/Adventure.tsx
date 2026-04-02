import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { ArrowLeft, Lock, Star } from 'lucide-react';

export function Adventure() {
  const navigate = useNavigate();
  const { player, stats } = useGameStore();
  
  const stages = [
    {
      id: 'stage_001',
      name: '新手训练场',
      description: '适合初学者的训练场，熟悉战斗机制',
      requiredLevel: 1,
      difficulty: '简单'
    },
    {
      id: 'stage_002',
      name: '迷雾森林',
      description: '森林中隐藏着各种挑战',
      requiredLevel: 3,
      difficulty: '普通'
    },
    {
      id: 'stage_003',
      name: '幽暗洞穴',
      description: '深入地下的危险地带',
      requiredLevel: 5,
      difficulty: '困难'
    },
    {
      id: 'stage_004',
      name: '冰霜山脉',
      description: '寒冷的高山等待着你',
      requiredLevel: 8,
      difficulty: '噩梦'
    },
    {
      id: 'stage_005',
      name: '深渊裂隙',
      description: '最强大的敌人在这里',
      requiredLevel: 10,
      difficulty: '传说'
    }
  ];
  
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
        </motion.div>
        
        <div className="grid gap-4">
          {stages.map((stage, index) => {
            const isUnlocked = player.level >= stage.requiredLevel;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  isUnlocked
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-purple-500'
                    : 'bg-gray-900/50 border border-gray-800 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isUnlocked ? 'bg-purple-600' : 'bg-gray-700'
                    }`}
                    >
                      {isUnlocked ? (
                        <Star className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{stage.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          stage.difficulty === '简单' ? 'bg-green-900/50 text-green-400' :
                          stage.difficulty === '普通' ? 'bg-blue-900/50 text-blue-400' :
                          stage.difficulty === '困难' ? 'bg-purple-900/50 text-purple-400' :
                          stage.difficulty === '噩梦' ? 'bg-red-900/50 text-red-400' :
                          'bg-yellow-900/50 text-yellow-400'
                        }`}
                        >
                          {stage.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{stage.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {isUnlocked ? (
                      <Button size="sm" onClick={() => alert('冒险即将推出！')}>开始挑战</Button>
                    ) : (
                      <div className="text-xs text-gray-400">
                        需要 Lv.{stage.requiredLevel}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
