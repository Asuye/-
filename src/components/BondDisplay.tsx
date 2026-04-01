import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { ActiveBond } from '@/types/bond';

interface BondDisplayProps {
  bond: ActiveBond;
  compact?: boolean;
}

export function BondDisplay({ bond, compact = false }: BondDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-900/50 border border-purple-500/30">
        <span className="text-lg">{bond.icon}</span>
        <span className="text-sm text-white font-medium">{bond.name}</span>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{bond.icon}</span>
        <h3 className="text-lg font-bold text-white">{bond.name}</h3>
      </div>
      <p className="text-sm text-gray-300 mb-3">{bond.description}</p>
      <div className="flex flex-wrap gap-2">
        {bond.effects.map((effect, index) => (
          <span
            key={index}
            className={clsx(
              'text-xs px-2 py-1 rounded-full',
              effect.isPercentage ? 'bg-green-900/50 text-green-300' : 'bg-blue-900/50 text-blue-300'
            )}
          >
            {effect.stat && `${effect.stat.toUpperCase()} `}
            {effect.isPercentage ? '+' : ''}
            {effect.value}
            {effect.isPercentage ? '%' : ''}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

interface BondListProps {
  bonds: ActiveBond[];
  maxDisplay?: number;
}

export function BondList({ bonds, maxDisplay }: BondListProps) {
  const displayBonds = maxDisplay ? bonds.slice(0, maxDisplay) : bonds;
  const remaining = maxDisplay ? bonds.length - maxDisplay : 0;
  
  if (bonds.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400">
        暂无激活的羁绊
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {displayBonds.map(bond => (
        <BondDisplay key={bond.id} bond={bond} />
      ))}
      {remaining > 0 && (
        <div className="text-center text-sm text-gray-400">
          还有 {remaining} 个羁绊未显示
        </div>
      )}
    </div>
  );
}
