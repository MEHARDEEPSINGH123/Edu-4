'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight, Award, Briefcase, GraduationCap, ArrowRight, MapPin } from 'lucide-react';
import type { Trainer } from '@/types/dataset';

interface TrainerStoriesProps {
  trainers: Trainer[];
}

export default function TrainerStoriesSection({ trainers }: TrainerStoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeTrainer = trainers[currentIndex] || trainers[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trainers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + trainers.length) % trainers.length);
  };

  return (
    <section id="trainers" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Section 05 • Faculty Chronicles</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Trainer <span className="text-[#FF6B35]">Stories</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-400">
              Fellow <strong className="text-white">0{currentIndex + 1}</strong> of 0{trainers.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Faculty Story"
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Faculty Story"
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Story Experience Block (ONE TRAINER PER BLOCK - NO GRID) */}
        <div className="rounded-3xl glass-panel border border-white/15 overflow-hidden p-6 sm:p-12 lg:p-16 relative shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrainer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Massive Portrait Visual Column */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                  <Image
                    src={activeTrainer.image}
                    alt={activeTrainer.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  {/* Campus Base Tag */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>{activeTrainer.campus_base}</span>
                    </span>
                    <span className="text-[#6EE7B7]">{activeTrainer.experience_years}+ Yrs Field Mastery</span>
                  </div>
                </div>
              </div>

              {/* Story Narrative & Quote Column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#FF6B35] text-black uppercase tracking-wider">
                      Distinguished Faculty
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {activeTrainer.credentials}
                    </span>
                  </div>

                  <h3
                    className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2 leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activeTrainer.name}
                  </h3>

                  <div className="text-base sm:text-lg font-medium text-[#FF6B35] mb-6">
                    {activeTrainer.title}
                  </div>

                  {/* Large Proclamation Quote */}
                  <div className="relative mb-8 pl-6 border-l-2 border-[#FF6B35]">
                    <Quote className="w-8 h-8 text-[#FF6B35]/40 absolute -top-4 -left-3 pointer-events-none" />
                    <p className="text-lg sm:text-2xl font-light italic text-white leading-relaxed">
                      &ldquo;{activeTrainer.quote}&rdquo;
                    </p>
                  </div>

                  {/* Narrative Biographical Story */}
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-8">
                    {activeTrainer.story}
                  </p>

                  {/* Notable Achievements Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2">
                      <Award className="w-3.5 h-3.5 text-[#FFD166]" />
                      <span>Career Milestones & Distinctions:</span>
                    </div>
                    {activeTrainer.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shrink-0 mt-2" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Industry Expertise Tags */}
                  <div className="mb-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-3">
                      <Briefcase className="w-3.5 h-3.5 text-[#6EE7B7]" />
                      <span>Specialized Disciplines:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeTrainer.industry_expertise.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trainer Action Strip */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-400">Previous Organizations:</span>
                    {activeTrainer.previous_orgs.map((org, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold text-white bg-white/10 px-2.5 py-1 rounded-md"
                      >
                        {org}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#trial"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg"
                  >
                    <span>Attend Studio with {activeTrainer.name.split(' ')[1] || activeTrainer.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Selector Ribbon */}
        <div className="flex items-center justify-center gap-3 mt-8 overflow-x-auto py-2 no-scrollbar">
          {trainers.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
