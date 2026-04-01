import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { bondDatabase } from '@/data/bonds';
import { useGameStore } from '@/store/gameStore';
import { BondDisplay } from '@/components/BondDisplay';
import { Button } from '@/components/Button';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useState } from 'react';

export function Bonds() {
  const navigate = useNavigate();
  const { activeBonds, getDeckCards } = useGameStore();
  const deckCards = getDeckCards();
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  
  const activeBondIds = new Set(activeBonds.map(b => b.id));
  
  const displayBonds = showActiveOnly 
    ? bondDatabase.filter(b => activeBondIds.has(b.id))
    : bondDatabase;
  
  const checkBondActivation = (bondId: string) => {
    return activeBondIds.has(bondId);
  };
  
  const getActivationProgress = (bondId: string) => {
    const bond = bondDatabase.find(b => b.id === bondId);
    if (!bond) return null;
    
    return bond.requiredTags.map(req => {
      const count = deckCards.filter(c => c.bondTags.includes(req.tag)).length;
      return {
        tag: req.tag,
        current: count,
        required: req.count,
        met: count >= req.count
      };
    });
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
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-white mb-2">羁绊图鉴</h1>
          <p className="text-gray-400">收集特定卡片组合激活强力羁绊效果</p>
        </motion.div>
        
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setShowActiveOnly(false)}
            variant={!showActiveOnly ? 'primary' : 'secondary'}
          >
            全部羁绊 ({bondDatabase.length})
          </Button>
          <Button
            onClick={() => setShowActiveOnly(true)}
            variant={showActiveOnly ? 'primary' : 'secondary'}
          >
            已激活 ({activeBonds.length})
          </Button>
        </div>
        
        <div className="mb-6 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-2">当前卡组羁绊标签统计</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(deckCards.flatMap(c => c.bondTags))).map(tag => {
              const count = deckCards.filter(c => c.bondTags.includes(tag)).length;
              return (
                <span key={tag} className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm">
                  #{tag} x{count}
                </span>
              );
            })}
            {deckCards.length === 0 && (
              <span className="text-gray-400">卡组为空</span>
            )}
          </div>
        </div>
        
        <div className="grid gap-4">
          {displayBonds.map((bond, index) => {
            const isActive = checkBondActivation(bond.id);
            const progress = getActivationProgress(bond.id);
            
            return (
              <motion.div
                key={bond.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border ${
                  isActive 
                    ? 'bg-purple-900/30 border-purple-500' 
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{bond.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{bond.name}</h3>
                      {isActive ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-600 text-white">
                          已激活
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-300">
                          未激活
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{bond.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {progress?.map(p => (
                        <span
                          key={p.tag}
                          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                            p.met 
                              ? 'bg-green-900/50 text-green-300' 
                              : 'bg-red-900/50 text-red-300'
                          }`}
                        >
                          {p.met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          #{p.tag} {p.current}/{p.required}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {bond.effects.map((effect, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded ${
                            effect.isPercentage 
                              ? 'bg-green-900/50 text-green-300' 
                              : 'bg-blue-900/50 text-blue-300'
                          }`}
                        >
                          {effect.stat && `${effect.stat.toUpperCase()} `}
                          {effect.isPercentage ? '+' : ''}
                          {effect.value}
                          {effect.isPercentage ? '%' : ''}
                        </span>
                      ))}
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
