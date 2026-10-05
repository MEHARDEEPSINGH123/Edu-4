'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Sparkles, TrendingUp, Compass } from 'lucide-react';
import type { LearningGoal, Course } from '@/types/dataset';

interface WhyLearningSectionProps {
  goals: LearningGoal[];
  courses: Course[];
}

export default function WhyLearningSection({ goals, courses }: WhyLearningSectionProps) {
  const [selectedGoalId, setSelectedGoalId] = useState<string>(goals[0]?.id || 'academic-excellence');

  const activeGoal = goals.find((g) => g.id === selectedGoalId) || goals[0];
  const matchedCourses = courses.filter((c) => activeGoal.recommended_course_ids.includes(c.id));

  return (
    <section id="goals" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      {/* Background accents */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 transition-all duration-700"
        style={{ backgroundColor: activeGoal.accent }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Section 01 • Interactive Orientation</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Why Are You <span className="text-[#FF6B35]">Learning?</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Every learner carries a distinct inflection point. Select your core objective to calibrate Ascendra’s multi-disciplinary recommendation engine.
          </p>
        </div>

        {/* Interactive Selector Pill Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-2 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 mb-12 backdrop-blur-md">
          {goals.map((goal) => {
            const isSelected = goal.id === selectedGoalId;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoalId(goal.id)}
                className={`relative px-4 py-3.5 rounded-xl sm:rounded-full text-xs font-semibold tracking-wide transition-all duration-300 text-center flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'text-black shadow-lg'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="goal-active-bg"
                    className="absolute inset-0 rounded-xl sm:rounded-full"
                    style={{ backgroundColor: goal.accent }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 leading-tight">{goal.title}</span>
                <span
                  className={`relative z-10 text-[10px] font-mono mt-0.5 opacity-80 ${
                    isSelected ? 'text-black/80' : 'text-neutral-500'
                  }`}
                >
                  {goal.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Panel based on Selected Goal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGoal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Narrative & Metric Column */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span
                    className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold"
                    style={{
                      backgroundColor: `${activeGoal.accent}20`,
                      color: activeGoal.accent,
                      border: `1px solid ${activeGoal.accent}40`,
                    }}
                  >
                    Target Outcome: {activeGoal.tag}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <TrendingUp className="w-4 h-4 text-[#6EE7B7]" />
                    <span>Benchmark:</span>
                    <strong className="text-white font-bold">{activeGoal.metric}</strong>
                  </div>
                </div>

                <h3
                  className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {activeGoal.title}
                </h3>

                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light mb-8">
                  {activeGoal.description}
                </p>

                {/* Mentor Quote */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                  <blockquote className="text-neutral-200 italic text-sm sm:text-base leading-relaxed mb-3">
                    &ldquo;{activeGoal.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-black"
                      style={{ backgroundColor: activeGoal.accent }}
                    >
                      {activeGoal.author[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{activeGoal.author}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{activeGoal.author_title}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Programs Strip */}
              <div className="relative z-10 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase font-mono tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Recommended Programs for this Path</span>
                  </div>
                  <a
                    href="#programs"
                    className="text-xs text-[#FF6B35] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedCourses.slice(0, 2).map((course) => (
                    <a
                      key={course.id}
                      href="#programs"
                      className="p-3.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-1">
                          <span>{course.code}</span>
                          <span className="text-[#6EE7B7]">SGD ${course.fee_sgd.toLocaleString()}</span>
                        </div>
                        <div className="text-xs font-bold text-white group-hover:text-[#FF6B35] transition-colors line-clamp-2">
                          {course.title}
                        </div>
                      </div>
                      <div className="mt-2 text-[10px] text-neutral-400 flex items-center gap-2">
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.format}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Image & Direct CTA Column */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl overflow-hidden relative min-h-[420px] lg:min-h-full border border-white/10 group">
              <Image
                src={activeGoal.image}
                alt={activeGoal.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Floating Top Badge */}
              <div className="relative z-10 p-6 flex justify-between items-start">
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg"
                  style={{ backgroundColor: activeGoal.accent, color: '#000000' }}
                >
                  {activeGoal.tag}
                </span>
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-5 h-5 text-[#6EE7B7]" />
                </div>
              </div>

              {/* Bottom Interactive Call to Action */}
              <div className="relative z-10 p-6 sm:p-8 backdrop-blur-md bg-black/50 border-t border-white/10 m-4 rounded-2xl">
                <div className="text-xs font-mono uppercase text-neutral-400 mb-1">
                  Ready to calibrate your learning path?
                </div>
                <div className="text-base font-bold text-white mb-4">
                  Schedule a complimentary diagnostic consultation with our faculty.
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="#trial"
                    className="flex-1 py-3 px-4 rounded-full text-center text-xs font-bold text-black bg-white hover:bg-neutral-200 transition-colors shadow-md"
                  >
                    Book Diagnostic Session
                  </a>
                  <a
                    href="#pathways"
                    className="flex-1 py-3 px-4 rounded-full text-center text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
                  >
                    Explore Journey
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
