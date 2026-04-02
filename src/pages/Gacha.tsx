import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { AbilityDisplay, AbilityDetailModal } from '@/components/AbilityDisplay';
import { Modal } from '@/components/Modal';
import type { Ability } from '@/types/ability';
import { Sparkles, Gem, ArrowLeft } from 'lucide-react';

export function Gacha() {
  const navigate = useNavigate();
  const { player, doGacha } = useGameStore();
  const [isPulling, setIsPulling] = useState(false);
  const [results, setResults] = useState<Ability[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  
  const handlePull = async (count: number) => {
    const cost = count === 1 ? 50 : count === 10 ? 450 : count * 50;
    if (player.gems < cost) {
      alert('钻石不足！');
      return;
    }
    
    setIsPulling(true);
    setResults([]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const abilities = doGacha(count);
    if (abilities) {
      setResults(abilities);
      setShowResults(true);
    }
    
    setIsPulling(false);
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">能力祭坛</h1>
          <p className="text-gray-400">消耗钻石抽取随机能力</p>
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
                <p className="text-white text-lg font-bold">神秘能力</p>
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
              <span className="ml-2 text-sm opacity-80">50💎</span>
            </Button>
            <Button
              onClick={() => handlePull(10)}
              disabled={isPulling}
              size="lg"
              variant="success"
              className="min-w-32"
            >
              十连 x10
              <span className="ml-2 text-sm opacity-80">450💎</span>
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
        >
          <h3 className="text-lg font-bold text-white mb-4">抽取概率</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-300">普通</div>
              <div className="text-gray-400">60%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">稀有</div>
              <div className="text-gray-400">25%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">史诗</div>
              <div className="text-gray-400">12%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">传说</div>
              <div className="text-gray-400">3%</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>• 史诗保底：每10抽必出史诗或传说能力</p>
            <p>• 传说保底：每30抽必出传说能力</p>
          </div>
        </motion.div>
      </div>
      
      <Modal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        title="抽取结果"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {results.map((ability, index) => (
              <motion.div
                key={`${ability.id}-${index}`}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AbilityDisplay
                  ability={ability}
                  size="sm"
                  onClick={() => setSelectedAbility(ability)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => setShowResults(false)}>确认</Button>
        </div>
      </Modal>
      
      {selectedAbility && (
        <AbilityDetailModal
          ability={selectedAbility}
          onClose={() => setSelectedAbility(null)}
        />
      )}
    </div>
  );
}
