'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Milestone, CheckCircle, ArrowRight, Briefcase, Award, TrendingUp, Building2, UserCheck } from 'lucide-react';
import type { LearningPathway } from '@/types/dataset';

interface LearningPathwaysProps {
  pathways: LearningPathway[];
}

export default function LearningPathwaysSection({ pathways }: LearningPathwaysProps) {
  const [activePathwayId, setActivePathwayId] = useState<string>(pathways[0]?.id || '');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activePathway = pathways.find((p) => p.id === activePathwayId) || pathways[0];
  const activeStep = activePathway.steps[activeStepIndex] || activePathway.steps[0];

  const stageIcons = [UserCheck, Milestone, Briefcase, Award, TrendingUp];

  return (
    <section id="pathways" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 mb-4">
              <Milestone className="w-3.5 h-3.5" />
              <span>Section 04 • Sticky Scroll Storytelling</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Learning <span className="text-[#38BDF8]">Pathways</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            The end-to-end transformation framework. From initial diagnostic benchmarking to high-stakes career placement across Southeast Asia.
          </p>
        </div>

        {/* Pathway Track Selector */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {pathways.map((pw) => {
            const isSelected = pw.id === activePathwayId;
            return (
              <button
                key={pw.id}
                type="button"
                onClick={() => {
                  setActivePathwayId(pw.id);
                  setActiveStepIndex(0);
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-300 border text-left cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-xl'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-60 mb-0.5">{pw.category}</div>
                <div className="text-sm font-bold">{pw.title}</div>
              </button>
            );
          })}
        </div>

        {/* Pathway Stats Banner */}
        <div className="p-6 rounded-2xl bg-black/70 border border-white/15 mb-12 grid grid-cols-2 lg:grid-cols-4 gap-6 backdrop-blur-md">
          <div>
            <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Target Trajectory</div>
            <div className="text-sm sm:text-base font-bold text-white line-clamp-1">{activePathway.target_role}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Benchmark Salary</div>
            <div className="text-sm sm:text-base font-extrabold text-[#6EE7B7] font-mono">{activePathway.avg_salary_sgd}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Average Impact</div>
            <div className="text-sm sm:text-base font-extrabold text-[#38BDF8] font-mono">{activePathway.salary_uplift}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Duration</div>
            <div className="text-sm sm:text-base font-bold text-neutral-200 font-mono">{activePathway.duration_months} Months Total</div>
          </div>
        </div>

        {/* Sticky Visual Journey Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Step Progression */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-400 mb-2 pl-2">
              Visual Transformation Journey (5 Stages)
            </div>

            {activePathway.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const StepIcon = stageIcons[idx] || Milestone;
              return (
                <div
                  key={step.step_number}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex items-start gap-4 ${
                    isActive
                      ? 'bg-white/15 border-white/40 shadow-2xl scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-[#38BDF8] text-black font-bold' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                      <span>Step 0{step.step_number}: {step.stage_name}</span>
                      <span className="text-[#38BDF8] font-bold">{step.highlight}</span>
                    </div>
                    <h4 className="text-base font-bold text-white leading-snug">{step.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Detailed Stage Storytelling */}
          <div className="lg:col-span-7 sticky top-28 rounded-3xl glass-panel border border-white/15 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-[100px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.step_number + '-' + activePathway.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="relative z-10"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#38BDF8] text-black uppercase tracking-wider">
                    {activeStep.stage_name}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Timeline: <strong className="text-white">{activeStep.highlight}</strong>
                  </span>
                </div>

                <h3
                  className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {activeStep.title}
                </h3>

                <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8">
                  {activeStep.description}
                </p>

                {/* Milestone Details */}
                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 mb-8 space-y-3">
                  <div className="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-2">
                    Key Execution Pillars:
                  </div>
                  {activeStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                      <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Hiring Partners Strip */}
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-3 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Associated Hiring & Evaluation Partners:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePathway.hiring_partners.map((partner, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Advance Step Controls */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-full text-xs font-mono text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    ← Previous Stage
                  </button>

                  <button
                    type="button"
                    disabled={activeStepIndex === activePathway.steps.length - 1}
                    onClick={() =>
                      setActiveStepIndex((prev) =>
                        Math.min(activePathway.steps.length - 1, prev + 1)
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-[#38BDF8] text-black hover:bg-[#60cdff] disabled:opacity-30 cursor-pointer transition-colors shadow-lg"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
