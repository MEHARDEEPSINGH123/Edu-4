'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Sparkles, Clock, Compass, Layers, ArrowUpRight } from 'lucide-react';
import type { LearningFormat } from '@/types/dataset';

interface LearningFormatsProps {
  formats: LearningFormat[];
}

export default function LearningFormatsSection({ formats }: LearningFormatsProps) {
  const [activeFormatId, setActiveFormatId] = useState<string>(formats[0]?.id || '');
  const activeFormat = formats.find((f) => f.id === activeFormatId) || formats[0];

  return (
    <section id="formats" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#A78BFA] bg-[#A78BFA]/10 border border-[#A78BFA]/20 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Section 08 • Modality Architecture</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Learning <span className="text-[#A78BFA]">Formats</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Six calibrated pedagogical delivery models designed to seamlessly integrate with demanding executive calendars and intensive full-time pivots.
          </p>
        </div>

        {/* 6 Format Visual Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map((fmt) => {
            const isSelected = fmt.id === activeFormatId;
            return (
              <motion.div
                key={fmt.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveFormatId(fmt.id)}
                className={`rounded-3xl overflow-hidden glass-panel border flex flex-col justify-between cursor-pointer transition-all duration-300 relative group ${
                  isSelected
                    ? 'border-white/50 shadow-2xl bg-white/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Visual Image Header */}
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={fmt.image}
                    alt={fmt.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-mono font-bold text-black uppercase tracking-wider shadow-md"
                      style={{ backgroundColor: fmt.accent }}
                    >
                      {fmt.title}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span>{fmt.intensity}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#A78BFA] transition-colors">
                      {fmt.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mb-4">{fmt.tagline}</p>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                      {fmt.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                      {fmt.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-400">Best for: {fmt.best_for}</span>
                    <a
                      href="#admissions"
                      className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
