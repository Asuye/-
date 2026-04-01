import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { CardDisplay, CardDetailModal } from '@/components/CardDisplay';
import { Button } from '@/components/Button';
import type { OwnedCard, Rarity, Element, CardType } from '@/types/card';
import { ArrowLeft, Filter, Search } from 'lucide-react';

export function Collection() {
  const navigate = useNavigate();
  const { ownedCards, deck, addToDeck, removeFromDeck } = useGameStore();
  
  const [selectedCard, setSelectedCard] = useState<OwnedCard | null>(null);
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all');
  const [filterElement, setFilterElement] = useState<Element | 'all'>('all');
  const [filterType, setFilterType] = useState<CardType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredCards = ownedCards.filter(card => {
    if (filterRarity !== 'all' && card.rarity !== filterRarity) return false;
    if (filterElement !== 'all' && card.element !== filterElement) return false;
    if (filterType !== 'all' && card.type !== filterType) return false;
    if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  
  const stats = {
    total: ownedCards.length,
    SSR: ownedCards.filter(c => c.rarity === 'SSR').length,
    SR: ownedCards.filter(c => c.rarity === 'SR').length,
    R: ownedCards.filter(c => c.rarity === 'R').length,
    N: ownedCards.filter(c => c.rarity === 'N').length
  };
  
  const isInDeck = (instanceId: string) => deck.includes(instanceId);
  
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
          <h1 className="text-3xl font-bold text-white mb-2">卡片收集</h1>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-400">总计: <span className="text-white">{stats.total}</span></span>
            <span className="text-yellow-400">SSR: {stats.SSR}</span>
            <span className="text-purple-400">SR: {stats.SR}</span>
            <span className="text-blue-400">R: {stats.R}</span>
            <span className="text-gray-400">N: {stats.N}</span>
          </div>
        </motion.div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索卡片..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="secondary"
          >
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </Button>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">稀有度</label>
                    <select
                      value={filterRarity}
                      onChange={e => setFilterRarity(e.target.value as Rarity | 'all')}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="all">全部</option>
                      <option value="SSR">SSR</option>
                      <option value="SR">SR</option>
                      <option value="R">R</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">元素</label>
                    <select
                      value={filterElement}
                      onChange={e => setFilterElement(e.target.value as Element | 'all')}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="all">全部</option>
                      <option value="fire">火</option>
                      <option value="water">水</option>
                      <option value="wind">风</option>
                      <option value="earth">土</option>
                      <option value="light">光</option>
                      <option value="dark">暗</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">类型</label>
                    <select
                      value={filterType}
                      onChange={e => setFilterType(e.target.value as CardType | 'all')}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="all">全部</option>
                      <option value="attack">攻击</option>
                      <option value="defense">防御</option>
                      <option value="support">辅助</option>
                      <option value="special">特殊</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {filteredCards.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            没有找到符合条件的卡片
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.instanceId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <CardDisplay
                  card={card}
                  onClick={() => setSelectedCard(card)}
                  selected={isInDeck(card.instanceId)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onAdd={() => {
            addToDeck(selectedCard.instanceId);
            setSelectedCard(null);
          }}
          onRemove={() => {
            removeFromDeck(selectedCard.instanceId);
            setSelectedCard(null);
          }}
          isInDeck={isInDeck(selectedCard.instanceId)}
        />
      )}
    </div>
  );
}
