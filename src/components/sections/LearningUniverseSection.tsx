'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Globe, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import type { UniversePanel } from '@/types/dataset';

interface LearningUniverseSectionProps {
  universePanels: UniversePanel[];
}

export default function LearningUniverseSection({ universePanels }: LearningUniverseSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activePanel = universePanels[currentIndex] || universePanels[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % universePanels.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + universePanels.length) % universePanels.length);
  };

  return (
    <section id="universe" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#6EE7B7] bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>Section 02 • Learning Universe</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The 6 Dimensional <span className="text-[#6EE7B7]">Universe</span>
            </h2>
          </div>

          {/* Universe Control Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              <strong className="text-white">0{currentIndex + 1}</strong> / 0{universePanels.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Universe"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Universe"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Universe Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {universePanels.map((panel, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={panel.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="font-mono text-[10px] mr-1.5 opacity-60">0{idx + 1}</span>
                {panel.title}
              </button>
            );
          })}
        </div>

        {/* Full-Screen Immersive Panel Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black min-h-[580px] lg:min-h-[640px] shadow-2xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={activePanel.image}
                alt={activePanel.title}
                fill
                className="object-cover opacity-35"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${activePanel.color_accent}, transparent 60%)`,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Panel Top Meta Bar */}
          <div className="relative z-10 p-6 sm:p-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider text-black shadow-lg"
                style={{ backgroundColor: activePanel.color_accent }}
              >
                {activePanel.badge}
              </span>
              <span className="text-xs font-mono text-neutral-300 hidden sm:inline">
                {activePanel.stats}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#programs"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all"
              >
                <span>Filter Programs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Panel Main Content Area */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 mt-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel.id + '-content'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
              >
                <div className="lg:col-span-7">
                  <div className="text-sm font-mono tracking-widest uppercase text-neutral-400 mb-2">
                    {activePanel.subtitle}
                  </div>
                  <h3
                    className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activePanel.title}
                  </h3>
                  <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-6">
                    {activePanel.description}
                  </p>

                  {/* Competency Badges */}
                  <div className="flex flex-wrap gap-2">
                    {activePanel.key_competencies.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-black/60 border border-white/15 text-neutral-300"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Programs in This Universe */}
                <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-white/15 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 mb-4">
                    <BookOpen className="w-3.5 h-3.5 text-[#6EE7B7]" />
                    <span>Curated Programs in this Dimension</span>
                  </div>

                  <div className="space-y-2.5">
                    {activePanel.featured_programs.map((prog, idx) => (
                      <a
                        key={idx}
                        href="#programs"
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-xs font-semibold text-white group-hover:text-[#6EE7B7] transition-colors line-clamp-1">
                          {prog}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Horizontal Scroll Ribbon */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Horizontal Dimension Track • 06 Specialized Domains
            </div>
            <div className="text-xs font-mono text-neutral-500 hidden sm:block">
              Click or scroll horizontally to explore dimension
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            {universePanels.map((panel, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`shrink-0 w-64 p-3.5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group cursor-pointer ${
                    isSelected
                      ? 'border-white/40 bg-white/10 ring-1 ring-white/20 shery-card-hover'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                  }`}
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={panel.image}
                      alt={panel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="256px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span
                      className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase text-black"
                      style={{ backgroundColor: panel.color_accent }}
                    >
                      {panel.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 mb-0.5">0{idx + 1} Dimension</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#6EE7B7] transition-colors line-clamp-1">
                    {panel.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
