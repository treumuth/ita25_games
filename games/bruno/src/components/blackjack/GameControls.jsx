import React from 'react';
import { motion } from 'framer-motion';

export default function GameControls({ onHit, onStand, onDouble, canDouble }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <button
        onClick={onHit}
        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm
          shadow-lg shadow-emerald-900/30 transition-colors"
      >
        Võta
      </button>
      <button
        onClick={onStand}
        className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm
          shadow-lg shadow-amber-900/30 transition-colors"
      >
        Jää
      </button>
      {canDouble && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onDouble}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm
            shadow-lg shadow-purple-900/30 transition-colors"
        >
          Kahekordista
        </motion.button>
      )}
    </motion.div>
  );
}