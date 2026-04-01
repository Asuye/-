import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { ExpBar } from '@/components/StatusBar';
import { BondDisplay } from '@/components/BondDisplay';
import { CardDisplay } from '@/components/CardDisplay';
import { Sword, Gift, BookOpen, Users, Coins, Gem, Zap } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const { player, getDeckCards, activeBonds, getTotalPower, gacha } = useGameStore();
  const deckCards = getDeckCards();
  const totalPower = getTotalPower();
  
  const menuItems = [
    { icon: <Sword className="w-8 h-8" />, label: '冒险关卡', path: '/adventure', color: 'from-red-600 to-orange-600' },
    { icon: <Gift className="w-8 h-8" />, label: '抽卡召唤', path: '/gacha', color: 'from-purple-600 to-pink-600' },
    { icon: <BookOpen className="w-8 h-8" />, label: '卡片收集', path: '/collection', color: 'from-blue-600 to-cyan-600' },
    { icon: <Users className="w-8 h-8" />, label: '羁绊图鉴', path: '/bonds', color: 'from-green-600 to-teal-600' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">羁绊冒险</h1>
              <p className="text-gray-400">收集卡片，激活羁绊，征服冒险</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">⚔️ {totalPower}</div>
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
                  <div className="text-xs text-gray-400">体力</div>
                  <div className="text-lg font-bold text-white">{player.energy}/{player.maxEnergy}</div>
                </div>
              </div>
              <div>
                <ExpBar current={player.exp} max={player.expToNext} level={player.level} />
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
              <h2 className="text-xl font-bold text-white">当前卡组</h2>
              <Button size="sm" onClick={() => navigate('/deck')}>编辑</Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {deckCards.length === 0 ? (
                <div className="w-full text-center py-8 text-gray-400">
                  卡组为空，请添加卡片
                </div>
              ) : (
                deckCards.map(card => (
                  <CardDisplay key={card.instanceId} card={card} size="sm" showDetails={false} />
                ))
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700"
          >
            <h2 className="text-xl font-bold text-white mb-4">激活羁绊 ({activeBonds.length})</h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {activeBonds.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  暂无激活的羁绊
                </div>
              ) : (
                activeBonds.slice(0, 3).map(bond => (
                  <BondDisplay key={bond.id} bond={bond} compact />
                ))
              )}
            </div>
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
              <div className="text-sm text-gray-400 mb-1">SR保底</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${(gacha.pitySR / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-purple-400">{gacha.pitySR}/10</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">SSR保底</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${(gacha.pitySSR / 50) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-yellow-400">{gacha.pitySSR}/50</span>
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
