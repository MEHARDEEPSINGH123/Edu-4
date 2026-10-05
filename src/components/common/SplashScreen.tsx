'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after 1.1s for a snappy, high-impact entrance
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-99999 bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-[#FF6B35]/25 via-[#6EE7B7]/15 to-transparent blur-[80px] animate-pulse" />

          {/* Center Logo & Progress */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            {/* Animated Brand Emblem */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFD166] flex items-center justify-center shadow-2xl shadow-[#FF6B35]/30">
                <span className="text-black font-black text-2xl tracking-tighter">A</span>
              </div>
              <motion.div
                className="absolute -inset-1.5 rounded-3xl border border-[#FF6B35]/40 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col items-center text-center">
              <span
                className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ASCENDRA LEARNING
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mt-1">
                Singapore • Lifelong Learning Ecosystem
              </span>
            </div>

            {/* Animated Micro Dots */}
            <div className="flex items-center gap-2 mt-2">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"
              />
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]"
              />
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-[#FFD166]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
