'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TrendingUp, Quote, CheckCircle2, ArrowRight, Star, ShieldCheck, UserCheck } from 'lucide-react';
import type { SuccessStory, Review } from '@/types/dataset';

interface SuccessStoriesProps {
  successStories: SuccessStory[];
  reviews: Review[];
}

export default function SuccessStoriesSection({
  successStories,
  reviews,
}: SuccessStoriesProps) {
  const [activeStoryId, setActiveStoryId] = useState<string>(successStories[0]?.id || '');
  const activeStory =
    successStories.find((s) => s.id === activeStoryId) || successStories[0];

  return (
    <section id="success" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#6EE7B7] bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Section 10 • Narrative Case Chronicles</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Success <span className="text-[#6EE7B7]">Stories</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            No synthetic testimonials. Deep narrative breakdowns documenting how Singapore learners transformed their professional and academic trajectories.
          </p>
        </div>

        {/* Narrative Selector Ribbon */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {successStories.map((story) => {
            const isSelected = story.id === activeStoryId;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => setActiveStoryId(story.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-300 border text-left cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-xl'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-60 mb-0.5">{story.company}</div>
                <div className="text-sm font-bold">{story.name}</div>
              </button>
            );
          })}
        </div>

        {/* Narrative Storytelling Block (Before -> Learning -> Transformation -> Outcome) */}
        <div className="rounded-3xl glass-panel border border-white/15 overflow-hidden p-6 sm:p-12 mb-16 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Left Column: Portrait & Career Delta */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/15 mb-6 group">
                  <Image
                    src={activeStory.image}
                    alt={activeStory.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
                    <div className="text-xs font-mono text-[#6EE7B7] font-bold mb-0.5">
                      {activeStory.salary_impact}
                    </div>
                    <div className="text-sm font-bold text-white">{activeStory.current_role}</div>
                    <div className="text-xs text-neutral-400">{activeStory.company}</div>
                  </div>
                </div>

                {/* Personal Quote */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative">
                  <Quote className="w-6 h-6 text-[#6EE7B7]/40 mb-2" />
                  <p className="text-sm italic text-neutral-200 leading-relaxed font-light mb-3">
                    &ldquo;{activeStory.quote}&rdquo;
                  </p>
                  <div className="text-xs font-mono text-neutral-400">
                    Alumni of: <strong className="text-white">{activeStory.program_completed}</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: 4-Stage Narrative Breakdown */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                    <span className="text-[#6EE7B7] font-bold">Case Docket: {activeStory.id}</span>
                    <span>•</span>
                    <span>Timeline: {activeStory.timeframe}</span>
                  </div>
                  <h3
                    className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activeStory.name}
                  </h3>
                  <div className="text-sm text-neutral-300 font-light">
                    Originally: <span className="text-neutral-400">{activeStory.previous_role}</span>
                  </div>
                </div>

                {/* 1. BEFORE */}
                <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#FF6B35] uppercase mb-2">
                    <span>Phase 01 • The Baseline Friction</span>
                    <span>Initial State</span>
                  </div>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {activeStory.before}
                  </p>
                </div>

                {/* 2. LEARNING */}
                <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#FFD166] uppercase mb-2">
                    <span>Phase 02 • Ascendra Studio Rigor</span>
                    <span>Pedagogical Forge</span>
                  </div>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {activeStory.learning}
                  </p>
                </div>

                {/* 3. TRANSFORMATION */}
                <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#38BDF8] uppercase mb-2">
                    <span>Phase 03 • The Inflection Point</span>
                    <span>Capstones & Mentorship</span>
                  </div>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {activeStory.transformation}
                  </p>
                </div>

                {/* 4. OUTCOME */}
                <div className="p-5 rounded-2xl bg-[#6EE7B7]/10 border border-[#6EE7B7]/30">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6EE7B7] uppercase mb-2">
                    <span>Phase 04 • High-Impact Outcome</span>
                    <span>Verified Result</span>
                  </div>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    {activeStory.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Verified Community Reviews Strip */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-[#FFD166] fill-[#FFD166]" />
              <span>Verified Community Feedback ({reviews.length})</span>
            </h3>
            <span className="text-xs font-mono text-neutral-400">Singapore Ecosystem Verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#6EE7B7]">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Cohort</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{rev.author}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{rev.role}</div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{rev.campus.split(' ')[0]} Hub</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
