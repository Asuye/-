import { motion, AnimatePresence } from 'framer-motion';
import { useBattleStore } from '@/store/battleStore';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { Shield, Sword, Heart, Zap, ArrowLeft, Sparkles, X, Award } from 'lucide-react';
import type { Enemy } from '@/types/battle';

interface BattleProps {
  enemy: Enemy;
  onClose: () => void;
  onVictory: (enemy: Enemy) => void;
  onDefeat: () => void;
}

export function Battle({ enemy, onClose, onVictory, onDefeat }: BattleProps) {
  const { battleState, isBattling, nextTurn, endBattle, getBattleResult } = useBattleStore();
  const { addExp, addGold, addGems } = useGameStore();
  
  const result = getBattleResult();
  
  const handleNextTurn = () => {
    nextTurn();
    
    // 检查战斗结果
    setTimeout(() => {
      const newResult = getBattleResult();
      if (newResult === 'victory') {
        // 给予奖励
        addExp(enemy.rewards.exp);
        addGold(enemy.rewards.gold);
        addGems(enemy.rewards.gems);
        onVictory(enemy);
      } else if (newResult === 'defeat') {
        onDefeat();
      }
    }, 1000);
  };
  
  const handleEndBattle = () => {
    endBattle();
    onClose();
  };
  
  if (!battleState) return null;
  
  const player = battleState.player;
  const currentEnemy = battleState.enemy;
  const logs = battleState.logs;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'normal': return 'bg-blue-600';
      case 'hard': return 'bg-purple-600';
      case 'nightmare': return 'bg-red-600';
      case 'legendary': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl bg-gray-900 border border-gray-700"
      >
        {/* 战斗信息 */}
        <div className="bg-gray-800/50 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button onClick={handleEndBattle} size="sm" variant="secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                退出
              </Button>
              <h2 className="text-xl font-bold text-white">战斗</h2>
            </div>
            <div className="text-sm text-gray-400">
              回合: {battleState.turn}
            </div>
          </div>
        </div>
        
        {/* 战斗状态 */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* 玩家信息 */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">冒险家</h3>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-bold">{player.currentHp}/{player.maxHp}</span>
              </div>
            </div>
            
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-red-500 rounded-full transition-all" 
                style={{ width: `${(player.currentHp / player.maxHp) * 100}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Sword className="w-3 h-3 text-red-400" />
                <span className="text-gray-400">攻击:</span>
                <span className="text-white font-medium">{player.attack}</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-blue-400" />
                <span className="text-gray-400">防御:</span>
                <span className="text-white font-medium">{player.defense}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-gray-400">速度:</span>
                <span className="text-white font-medium">{player.speed}</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span className="text-gray-400">暴击:</span>
                <span className="text-white font-medium">{player.critRate}%</span>
              </div>
            </div>
          </div>
          
          {/* 敌人信息 */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">{currentEnemy.name}</h3>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-bold">{currentEnemy.currentHp}/{currentEnemy.maxHp}</span>
              </div>
            </div>
            
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-red-500 rounded-full transition-all" 
                style={{ width: `${(currentEnemy.currentHp / currentEnemy.maxHp) * 100}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Sword className="w-3 h-3 text-red-400" />
                <span className="text-gray-400">攻击:</span>
                <span className="text-white font-medium">{currentEnemy.attack}</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold ${getDifficultyColor(enemy.difficulty)} text-white`}>
                {enemy.difficulty === 'easy' ? '简单' : 
                 enemy.difficulty === 'normal' ? '普通' : 
                 enemy.difficulty === 'hard' ? '困难' : 
                 enemy.difficulty === 'nightmare' ? '噩梦' : '传说'}
              </div>
            </div>
          </div>
        </div>
        
        {/* 战斗日志 */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900/50">
          <h3 className="text-lg font-bold text-white mb-3">战斗日志</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {logs.slice(-10).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 rounded-lg p-2 text-sm"
                >
                  <div className="flex gap-2">
                    <span className="text-gray-400">[{log.turn}]</span>
                    <span className="text-blue-400 font-medium">{log.actor}:</span>
                    <span className="text-white">{log.action}</span>
                  </div>
                  {(log.damage || log.heal || log.effect || log.specialEffect) && (
                    <div className="ml-8 mt-1">
                      {log.damage && (
                        <span className="text-red-400">造成 {log.damage} 点伤害</span>
                      )}
                      {log.heal && (
                        <span className="text-green-400">恢复 {log.heal} 点生命</span>
                      )}
                      {log.effect && (
                        <span className="text-yellow-400">{log.effect}</span>
                      )}
                      {log.specialEffect && (
                        <span className="text-purple-400">{log.specialEffect}</span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* 战斗控制 */}
        <div className="bg-gray-800/50 border-t border-gray-700 p-4">
          {result === 'victory' ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-400 mb-3">
                <Award className="w-6 h-6" />
                <h3 className="text-xl font-bold">战斗胜利！</h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-green-900/30 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-400">经验</div>
                  <div className="text-lg font-bold text-green-400">+{enemy.rewards.exp}</div>
                </div>
                <div className="bg-yellow-900/30 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-400">金币</div>
                  <div className="text-lg font-bold text-yellow-400">+{enemy.rewards.gold}</div>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-400">钻石</div>
                  <div className="text-lg font-bold text-purple-400">+{enemy.rewards.gems}</div>
                </div>
              </div>
              <Button onClick={handleEndBattle} size="lg" variant="success" className="w-full">
                领取奖励
              </Button>
            </div>
          ) : result === 'defeat' ? (
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-400 mb-4">战斗失败</h3>
              <p className="text-gray-400 mb-4">你被击败了，但不要气馁，继续提升你的能力！</p>
              <Button onClick={handleEndBattle} size="lg" variant="danger" className="w-full">
                返回
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button 
                onClick={handleNextTurn} 
                size="lg" 
                variant="primary" 
                className="flex-1"
              >
                <Sword className="w-5 h-5 mr-2" />
                攻击
              </Button>
              <Button 
                onClick={handleEndBattle} 
                size="lg" 
                variant="secondary" 
                className="flex-1"
              >
                <X className="w-5 h-5 mr-2" />
                逃跑
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
