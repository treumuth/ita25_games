import React from 'react';
import { motion } from 'framer-motion';
import { isRedSuit } from '@/lib/blackjackEngine';

export default function Card({ card, hidden = false, index = 0, delay = 0 }) {
  const red = card && isRedSuit(card.suit);

  return (
    <motion.div
      initial={{ opacity: 0, y: -80, rotateY: 180, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: delay * 0.15, type: 'spring', stiffness: 120 }}
      className="relative w-[72px] h-[104px] md:w-[88px] md:h-[128px] rounded-xl shadow-xl select-none shrink-0"
      style={{ marginLeft: index > 0 ? '-24px' : '0' }}
    >
      {hidden ? (
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-800 to-blue-950 border-2 border-blue-600/50 flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-lg border border-blue-500/30 bg-blue-900/50 flex items-center justify-center">
            <span className="text-blue-400/60 text-2xl md:text-3xl font-bold">♠</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full rounded-xl bg-white border border-gray-200 flex flex-col justify-between p-1.5 md:p-2">
          <div className={`text-left leading-none ${red ? 'text-red-600' : 'text-gray-900'}`}>
            <div className="text-sm md:text-base font-bold">{card.rank}</div>
            <div className="text-xs md:text-sm -mt-0.5">{card.suit}</div>
          </div>
          <div className={`text-center text-2xl md:text-3xl ${red ? 'text-red-600' : 'text-gray-900'}`}>
            {card.suit}
          </div>
          <div className={`text-right leading-none rotate-180 ${red ? 'text-red-600' : 'text-gray-900'}`}>
            <div className="text-sm md:text-base font-bold">{card.rank}</div>
            <div className="text-xs md:text-sm -mt-0.5">{card.suit}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}