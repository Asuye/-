import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { AbilityDisplay, AbilityDetailModal } from '@/components/AbilityDisplay';
import { Button } from '@/components/Button';
import type { Ability } from '@/types/ability';
import { ArrowLeft, Plus, X, AlertTriangle, Sparkles } from 'lucide-react';

export function Deck() {
  const navigate = useNavigate();
  const { 
    ownedAbilities, 
    activeAbilities, 
    activateAbility, 
    deactivateAbility,
    conflicts,
    synergies,
    stats
  } = useGameStore();
  
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  
  const availableAbilities = ownedAbilities.filter(
    a => !activeAbilities.some(active => active.ability.id === a.id)
  );
  
  const hasConflict = (ability: Ability) => conflicts.some(c => c.includes(ability.name));
  
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
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-white mb-2">能力组合</h1>
          <p className="text-gray-400">搭配6个能力，发现神奇的组合</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">
                当前组合 ({activeAbilities.length}/6)
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[0, 1, 2, 3, 4, 5].map((slot) => {
                  const active = activeAbilities[slot];
                  
                  return (
                    <div key={slot} className="relative">
                      {active ? (
                        <div className="relative">
                          <AbilityDisplay
                            ability={active.ability}
                            size="md"
                            isActive={true}
                            hasConflict={hasConflict(active.ability)}
                            onClick={() => setSelectedAbility(active.ability)}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deactivateAbility(active.ability.id);
                            }}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-56 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center text-gray-500 bg-gray-800/30">
                          <Plus className="w-8 h-8 mb-2" />
                          <span>空槽位</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {conflicts.length > 0 && (
              <div className="bg-red-900/30 rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold">能力冲突警告</span>
                </div>
                <div className="space-y-1">
                  {conflicts.map((conflict, index) => (
                    <div key={index} className="text-sm text-red-300">
                      {conflict}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {synergies.length > 0 && (
              <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold">协同效果激活！</span>
                </div>
                <div className="space-y-2">
                  {synergies.map((synergy, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-3">
                      <div className="text-green-300 font-medium">{synergy.name}</div>
                      <div className="text-sm text-green-200">{synergy.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">可用能力</h2>
              
              {availableAbilities.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  所有能力都已激活，或者还没有获得能力
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableAbilities.map((ability, index) => (
                    <motion.div
                      key={ability.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <AbilityDisplay
                        ability={ability}
                        size="sm"
                        onClick={() => setSelectedAbility(ability)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">组合预览</h2>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-red-900/30 rounded-lg p-3">
                  <div className="text-red-400 text-sm mb-1">攻击</div>
                  <div className="text-2xl font-bold text-white">{stats.attack}</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-3">
                  <div className="text-blue-400 text-sm mb-1">防御</div>
                  <div className="text-2xl font-bold text-white">{stats.defense}</div>
                </div>
                <div className="bg-green-900/30 rounded-lg p-3">
                  <div className="text-green-400 text-sm mb-1">生命</div>
                  <div className="text-2xl font-bold text-white">{stats.hp}</div>
                </div>
                <div className="bg-yellow-900/30 rounded-lg p-3">
                  <div className="text-yellow-400 text-sm mb-1">速度</div>
                  <div className="text-2xl font-bold text-white">{stats.speed}</div>
                </div>
                <div className="bg-pink-900/30 rounded-lg p-3">
                  <div className="text-pink-400 text-sm mb-1">暴击率</div>
                  <div className="text-2xl font-bold text-white">{stats.critRate}%</div>
                </div>
                <div className="bg-orange-900/30 rounded-lg p-3">
                  <div className="text-orange-400 text-sm mb-1">暴击伤害</div>
                  <div className="text-2xl font-bold text-white">{stats.critDamage}%</div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">预计战斗力</div>
                  <div className="text-3xl font-bold text-yellow-400">⚡ {stats.attack * 2 + stats.defense * 1.5 + stats.hp / 10 + stats.speed * 3 + stats.critRate * 2 + stats.critDamage}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">组合提示</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• 有的强力能力一起使用反而会冲突</p>
                <p>• 有的普通能力组合在一起可能产生奇迹</p>
                <p>• 尝试不同的搭配，发现属于你的神奇组合！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedAbility && (
        <AbilityDetailModal
          ability={selectedAbility}
          onClose={() => setSelectedAbility(null)}
          onActivate={() => {
            activateAbility(selectedAbility.id);
            setSelectedAbility(null);
          }}
          onDeactivate={() => {
            deactivateAbility(selectedAbility.id);
            setSelectedAbility(null);
          }}
          isActive={activeAbilities.some(a => a.ability.id === selectedAbility.id)}
          hasConflict={hasConflict(selectedAbility)}
          canActivate={activeAbilities.length < 6}
        />
      )}
    </div>
  );
}
