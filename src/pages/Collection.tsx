import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { AbilityDisplay, AbilityDetailModal } from '@/components/AbilityDisplay';
import { Button } from '@/components/Button';
import type { Ability, AbilityRarity, AbilityCategory } from '@/types/ability';
import { ArrowLeft, Filter, Search } from 'lucide-react';

export function Collection() {
  const navigate = useNavigate();
  const { ownedAbilities, activeAbilities, activateAbility, deactivateAbility, conflicts } = useGameStore();
  
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const [filterRarity, setFilterRarity] = useState<AbilityRarity | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<AbilityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const isActive = (abilityId: string) => activeAbilities.some(a => a.ability.id === abilityId);
  const hasConflict = (ability: Ability) => conflicts.some(c => c.includes(ability.name));
  
  const filteredAbilities = ownedAbilities.filter(ability => {
    if (filterRarity !== 'all' && ability.rarity !== filterRarity) return false;
    if (filterCategory !== 'all' && ability.category !== filterCategory) return false;
    if (searchQuery && !ability.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  
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
          <h1 className="text-3xl font-bold text-white mb-2">能力库</h1>
          <p className="text-gray-400">已获得 {ownedAbilities.length} 个能力</p>
        </motion.div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索能力..."
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
        
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">稀有度</label>
                  <select
                    value={filterRarity}
                    onChange={e => setFilterRarity(e.target.value as AbilityRarity | 'all')}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="all">全部</option>
                    <option value="common">普通</option>
                    <option value="rare">稀有</option>
                    <option value="epic">史诗</option>
                    <option value="legendary">传说</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">类型</label>
                  <select
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value as AbilityCategory | 'all')}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="all">全部</option>
                    <option value="attack">攻击</option>
                    <option value="defense">防御</option>
                    <option value="utility">辅助</option>
                    <option value="special">特殊</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {filteredAbilities.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            {ownedAbilities.length === 0 ? '还没有获得任何能力，去抽卡吧！' : '没有找到符合条件的能力'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAbilities.map((ability, index) => (
              <motion.div
                key={ability.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <AbilityDisplay
                  ability={ability}
                  onClick={() => setSelectedAbility(ability)}
                  selected={isActive(ability.id)}
                  isActive={isActive(ability.id)}
                  hasConflict={hasConflict(ability)}
                />
              </motion.div>
            ))}
          </div>
        )}
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
          isActive={isActive(selectedAbility.id)}
          hasConflict={hasConflict(selectedAbility)}
          canActivate={activeAbilities.length < 6}
        />
      )}
    </div>
  );
}
