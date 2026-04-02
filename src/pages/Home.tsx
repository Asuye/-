import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { AbilityDisplay } from '@/components/AbilityDisplay';
import { Sword, Gift, BookOpen, Sparkles, Coins, Gem, Zap, Shield, Heart, AlertTriangle } from 'lucide-react';
import { getEffectIcon, getEffectName } from '@/utils/abilityEngine';

export function Home() {
  const navigate = useNavigate();
  const { 
    player, 
    stats, 
    activeAbilities, 
    conflicts, 
    synergies, 
    power,
    gacha
  } = useGameStore();
  
  const menuItems = [
    { icon: <Sword className="w-8 h-8" />, label: '冒险关卡', path: '/adventure', color: 'from-red-600 to-orange-600' },
    { icon: <Gift className="w-8 h-8" />, label: '抽取能力', path: '/gacha', color: 'from-purple-600 to-pink-600' },
    { icon: <BookOpen className="w-8 h-8" />, label: '能力库', path: '/collection', color: 'from-blue-600 to-cyan-600' },
    { icon: <Sparkles className="w-8 h-8" />, label: '能力组合', path: '/deck', color: 'from-green-600 to-teal-600' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">能力冒险</h1>
              <p className="text-gray-400">搭配能力，发现神奇的组合</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">⚡ {power}</div>
              <div className="text-sm text-gray-400">战斗力</div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-xs text-gray-400">金币</div>
                  <div className="text-lg font-bold text-white">{player.gold.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-xs text-gray-400">钻石</div>
                  <div className="text-lg font-bold text-white">{player.gems.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-xs text-gray-400">等级</div>
                  <div className="text-lg font-bold text-white">Lv.{player.level}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">经验 {player.exp}/{player.expToNext}</div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${(player.exp / player.expToNext) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Button
                onClick={() => navigate(item.path)}
                className={`w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${item.color}`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">激活能力 ({activeAbilities.length}/6)</h2>
              <Button size="sm" onClick={() => navigate('/deck')}>编辑</Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3, 4, 5].map((slot) => {
                const active = activeAbilities[slot];
                const hasConflict = active && conflicts.some(c => c.includes(active.ability.name));
                
                return (
                  <div key={slot} className="relative">
                    {active ? (
                      <AbilityDisplay 
                        ability={active.ability} 
                        size="sm" 
                        isActive={true}
                        hasConflict={hasConflict}
                      />
                    ) : (
                      <div className="w-32 h-40 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center text-gray-500">
                        空槽位
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">冒险家属性</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-900/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-red-400 mb-1">
                    <Sword className="w-4 h-4" />
                    <span className="text-sm">攻击</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.attack}</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">防御</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.defense}</div>
                </div>
                <div className="bg-green-900/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">生命</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.hp}</div>
                </div>
                <div className="bg-yellow-900/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-yellow-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">速度</span>
                  </div>
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
            
            {stats.specialEffects.length > 0 && (
              <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 text-purple-400 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold">特殊效果</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {stats.specialEffects.map((effect, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getEffectIcon(effect.type)}</span>
                        <div>
                          <div className="text-purple-300 font-medium text-sm">{getEffectName(effect.type)}</div>
                          <div className="text-xs text-purple-200">
                            {effect.chance && `${effect.chance}%几率 - `}
                            {effect.description}
                          </div>
                        </div>
                      </div>
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
                    <div key={index} className="bg-black/20 rounded-lg p-2">
                      <div className="text-green-300 font-medium">{synergy.name}</div>
                      <div className="text-sm text-green-200">{synergy.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-3">抽卡保底进度</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">史诗保底</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${(gacha.pityEpic / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-purple-400">{gacha.pityEpic}/10</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">传说保底</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${(gacha.pityLegendary / 30) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-yellow-400">{gacha.pityLegendary}/30</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            累计抽卡: {gacha.totalPulls} 次
          </div>
        </motion.div>
      </div>
    </div>
  );
}
