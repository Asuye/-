import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { CardDisplay } from '@/components/CardDisplay';
import { Modal } from '@/components/Modal';
import { getGachaCost, GACHA_RATES } from '@/utils/gacha';
import type { Card } from '@/types/card';
import { Sparkles, Gem, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Gacha() {
  const navigate = useNavigate();
  const { player, doGacha } = useGameStore();
  const [isPulling, setIsPulling] = useState(false);
  const [results, setResults] = useState<Card[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  
  const handlePull = async (count: number) => {
    const cost = getGachaCost(count);
    if (player.gems < cost.gems) {
      alert('钻石不足！');
      return;
    }
    
    setIsPulling(true);
    setResults([]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cards = doGacha(count);
    if (cards) {
      setResults(cards);
      setShowResults(true);
    }
    
    setIsPulling(false);
  };
  
  const getRarityColor = (rarity: Card['rarity']) => {
    switch (rarity) {
      case 'SSR': return 'text-yellow-400';
      case 'SR': return 'text-purple-400';
      case 'R': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };
  
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">召唤祭坛</h1>
          <p className="text-gray-400">消耗钻石召唤强力卡片</p>
        </motion.div>
        
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-4 py-2">
            <Gem className="w-5 h-5 text-purple-400" />
            <span className="text-white font-bold">{player.gems.toLocaleString()}</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-64 h-80 mb-8">
            <motion.div
              animate={isPulling ? { rotateY: 180 } : { rotateY: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl border-4 border-purple-400 shadow-2xl shadow-purple-500/50 flex items-center justify-center"
            >
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                <p className="text-white text-lg font-bold">神秘卡包</p>
              </div>
            </motion.div>
            
            {isPulling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </motion.div>
            )}
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => handlePull(1)}
              disabled={isPulling}
              size="lg"
              className="min-w-32"
            >
              单抽 x1
              <span className="ml-2 text-sm opacity-80">100💎</span>
            </Button>
            <Button
              onClick={() => handlePull(10)}
              disabled={isPulling}
              size="lg"
              variant="success"
              className="min-w-32"
            >
              十连 x10
              <span className="ml-2 text-sm opacity-80">900💎</span>
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
        >
          <h3 className="text-lg font-bold text-white mb-4">召唤概率</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(GACHA_RATES).map(([rarity, rate]) => (
              <div key={rarity} className="text-center">
                <div className={`text-2xl font-bold ${getRarityColor(rarity as Card['rarity'])}`}>
                  {rarity}
                </div>
                <div className="text-gray-400">{rate}%</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>• SR保底：每10抽必出SR或以上卡片</p>
            <p>• SSR保底：每50抽必出SSR卡片</p>
          </div>
        </motion.div>
      </div>
      
      <Modal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        title="召唤结果"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {results.map((card, index) => (
              <motion.div
                key={`${card.id}-${index}`}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardDisplay
                  card={card}
                  size="sm"
                  onClick={() => setSelectedCard(card)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => setShowResults(false)}>确认</Button>
        </div>
      </Modal>
      
      {selectedCard && (
        <CardDisplay
          card={selectedCard}
          onClick={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
