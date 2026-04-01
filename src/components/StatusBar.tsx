import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'red' | 'blue' | 'purple';
}

export function HealthBar({ 
  current, 
  max, 
  label, 
  showValue = true,
  size = 'md',
  color = 'green'
}: HealthBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const colors = {
    green: 'from-green-500 to-green-400',
    red: 'from-red-500 to-red-400',
    blue: 'from-blue-500 to-blue-400',
    purple: 'from-purple-500 to-purple-400'
  };
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-gray-300">{label}</span>}
          {showValue && (
            <span className="text-sm text-gray-300">
              {current} / {max}
            </span>
          )}
        </div>
      )}
      <div className={clsx('w-full bg-gray-700 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={clsx(
            'h-full bg-gradient-to-r rounded-full',
            colors[color]
          )}
        />
      </div>
    </div>
  );
}

interface ExpBarProps {
  current: number;
  max: number;
  level: number;
}

export function ExpBar({ current, max, level }: ExpBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300">Lv.{level}</span>
        <span className="text-xs text-gray-400">
          {current} / {max}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
        />
      </div>
    </div>
  );
}
