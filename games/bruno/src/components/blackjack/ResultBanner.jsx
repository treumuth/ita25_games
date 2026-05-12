import React from 'react';
import { motion } from 'framer-motion';

const resultConfig = {
  player_blackjack: { text: 'BLACKJACK!', color: 'from-yellow-500 to-amber-600', emoji: '🃏' },
  player_wins: { text: 'VÕITSID!', color: 'from-emerald-500 to-green-600', emoji: '🎉' },
  dealer_wins: { text: 'DIILER VÕITIS', color: 'from-red-500 to-red-700', emoji: '😞' },
  push: { text: 'VIIK', color: 'from-blue-500 to-blue-700', emoji: '🤝' },
  player_busted: { text: 'LÄKSID ÜLE!', color: 'from-red-500 to-red-700', emoji: '💥' },
  dealer_busted: { text: 'DIILER LÄKS ÜLE!', color: 'from-emerald-500 to-green-600', emoji: '💥' },
};

export default function ResultBanner({ result, winAmount, onNewGame }) {
  const config = resultConfig[result] || resultConfig.push;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="flex flex-col items-center gap-3"
    >
      <div className={`bg-gradient-to-r ${config.color} px-8 py-3 rounded-2xl shadow-2xl`}>
        <span className="text-2xl md:text-3xl font-black text-white tracking-wide">
          {config.emoji} {config.text}
        </span>
      </div>
      {winAmount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-primary font-bold text-lg"
        >
          +€{winAmount}
        </motion.div>
      )}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onNewGame}
        className="mt-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold
          hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
      >
        Uus mäng
      </motion.button>
    </motion.div>
  );
}