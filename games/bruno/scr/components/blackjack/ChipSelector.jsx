import React from 'react';
import { motion } from 'framer-motion';

const CHIPS = [5, 10, 25, 50, 100];

const chipColors = {
  5: 'from-red-500 to-red-700 border-red-400',
  10: 'from-blue-500 to-blue-700 border-blue-400',
  25: 'from-green-500 to-green-700 border-green-400',
  50: 'from-purple-500 to-purple-700 border-purple-400',
  100: 'from-yellow-500 to-yellow-700 border-yellow-400',
};

export default function ChipSelector({ balance, currentBet, onBet, onClear, onDeal }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Panus:</span>
        <motion.span
          key={currentBet}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold text-primary"
        >
          €{currentBet}
        </motion.span>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
        {CHIPS.map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBet(value)}
            disabled={balance < value}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-b ${chipColors[value]} border-2 
              flex items-center justify-center font-bold text-white text-sm md:text-base
              shadow-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer
              ring-2 ring-white/20 ring-inset`}
          >
            {value}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClear}
          disabled={currentBet === 0}
          className="px-5 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium
            disabled:opacity-30 hover:bg-secondary/80 transition-colors"
        >
          Tühjenda
        </button>
        <button
          onClick={onDeal}
          disabled={currentBet === 0}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold
            disabled:opacity-30 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
        >
          Jaga kaardid
        </button>
      </div>
    </div>
  );
}