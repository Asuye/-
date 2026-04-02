import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Ability, AbilityRarity, AbilityCategory } from '@/types/ability';
import { Sword, Shield, Sparkles, Flame, Zap, AlertTriangle } from 'lucide-react';

const rarityColors: Record<AbilityRarity, { bg: string; border: string; glow: string; text: string }> = {
  common: { bg: 'from-gray-600 to-gray-700', border: 'border-gray-500', glow: '', text: 'text-gray-300' },
  rare: { bg: 'from-blue-600 to-blue-700', border: 'border-blue-400', glow: 'shadow-blue-500/30', text: 'text-blue-300' },
  epic: { bg: 'from-purple-600 to-purple-700', border: 'border-purple-400', glow: 'shadow-purple-500/30', text: 'text-purple-300' },
  legendary: { bg: 'from-amber-500 to-yellow-600', border: 'border-yellow-400', glow: 'shadow-yellow-500/50', text: 'text-yellow-300' }
};

const categoryIcons: Record<AbilityCategory, React.ReactNode> = {
  attack: <Sword className="w-4 h-4" />,
  defense: <Shield className="w-4 h-4" />,
  utility: <Zap className="w-4 h-4" />,
  special: <Flame className="w-4 h-4" />
};

const categoryColors: Record<AbilityCategory, string> = {
  attack: 'text-red-400',
  defense: 'text-blue-400',
  utility: 'text-yellow-400',
  special: 'text-purple-400'
};

const rarityNames: Record<AbilityRarity, string> = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说'
};

interface AbilityDisplayProps {
  ability: Ability;
  onClick?: () => void;
  selected?: boolean;
  isActive?: boolean;
  hasConflict?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AbilityDisplay({ 
  ability, 
  onClick, 
  selected, 
  isActive,
  hasConflict,
  size = 'md'
}: AbilityDisplayProps) {
  const colors = rarityColors[ability.rarity];
  
  const sizeClasses = {
    sm: 'w-32 h-40',
    md: 'w-40 h-52',
    lg: 'w-48 h-64'
  };
  
  const isRisky = ability.tags.includes('risky') || ability.tags.includes('extreme');
  
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        'relative rounded-xl cursor-pointer overflow-hidden transition-all',
        'bg-gradient-to-br',
        colors.bg,
        'border-2',
        selected ? 'border-white ring-2 ring-yellow-400' : colors.border,
        hasConflict && 'border-red-500 ring-2 ring-red-500/50',
        isActive && 'shadow-lg ' + colors.glow,
        ability.rarity === 'legendary' && 'shadow-xl ' + colors.glow,
        sizeClasses[size]
      )}
    >
      {ability.rarity === 'legendary' && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none animate-pulse" />
      )}
      
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
        <span className={clsx('text-xs font-bold px-2 py-0.5 rounded bg-black/30', colors.text)}>
          {rarityNames[ability.rarity]}
        </span>
        <span className={clsx('text-xs font-bold px-2 py-0.5 rounded bg-black/30', categoryColors[ability.category])}>
          {categoryIcons[ability.category]}
        </span>
      </div>
      
      <div className="absolute top-10 left-0 right-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className={clsx(
            'font-bold text-white px-2',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
          )}>
            {ability.name}
          </h3>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <p className={clsx(
          'text-gray-200 leading-tight',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          {ability.description}
        </p>
        
        {isRisky && (
          <div className="flex items-center gap-1 mt-2 text-xs text-orange-400">
            <AlertTriangle className="w-3 h-3" />
            <span>有风险</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface AbilityDetailModalProps {
  ability: Ability;
  onClose: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
  isActive?: boolean;
  hasConflict?: boolean;
  canActivate?: boolean;
}

export function AbilityDetailModal({ 
  ability, 
  onClose, 
  onActivate, 
  onDeactivate,
  isActive,
  hasConflict,
  canActivate
}: AbilityDetailModalProps) {
  const colors = rarityColors[ability.rarity];
  const isRisky = ability.tags.includes('risky') || ability.tags.includes('extreme');
  
  const effectText = (effect: any) => {
    const statNames: Record<string, string> = {
      attack: '攻击力',
      defense: '防御力',
      hp: '生命值',
      speed: '速度',
      crit_rate: '暴击率',
      crit_damage: '暴击伤害'
    };
    
    if (effect.stat) {
      const name = statNames[effect.stat] || effect.stat;
      const sign = effect.value >= 0 ? '+' : '';
      const percent = effect.isPercentage ? '%' : '';
      return `${name} ${sign}${effect.value}${percent}`;
    }
    return '';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className={clsx(
          'relative rounded-2xl p-6 max-w-md w-full',
          'bg-gradient-to-br',
          colors.bg,
          'border-2',
          colors.border
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          ✕
        </button>
        
        <div className="flex items-start gap-4 mb-4">
          <div className={clsx('text-4xl', colors.text)}>
            {categoryIcons[ability.category]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{ability.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={clsx('text-sm px-2 py-0.5 rounded bg-black/30', colors.text)}>
                {rarityNames[ability.rarity]}
              </span>
              <span className={clsx('text-sm px-2 py-0.5 rounded bg-black/30', categoryColors[ability.category])}>
                {ability.category === 'attack' ? '攻击' : 
                 ability.category === 'defense' ? '防御' : 
                 ability.category === 'utility' ? '辅助' : '特殊'}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-200 text-sm mb-4">{ability.description}</p>
        
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-white mb-2">效果详情：</h4>
          <div className="space-y-1">
            {ability.effects.map((effect, index) => (
              <div 
                key={index} 
                className={clsx(
                  'text-sm',
                  effect.value >= 0 ? 'text-green-300' : 'text-red-300'
                )}
              >
                {effectText(effect)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {ability.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
        
        {isRisky && (
          <div className="bg-orange-900/50 border border-orange-500/50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-orange-300">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold">注意：此能力带有负面效果</span>
            </div>
            <p className="text-sm text-orange-200 mt-1">
              请谨慎组合，搭配防御能力使用可降低风险。
            </p>
          </div>
        )}
        
        {hasConflict && (
          <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-red-300">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold">能力冲突</span>
            </div>
            <p className="text-sm text-red-200 mt-1">
              此能力与当前激活的某些能力冲突，无法同时生效。
            </p>
          </div>
        )}
        
        {ability.synergizesWith.length > 0 && (
          <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-green-300 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">推荐搭配</span>
            </div>
            <p className="text-sm text-green-200">
              此能力与某些能力有良好的协同效果，一起使用可获得额外加成！
            </p>
          </div>
        )}
        
        <div className="flex gap-3">
          {onDeactivate && isActive && (
            <button
              onClick={onDeactivate}
              className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
            >
              取消激活
            </button>
          )}
          {onActivate && !isActive && (
            <button
              onClick={onActivate}
              disabled={!canActivate}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                canActivate 
                  ? 'bg-green-600 hover:bg-green-500 text-white' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              激活能力
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
