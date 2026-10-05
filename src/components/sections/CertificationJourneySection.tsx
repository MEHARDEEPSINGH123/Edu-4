'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react';
import type { CertificationItem } from '@/types/dataset';

interface CertificationProps {
  certifications: CertificationItem[];
}

export default function CertificationJourneySection({ certifications }: CertificationProps) {
  const [activeCertId, setActiveCertId] = useState<string>(certifications[0]?.id || '');
  const activeCert = certifications.find((c) => c.id === activeCertId) || certifications[0];

  const stagesFlow = [
    { key: 'Learning', label: '01. Learning', desc: 'Rigorous theoretical & foundation mastery' },
    { key: 'Assessment', label: '02. Assessment', desc: 'Proctored coding & analytical diagnostic sprints' },
    { key: 'Project', label: '03. Project', desc: 'Enterprise live sandboxed production capstone' },
    { key: 'Certification', label: '04. Certification', desc: 'Viva voce architecture defense before jury' },
    { key: 'Career Benefits', label: '05. Career Benefits', desc: 'Immutable cryptographic credential & hiring priority' },
  ];

  return (
    <section id="certifications" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FFD166] bg-[#FFD166]/10 border border-[#FFD166]/20 mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Section 09 • Credentialing Architecture</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Certification <span className="text-[#FFD166]">Journey</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            No empty paper badges. An unassailable 5-tier evaluation journey recognized by Singapore regulatory bodies and multinational enterprises.
          </p>
        </div>

        {/* Credential Switcher */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {certifications.map((cert) => {
            const isSelected = cert.id === activeCertId;
            return (
              <button
                key={cert.id}
                type="button"
                onClick={() => setActiveCertId(cert.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-300 border text-left cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-xl'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-60 mb-0.5">{cert.accreditation_level}</div>
                <div className="text-sm font-bold">{cert.title}</div>
              </button>
            );
          })}
        </div>

        {/* Global Journey Visual Flow Tracker (Learning -> Assessment -> Project -> Certification -> Career Benefits) */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10">
          <div className="text-xs font-mono uppercase text-[#FFD166] mb-6 tracking-wider">
            Standard 5-Phase Validation Journey:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {stagesFlow.map((s, idx) => (
              <div key={s.key} className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between relative group">
                <div>
                  <div className="text-xs font-mono font-bold text-[#FFD166] mb-1">{s.label}</div>
                  <div className="text-sm font-bold text-white mb-2">{s.key}</div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{s.desc}</p>
                </div>
                {idx < stagesFlow.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-600">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Credential Docket Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Accreditation & Career Impact */}
          <div className="lg:col-span-5 p-8 rounded-3xl glass-panel border border-white/15">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#FFD166]/20 text-[#FFD166] w-fit mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{activeCert.accreditation_level}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {activeCert.title}
            </h3>

            <div className="text-xs font-mono text-neutral-400 mb-6">
              Awarding Authority: <strong className="text-neutral-200">{activeCert.awarding_body}</strong>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 font-light mb-6">
              <span className="font-mono uppercase text-[#6EE7B7] block mb-1">Recognition Scope:</span>
              {activeCert.recognition_scope}
            </div>

            <div className="space-y-3 mb-8">
              <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Direct Career Benefits:
              </div>
              {activeCert.career_benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <a
              href="#admissions"
              className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <span>Enroll for Credential Defense</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Step-by-Step Rigor Matrix */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase text-neutral-400 pl-2">
              Defense Stages Breakdown:
            </div>

            {activeCert.journey_steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span className="text-[#FFD166] font-bold">{step.stage}</span>
                  <span>{step.duration}</span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#FFD166] transition-colors">
                  {step.phase_title}
                </h4>

                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-3">
                  {step.description}
                </p>

                <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-xs font-mono text-neutral-400">
                  <span className="text-neutral-500 mr-2">Deliverable:</span>
                  <span className="text-neutral-200">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
