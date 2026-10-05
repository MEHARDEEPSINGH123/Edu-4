'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ArrowRight, ShieldCheck, DollarSign, Calendar, Sparkles } from 'lucide-react';
import type { Scholarship } from '@/types/dataset';

interface ScholarshipsProps {
  scholarships: Scholarship[];
}

export default function ScholarshipsSection({ scholarships }: ScholarshipsProps) {
  const [activeScholarshipId, setActiveScholarshipId] = useState<string>(scholarships[0]?.id || '');
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  const handleApply = (id: string) => {
    setApplied((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="scholarships" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FFD166] bg-[#FFD166]/10 border border-[#FFD166]/20 mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Section 12 • Endowment & Grants</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Fellowships & <span className="text-[#FFD166]">Grants</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Over $12M SGD in state-backed and philanthropic capital unlocked annually. We ensure no exceptional mind is restrained by financial constraints.
          </p>
        </div>

        {/* Premium Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scholarships.map((sch) => {
            const isApplied = applied[sch.id];
            return (
              <div
                key={sch.id}
                className="rounded-3xl glass-panel border border-white/15 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-white/30 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#FFD166] text-black uppercase tracking-wider">
                      {sch.badge}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {sch.funding_type}
                    </span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight leading-snug group-hover:text-[#FFD166] transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {sch.title}
                  </h3>

                  {/* Funding Value Strip */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Financial Endowment</div>
                      <div className="text-lg sm:text-xl font-mono font-extrabold text-[#6EE7B7]">
                        {sch.funding_amount}
                      </div>
                    </div>
                    <div className="text-right text-xs font-mono text-neutral-400">
                      <div className="text-[10px] uppercase">Next Cutoff</div>
                      <div className="text-white font-medium">{sch.application_deadline.split('(')[0]}</div>
                    </div>
                  </div>

                  {/* Eligibility Criteria */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      Eligibility Matrix:
                    </div>
                    {sch.eligibility.map((el, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                        <CheckCircle className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0 mt-0.5" />
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-white/10">
                    <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      Fellowship Benefits & Privileges:
                    </div>
                    {sch.benefits.map((ben, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD166] shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Process Steps & CTA */}
                <div className="pt-6 border-t border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 mb-4">
                    <strong>Process:</strong> {sch.process_steps.join(' → ')}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApply(sch.id)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                      isApplied
                        ? 'bg-[#6EE7B7] text-black'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>{isApplied ? 'Application Docket Dispatched ✓' : 'Submit Fellowship Application'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
