import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { useBattleStore } from '@/store/battleStore';
import { Button } from '@/components/Button';
import { HealthBar } from '@/components/StatusBar';
import { BondDisplay } from '@/components/BondDisplay';
import { stageDatabase, getStageById } from '@/data/stages';
import { getEnemyById } from '@/data/enemies';
import type { Stage, StageNode } from '@/types/stage';
import { Lock, Star, ArrowLeft, Swords, Shield, Heart, Zap } from 'lucide-react';

export function Adventure() {
  const navigate = useNavigate();
  const { player, unlockedStages, completedStages, stageStars, addGold, addExp, completeStage, getDeckCards, activeBonds } = useGameStore();
  const { battleState, isBattling, startBattle, playerAttack, playerSkill, enemyTurn, endBattle, getBattleResult } = useBattleStore();
  
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [currentNode, setCurrentNode] = useState<StageNode | null>(null);
  const [battleResult, setBattleResult] = useState<'victory' | 'defeat' | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [reward, setReward] = useState<{ gold: number; exp: number } | null>(null);
  
  const deckCards = getDeckCards();
  
  useEffect(() => {
    if (battleState && !isBattling) {
      const result = getBattleResult();
      if (result) {
        setBattleResult(result);
        if (result === 'victory') {
          const enemy = getEnemyById(currentNode?.enemyId || '');
          if (enemy) {
            setReward(enemy.rewards);
            setShowReward(true);
          }
        }
      }
    }
  }, [battleState, isBattling]);
  
  const handleEnemyTurn = () => {
    setTimeout(() => {
      enemyTurn();
    }, 500);
  };
  
  const handleAttack = () => {
    playerAttack();
    if (battleState && battleState.enemy.currentHp > 0) {
      handleEnemyTurn();
    }
  };
  
  const handleSkill = (index: number) => {
    playerSkill(index);
    if (battleState && battleState.enemy.currentHp > 0) {
      handleEnemyTurn();
    }
  };
  
  const handleSelectStage = (stage: Stage) => {
    if (player.level < stage.requiredLevel) {
      alert(`需要等级 ${stage.requiredLevel} 才能挑战！`);
      return;
    }
    if (!unlockedStages.includes(stage.id)) {
      alert('关卡尚未解锁！');
      return;
    }
    setSelectedStage(stage);
    setCurrentNode(stage.nodes.find(n => n.id === stage.startNodeId) || null);
    setBattleResult(null);
    setShowReward(false);
    setReward(null);
    endBattle();
  };
  
  const handleChoice = (nextNodeId: string) => {
    if (!selectedStage) return;
    const nextNode = selectedStage.nodes.find(n => n.id === nextNodeId);
    if (nextNode) {
      setCurrentNode(nextNode);
    }
  };
  
  const handleBattleStart = () => {
    if (!currentNode?.enemyId) return;
    const enemy = getEnemyById(currentNode.enemyId);
    if (!enemy) return;
    startBattle(deckCards, activeBonds, enemy);
  };
  
  const handleBattleEnd = () => {
    if (battleResult === 'victory' && reward) {
      addGold(reward.gold);
      addExp(reward.exp);
      if (selectedStage) {
        completeStage(selectedStage.id, 3);
      }
    }
    endBattle();
    setBattleResult(null);
    setShowReward(false);
    
    if (currentNode?.nextNodeId && selectedStage) {
      const nextNode = selectedStage.nodes.find(n => n.id === currentNode.nextNodeId);
      if (nextNode) {
        setCurrentNode(nextNode);
      }
    }
  };
  
  const handleBackToMap = () => {
    setSelectedStage(null);
    setCurrentNode(null);
    endBattle();
  };
  
  if (selectedStage && currentNode) {
    if (isBattling && battleState) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-gray-400">回合 {battleState.turn}</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-blue-500/30"
              >
                <h3 className="text-lg font-bold text-blue-400 mb-2">{battleState.player.name}</h3>
                <HealthBar current={battleState.player.currentHp} max={battleState.player.maxHp} color="blue" />
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-red-400">
                    <Swords className="w-4 h-4" /> {battleState.player.attack}
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <Shield className="w-4 h-4" /> {battleState.player.defense}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-red-500/30"
              >
                <h3 className="text-lg font-bold text-red-400 mb-2">{battleState.enemy.name}</h3>
                <HealthBar current={battleState.enemy.currentHp} max={battleState.enemy.maxHp} color="red" />
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-red-400">
                    <Swords className="w-4 h-4" /> {battleState.enemy.attack}
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <Shield className="w-4 h-4" /> {battleState.enemy.defense}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {activeBonds.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2">激活羁绊</h4>
                <div className="flex flex-wrap gap-2">
                  {activeBonds.map(bond => (
                    <BondDisplay key={bond.id} bond={bond} compact />
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-gray-800/50 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto">
              {battleState.logs.slice(-5).map((log, index) => (
                <div key={index} className="text-sm text-gray-300 mb-1">
                  {log.action} {log.target && `→ ${log.target}`} {log.damage && `(${log.damage}伤害)`}
                </div>
              ))}
            </div>
            
            {battleState.phase === 'player' && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={handleAttack}>普通攻击</Button>
                {battleState.player.skills.map((skill, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSkill(index)}
                    variant="secondary"
                    disabled={skill.currentCooldown > 0}
                  >
                    {skill.name} {skill.currentCooldown > 0 && `(${skill.currentCooldown})`}
                  </Button>
                ))}
              </div>
            )}
            
            {battleState.phase === 'enemy' && (
              <div className="text-center text-yellow-400">敌人回合...</div>
            )}
            
            <AnimatePresence>
              {battleResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-center p-8"
                  >
                    <h2 className={`text-4xl font-bold mb-4 ${battleResult === 'victory' ? 'text-green-400' : 'text-red-400'}`}>
                      {battleResult === 'victory' ? '胜利！' : '失败...'}
                    </h2>
                    {reward && battleResult === 'victory' && (
                      <div className="text-white mb-4">
                        <p>获得 {reward.gold} 金币</p>
                        <p>获得 {reward.exp} 经验</p>
                      </div>
                    )}
                    <Button onClick={handleBattleEnd}>继续</Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleBackToMap}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回地图
          </button>
          
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
          >
            <div className="text-center mb-6">
              <span className="text-sm text-purple-400">{selectedStage.name}</span>
            </div>
            
            <p className="text-white text-lg mb-6 leading-relaxed whitespace-pre-line">
              {currentNode.text}
            </p>
            
            {currentNode.type === 'choice' && currentNode.choices && (
              <div className="space-y-3">
                {currentNode.choices.map(choice => (
                  <Button
                    key={choice.id}
                    onClick={() => handleChoice(choice.nextNodeId)}
                    className="w-full justify-start"
                    variant="secondary"
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            )}
            
            {currentNode.type === 'battle' && currentNode.enemyId && (
              <div className="text-center">
                <Button onClick={handleBattleStart} size="lg">
                  <Swords className="w-5 h-5 mr-2" />
                  开始战斗
                </Button>
              </div>
            )}
            
            {currentNode.type === 'reward' && currentNode.rewards && (
              <div className="text-center">
                <div className="bg-green-900/30 rounded-lg p-4 mb-4">
                  <p className="text-green-400 mb-2">获得奖励：</p>
                  <p className="text-white">💰 {currentNode.rewards.gold} 金币</p>
                  <p className="text-white">⭐ {currentNode.rewards.exp} 经验</p>
                </div>
                {currentNode.nextNodeId && (
                  <Button onClick={() => handleChoice(currentNode.nextNodeId!)}>
                    继续
                  </Button>
                )}
              </div>
            )}
            
            {currentNode.type === 'story' && currentNode.nextNodeId && (
              <div className="text-center">
                <Button onClick={() => handleChoice(currentNode.nextNodeId!)}>
                  继续
                </Button>
              </div>
            )}
            
            {!currentNode.nextNodeId && currentNode.type !== 'choice' && currentNode.type !== 'battle' && (
              <div className="text-center">
                <Button onClick={handleBackToMap} variant="success">
                  完成关卡
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
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
          <p className="text-gray-400">选择关卡开始冒险</p>
        </motion.div>
        
        <div className="grid gap-4">
          {stageDatabase.map((stage, index) => {
            const isUnlocked = player.level >= stage.requiredLevel && unlockedStages.includes(stage.id);
            const isCompleted = completedStages.includes(stage.id);
            const stars = stageStars[stage.id] || 0;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => isUnlocked && handleSelectStage(stage)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  isUnlocked
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-purple-500'
                    : 'bg-gray-900/50 border border-gray-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isCompleted ? 'bg-green-600' : isUnlocked ? 'bg-purple-600' : 'bg-gray-700'
                    }`}>
                      {isUnlocked ? (
                        <Swords className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{stage.name}</h3>
                      <p className="text-sm text-gray-400">{stage.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map(s => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400">
                      Lv.{stage.requiredLevel} 需要
                    </div>
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
