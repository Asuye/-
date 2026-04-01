import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Card, Rarity, Element } from '@/types/card';
import { Flame, Droplet, Wind, Mountain, Sun, Moon } from 'lucide-react';

const rarityColors: Record<Rarity, { bg: string; border: string; glow: string }> = {
  N: { bg: 'from-gray-600 to-gray-700', border: 'border-gray-500', glow: '' },
  R: { bg: 'from-blue-600 to-blue-700', border: 'border-blue-400', glow: 'shadow-blue-500/30' },
  SR: { bg: 'from-purple-600 to-purple-700', border: 'border-purple-400', glow: 'shadow-purple-500/30' },
  SSR: { bg: 'from-amber-500 to-yellow-600', border: 'border-yellow-400', glow: 'shadow-yellow-500/50' }
};

const elementIcons: Record<Element, React.ReactNode> = {
  fire: <Flame className="w-4 h-4" />,
  water: <Droplet className="w-4 h-4" />,
  wind: <Wind className="w-4 h-4" />,
  earth: <Mountain className="w-4 h-4" />,
  light: <Sun className="w-4 h-4" />,
  dark: <Moon className="w-4 h-4" />
};

const elementColors: Record<Element, string> = {
  fire: 'text-orange-400',
  water: 'text-blue-400',
  wind: 'text-cyan-400',
  earth: 'text-amber-600',
  light: 'text-yellow-300',
  dark: 'text-purple-400'
};

interface CardDisplayProps {
  card: Card;
  onClick?: () => void;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function CardDisplay({ card, onClick, selected, size = 'md', showDetails = true }: CardDisplayProps) {
  const colors = rarityColors[card.rarity];
  
  const sizeClasses = {
    sm: 'w-32 h-44',
    md: 'w-40 h-56',
    lg: 'w-48 h-68'
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        'relative rounded-xl cursor-pointer overflow-hidden',
        'bg-gradient-to-br',
        colors.bg,
        'border-2',
        colors.border,
        selected && 'ring-2 ring-white ring-offset-2 ring-offset-gray-900',
        card.rarity === 'SSR' && 'shadow-lg ' + colors.glow,
        sizeClasses[size]
      )}
    >
      {card.rarity === 'SSR' && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
      )}
      
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <span className={clsx('text-xs font-bold px-2 py-0.5 rounded bg-black/30', elementColors[card.element])}>
          {elementIcons[card.element]}
        </span>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-black/30 text-white">
          {card.rarity}
        </span>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl opacity-30">
          {elementIcons[card.element]}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-bold text-sm truncate">{card.name}</h3>
        <p className="text-gray-300 text-xs capitalize">{card.type}</p>
        
        {showDetails && (
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            <div className="text-red-400">ATK: {card.baseStats.attack}</div>
            <div className="text-blue-400">DEF: {card.baseStats.defense}</div>
            <div className="text-green-400">HP: {card.baseStats.hp}</div>
            <div className="text-yellow-400">SPD: {card.baseStats.speed}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface CardDetailModalProps {
  card: Card;
  onClose: () => void;
  onAdd?: () => void;
  onRemove?: () => void;
  isInDeck?: boolean;
}

export function CardDetailModal({ card, onClose, onAdd, onRemove, isInDeck }: CardDetailModalProps) {
  const colors = rarityColors[card.rarity];
  
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
          <div className={clsx('text-4xl', elementColors[card.element])}>
            {elementIcons[card.element]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{card.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={clsx('text-sm px-2 py-0.5 rounded bg-black/30', elementColors[card.element])}>
                {card.element.toUpperCase()}
              </span>
              <span className="text-sm px-2 py-0.5 rounded bg-black/30 text-white">
                {card.rarity}
              </span>
              <span className="text-sm px-2 py-0.5 rounded bg-black/30 text-gray-300 capitalize">
                {card.type}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-200 text-sm mb-4">{card.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-red-400 text-xs mb-1">攻击力</div>
            <div className="text-white text-xl font-bold">{card.baseStats.attack}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-blue-400 text-xs mb-1">防御力</div>
            <div className="text-white text-xl font-bold">{card.baseStats.defense}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-green-400 text-xs mb-1">生命值</div>
            <div className="text-white text-xl font-bold">{card.baseStats.hp}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-yellow-400 text-xs mb-1">速度</div>
            <div className="text-white text-xl font-bold">{card.baseStats.speed}</div>
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <div className="text-purple-400 text-sm mb-1">技能: {card.skill.name}</div>
          <div className="text-gray-200 text-sm">{card.skill.description}</div>
          <div className="text-gray-400 text-xs mt-1">冷却: {card.skill.cooldown} 回合</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {card.bondTags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {onAdd && !isInDeck && (
            <button
              onClick={onAdd}
              className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
            >
              加入卡组
            </button>
          )}
          {onRemove && isInDeck && (
            <button
              onClick={onRemove}
              className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
            >
              移出卡组
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
