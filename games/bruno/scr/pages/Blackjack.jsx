import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hand from '@/components/blackjack/Hand';
import ChipSelector from '@/components/blackjack/ChipSelector';
import GameControls from '@/components/blackjack/GameControls';
import ResultBanner from '@/components/blackjack/ResultBanner';
import {
  createDeck, shuffleDeck, calculateHandValue,
  isBlackjack, isBusted, GAME_STATES
} from '@/lib/blackjackEngine';

const INITIAL_BALANCE = 1000;

export default function Blackjack() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [currentBet, setCurrentBet] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATES.BETTING);
  const [result, setResult] = useState(null);
  const [winAmount, setWinAmount] = useState(0);
  const deckRef = useRef([]);

  const getCard = useCallback(() => {
    if (deckRef.current.length < 10) {
      deckRef.current = shuffleDeck(createDeck());
    }
    return deckRef.current.pop();
  }, []);

  const handleBet = (amount) => {
    if (balance >= amount) {
      setCurrentBet((prev) => prev + amount);
      setBalance((prev) => prev - amount);
    }
  };

  const handleClearBet = () => {
    setBalance((prev) => prev + currentBet);
    setCurrentBet(0);
  };

  const handleDeal = () => {
    if (currentBet === 0) return;
    deckRef.current = shuffleDeck(createDeck());
    const pHand = [getCard(), getCard()];
    const dHand = [getCard(), getCard()];
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setResult(null);
    setWinAmount(0);

    if (isBlackjack(pHand)) {
      const win = isBlackjack(dHand) ? currentBet : Math.floor(currentBet * 2.5);
      const res = isBlackjack(dHand) ? 'push' : 'player_blackjack';
      setBalance((prev) => prev + win);
      setWinAmount(res === 'push' ? 0 : win - currentBet);
      setResult(res);
      setGameState(GAME_STATES.FINISHED);
    } else {
      setGameState(GAME_STATES.PLAYING);
    }
  };

  const runDealerTurn = useCallback((currentDealerHand, pHand) => {
    let dHand = [...currentDealerHand];

    const dealNext = () => {
      if (calculateHandValue(dHand) < 17) {
        dHand = [...dHand, deckRef.current.pop()];
        setDealerHand([...dHand]);
        setTimeout(dealNext, 600);
      } else {
        // Determine winner
        const dVal = calculateHandValue(dHand);
        const pVal = calculateHandValue(pHand);
        let res, win = 0;

        if (isBusted(dHand)) {
          res = 'dealer_busted';
          win = currentBet * 2;
        } else if (dVal > pVal) {
          res = 'dealer_wins';
          win = 0;
        } else if (pVal > dVal) {
          res = 'player_wins';
          win = currentBet * 2;
        } else {
          res = 'push';
          win = currentBet;
        }

        setBalance((prev) => prev + win);
        setWinAmount(win > currentBet ? win - currentBet : 0);
        setResult(res);
        setGameState(GAME_STATES.FINISHED);
      }
    };

    setGameState(GAME_STATES.DEALER_TURN);
    setTimeout(dealNext, 600);
  }, [currentBet]);

  const handleHit = () => {
    const newHand = [...playerHand, getCard()];
    setPlayerHand(newHand);
    if (isBusted(newHand)) {
      setResult('player_busted');
      setGameState(GAME_STATES.FINISHED);
    }
  };

  const handleStand = () => {
    runDealerTurn(dealerHand, playerHand);
  };

  const handleDouble = () => {
    if (balance >= currentBet) {
      setBalance((prev) => prev - currentBet);
      setCurrentBet((prev) => prev * 2);
      const newHand = [...playerHand, getCard()];
      setPlayerHand(newHand);
      if (isBusted(newHand)) {
        setResult('player_busted');
        setGameState(GAME_STATES.FINISHED);
      } else {
        runDealerTurn(dealerHand, newHand);
      }
    }
  };

  const handleNewGame = () => {
    setCurrentBet(0);
    setPlayerHand([]);
    setDealerHand([]);
    setResult(null);
    setWinAmount(0);
    setGameState(GAME_STATES.BETTING);
    if (balance === 0) setBalance(INITIAL_BALANCE);
  };

  const canDouble = gameState === GAME_STATES.PLAYING && playerHand.length === 2 && balance >= currentBet;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Felt texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary)/0.1) 0%, transparent 50%)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-border/50">
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-primary">
          ♠ BLACKJACK
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Saldo</span>
            <motion.span
              key={balance}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="text-lg md:text-xl font-bold text-foreground"
            >
              €{balance}
            </motion.span>
          </div>
        </div>
      </header>

      {/* Game area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 px-4 py-6">
        {/* Dealer hand */}
        <AnimatePresence>
          {dealerHand.length > 0 && (
            <Hand
              cards={dealerHand}
              hideFirst={gameState === GAME_STATES.PLAYING}
              label="Diiler"
            />
          )}
        </AnimatePresence>

        {/* Center area: betting or controls or result */}
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {gameState === GAME_STATES.BETTING && (
              <motion.div
                key="betting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ChipSelector
                  balance={balance}
                  currentBet={currentBet}
                  onBet={handleBet}
                  onClear={handleClearBet}
                  onDeal={handleDeal}
                />
              </motion.div>
            )}

            {gameState === GAME_STATES.PLAYING && (
              <motion.div
                key="controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GameControls
                  onHit={handleHit}
                  onStand={handleStand}
                  onDouble={handleDouble}
                  canDouble={canDouble}
                />
              </motion.div>
            )}

            {gameState === GAME_STATES.DEALER_TURN && (
              <motion.div
                key="dealer-turn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground font-medium text-sm">Diiler mõtleb...</span>
              </motion.div>
            )}

            {gameState === GAME_STATES.FINISHED && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultBanner
                  result={result}
                  winAmount={winAmount}
                  onNewGame={handleNewGame}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Player hand */}
        <AnimatePresence>
          {playerHand.length > 0 && (
            <Hand cards={playerHand} label="Sina" />
          )}
        </AnimatePresence>
      </main>

      {/* Current bet indicator (during play) */}
      {gameState !== GAME_STATES.BETTING && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs text-foreground/70">
            Panus: <span className="font-bold text-primary">€{currentBet}</span>
          </div>
        </div>
      )}
    </div>
  );
}