import React from 'react';
import Card from './Card';
import { calculateHandValue } from '@/lib/blackjackEngine';
import { motion } from 'framer-motion';

export default function Hand({ cards, hideFirst = false, label, showValue = true }) {
  const visibleCards = hideFirst ? cards.slice(1) : cards;
  const value = hideFirst ? calculateHandValue(visibleCards) : calculateHandValue(cards);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs md:text-sm font-semibold text-primary/80 uppercase tracking-widest">
          {label}
        </span>
        {showValue && cards.length > 0 && (
          <motion.span
            key={value}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-xs md:text-sm font-bold bg-black/30 text-foreground px-2.5 py-0.5 rounded-full"
          >
            {hideFirst ? '?' : value}
          </motion.span>
        )}
      </div>
      <div className="flex items-center justify-center min-h-[110px] md:min-h-[136px]">
        {cards.map((card, i) => (
          <Card
            key={`${card.suit}-${card.rank}-${i}`}
            card={card}
            hidden={hideFirst && i === 0}
            index={i}
            delay={i}
          />
        ))}
      </div>
    </div>
  );
}