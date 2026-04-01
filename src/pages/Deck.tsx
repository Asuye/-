import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { CardDisplay, CardDetailModal } from '@/components/CardDisplay';
import { BondDisplay } from '@/components/BondDisplay';
import { Button } from '@/components/Button';
import type { OwnedCard } from '@/types/card';
import { ArrowLeft, Swords, Shield, Heart, Zap, Plus, X } from 'lucide-react';

export function Deck() {
  const navigate = useNavigate();
  const { ownedCards, deck, addToDeck, removeFromDeck, activeBonds, getTotalPower, updateActiveBonds } = useGameStore();
  
  const [selectedCard, setSelectedCard] = useState<OwnedCard | null>(null);
  
  const deckCards = ownedCards.filter(c => deck.includes(c.instanceId));
  const availableCards = ownedCards.filter(c => !deck.includes(c.instanceId));
  const totalPower = getTotalPower();
  
  const totalStats = deckCards.reduce((acc, card) => ({
    attack: acc.attack + card.baseStats.attack,
    defense: acc.defense + card.baseStats.defense,
    hp: acc.hp + card.baseStats.hp,
    speed: acc.speed + card.baseStats.speed
  }), { attack: 0, defense: 0, hp: 0, speed: 0 });
  
  const isInDeck = (instanceId: string) => deck.includes(instanceId);
  
  const handleAddToDeck = (instanceId: string) => {
    if (deck.length < 5) {
      addToDeck(instanceId);
      updateActiveBonds();
    }
  };
  
  const handleRemoveFromDeck = (instanceId: string) => {
    removeFromDeck(instanceId);
    updateActiveBonds();
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
          <h1 className="text-3xl font-bold text-white mb-2">卡组编辑</h1>
          <p className="text-gray-400">配置你的战斗卡组，激活羁绊效果</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  当前卡组 ({deck.length}/5)
                </h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">⚔️ {totalPower}</div>
                  <div className="text-xs text-gray-400">战斗力</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-red-900/30 rounded-lg p-3 text-center">
                  <Swords className="w-5 h-5 text-red-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{totalStats.attack}</div>
                  <div className="text-xs text-gray-400">攻击</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-3 text-center">
                  <Shield className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{totalStats.defense}</div>
                  <div className="text-xs text-gray-400">防御</div>
                </div>
                <div className="bg-green-900/30 rounded-lg p-3 text-center">
                  <Heart className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{totalStats.hp}</div>
                  <div className="text-xs text-gray-400">生命</div>
                </div>
                <div className="bg-yellow-900/30 rounded-lg p-3 text-center">
                  <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{totalStats.speed}</div>
                  <div className="text-xs text-gray-400">速度</div>
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 min-h-40">
                {deckCards.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg text-gray-400">
                    点击下方卡片添加到卡组
                  </div>
                ) : (
                  deckCards.map(card => (
                    <div key={card.instanceId} className="relative flex-shrink-0">
                      <CardDisplay
                        card={card}
                        size="md"
                        onClick={() => setSelectedCard(card)}
                      />
                      <button
                        onClick={() => handleRemoveFromDeck(card.instanceId)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
                {deck.length < 5 && (
                  <div className="w-40 h-56 flex-shrink-0 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-500" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">可用卡片</h2>
              {availableCards.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  所有卡片都已添加到卡组
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {availableCards.map(card => (
                    <motion.div
                      key={card.instanceId}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleAddToDeck(card.instanceId)}
                      className="cursor-pointer"
                    >
                      <CardDisplay card={card} size="sm" showDetails={false} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">
                激活羁绊 ({activeBonds.length})
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeBonds.length === 0 ? (
                  <div className="text-center py-4 text-gray-400">
                    暂无激活的羁绊
                  </div>
                ) : (
                  activeBonds.map(bond => (
                    <BondDisplay key={bond.id} bond={bond} compact />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onRemove={() => {
            handleRemoveFromDeck(selectedCard.instanceId);
            setSelectedCard(null);
          }}
          isInDeck={isInDeck(selectedCard.instanceId)}
        />
      )}
    </div>
  );
}
