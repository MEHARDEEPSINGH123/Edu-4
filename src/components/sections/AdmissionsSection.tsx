'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Calendar,
  Layers,
  MapPin,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import type { LearningGoal, Course, LearningFormat, Campus } from '@/types/dataset';

interface AdmissionsProps {
  goals: LearningGoal[];
  courses: Course[];
  formats: LearningFormat[];
  campuses: Campus[];
}

export default function AdmissionsSection({
  goals,
  courses,
  formats,
  campuses,
}: AdmissionsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string>(goals[0]?.id || '');
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.id || '');
  const [selectedFormat, setSelectedFormat] = useState<string>(formats[0]?.id || '');
  const [selectedCampus, setSelectedCampus] = useState<string>(campuses[0]?.id || '');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [isSingpassVerified, setIsSingpassVerified] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const matchedCourse = courses.find((c) => c.id === selectedCourse) || courses[0];
  const matchedFormat = formats.find((f) => f.id === selectedFormat) || formats[0];
  const matchedCampus = campuses.find((cmp) => cmp.id === selectedCampus) || campuses[0];
  const matchedGoal = goals.find((g) => g.id === selectedGoal) || goals[0];

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF6B35', '#6EE7B7', '#FFD166'],
      });
    } catch {
      // ignore
    }
  };

  const stepsList = [
    { num: 1, title: 'Learning Goal' },
    { num: 2, title: 'Program Matching' },
    { num: 3, title: 'Learning Format' },
    { num: 4, title: 'Campus & Schedule' },
    { num: 5, title: 'Formal Admission' },
  ];

  return (
    <section id="admissions" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Section 07 • Interactive Matriculation Flow</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Admissions <span className="text-[#FF6B35]">Journey</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Follow our 5-stage interactive pipeline. Align your personal objectives, select your studio schedule, and authenticate Singpass SkillsFuture subsidies.
          </p>
        </div>

        {/* Step Progress Motion Graphic Tracker */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#6EE7B7] -translate-y-1/2 z-0"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
            />

            {stepsList.map((s) => {
              const isPastOrCurrent = s.num <= currentStep;
              const isCurrent = s.num === currentStep;

              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                    disabled={s.num > currentStep}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#FF6B35] text-black shadow-lg shadow-[#FF6B35]/30 scale-110'
                        : isPastOrCurrent
                        ? 'bg-[#6EE7B7] text-black'
                        : 'bg-[#1A1A1A] text-neutral-500 border border-white/10'
                    }`}
                  >
                    {isPastOrCurrent && s.num < currentStep ? (
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    ) : (
                      `0${s.num}`
                    )}
                  </button>
                  <span className="hidden sm:block text-[11px] font-mono text-neutral-400 mt-2">
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Flow Stage Card */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/15 min-h-[460px] flex flex-col justify-between shadow-2xl relative">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center max-w-lg mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-[#6EE7B7]/20 border border-[#6EE7B7] flex items-center justify-center text-[#6EE7B7] mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  Matriculation Docket Generated
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                  Congratulations, <strong className="text-white">{applicantName}</strong>. Your provisional matriculation for{' '}
                  <strong className="text-[#FF6B35]">{matchedCourse.title}</strong> has been logged. An official Singpass endorsement pack has been sent to{' '}
                  <strong className="text-white">{applicantEmail}</strong>.
                </p>
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-left space-y-2 mb-8">
                  <div><strong>Student:</strong> {applicantName}</div>
                  <div><strong>Program:</strong> {matchedCourse.title} ({matchedCourse.code})</div>
                  <div><strong>Format:</strong> {matchedFormat.title}</div>
                  <div><strong>Campus:</strong> {matchedCampus.name}</div>
                  <div><strong>Net Fee Payable:</strong> SGD ${matchedCourse.net_fee_sgd.toLocaleString()} (SSG Subsidized)</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Configure Another Program
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35 }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* STEP 1: GOAL */}
                {currentStep === 1 && (
                  <div>
                    <div className="text-xs font-mono uppercase text-[#FF6B35] mb-2">Stage 01 • Intent</div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      What Is Your Primary Educational Objective?
                    </h3>
                    <p className="text-neutral-400 text-sm mb-8 font-light">
                      Select your target outcome to automatically map optimal curriculum modules.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {goals.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => setSelectedGoal(g.id)}
                          className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                            selectedGoal === g.id
                              ? 'bg-white/15 border-white/40 shadow-lg scale-[1.02]'
                              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                            <span>{g.tag}</span>
                            <span className="text-[#6EE7B7]">{g.metric}</span>
                          </div>
                          <h4 className="text-base font-bold text-white mb-2">{g.title}</h4>
                          <p className="text-xs text-neutral-400 font-light line-clamp-2">{g.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: PROGRAM */}
                {currentStep === 2 && (
                  <div>
                    <div className="text-xs font-mono uppercase text-[#FF6B35] mb-2">Stage 02 • Curriculum</div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      Select Your Curricular Discipline
                    </h3>
                    <p className="text-neutral-400 text-sm mb-8 font-light">
                      Programs curated for goal: <strong className="text-white">{matchedGoal.title}</strong>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courses.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => setSelectedCourse(c.id)}
                          className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                            selectedCourse === c.id
                              ? 'bg-white/15 border-white/40 shadow-lg scale-[1.02]'
                              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                            <span className="font-bold text-white">{c.code}</span>
                            <span className="text-[#6EE7B7]">SGD ${c.fee_sgd.toLocaleString()}</span>
                          </div>
                          <h4 className="text-base font-bold text-white mb-2">{c.title}</h4>
                          <div className="text-xs text-neutral-400 line-clamp-2 mb-3">{c.overview}</div>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                            <span>{c.duration}</span>
                            <span>•</span>
                            <span className="text-[#FFD166]">{c.level} Tier</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: FORMAT */}
                {currentStep === 3 && (
                  <div>
                    <div className="text-xs font-mono uppercase text-[#FF6B35] mb-2">Stage 03 • Delivery Mode</div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      Choose Your Preferred Learning Format
                    </h3>
                    <p className="text-neutral-400 text-sm mb-8 font-light">
                      From fully synchronous virtual studios to weekend executive retreats at Marina Bay.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {formats.map((f) => (
                        <div
                          key={f.id}
                          onClick={() => setSelectedFormat(f.id)}
                          className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                            selectedFormat === f.id
                              ? 'bg-white/15 border-white/40 shadow-lg scale-[1.02]'
                              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                          }`}
                        >
                          <div className="text-xs font-mono uppercase text-neutral-400 mb-2">{f.intensity}</div>
                          <h4 className="text-base font-bold text-white mb-2">{f.title}</h4>
                          <p className="text-xs text-neutral-400 font-light mb-3">{f.tagline}</p>
                          <div className="text-[11px] text-[#6EE7B7] font-mono">Best for: {f.best_for}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: SCHEDULE & CAMPUS */}
                {currentStep === 4 && (
                  <div>
                    <div className="text-xs font-mono uppercase text-[#FF6B35] mb-2">Stage 04 • Campus Hub</div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      Select Campus Location & Cohort Schedule
                    </h3>
                    <p className="text-neutral-400 text-sm mb-8 font-light">
                      Next cohort commences on <strong className="text-white">{matchedCourse.next_cohort_date}</strong>.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {campuses.slice(0, 6).map((cmp) => (
                        <div
                          key={cmp.id}
                          onClick={() => setSelectedCampus(cmp.id)}
                          className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                            selectedCampus === cmp.id
                              ? 'bg-white/15 border-white/40 shadow-lg scale-[1.02]'
                              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                          }`}
                        >
                          <div className="text-xs font-mono text-[#FF6B35] mb-1">{cmp.zone} Hub</div>
                          <h4 className="text-sm font-bold text-white mb-2">{cmp.name}</h4>
                          <p className="text-xs text-neutral-400 line-clamp-2">{cmp.mrt}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                      <span>Standard Schedule: {matchedCourse.schedule_summary}</span>
                      <span className="text-[#6EE7B7]">All sessions recorded & archived</span>
                    </div>
                  </div>
                )}

                {/* STEP 5: FORMAL ADMISSION & SUBSIDY */}
                {currentStep === 5 && (
                  <form onSubmit={handleComplete} className="space-y-6">
                    <div>
                      <div className="text-xs font-mono uppercase text-[#6EE7B7] mb-2">Stage 05 • Verification</div>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Confirm Admission & Subsidy Drawdown
                      </h3>
                      <p className="text-neutral-400 text-sm mb-6 font-light">
                        Review your tailored tuition calculation and enter your applicant details.
                      </p>
                    </div>

                    {/* Calculation Summary Card */}
                    <div className="p-6 rounded-2xl bg-black/60 border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
                      <div>
                        <div className="text-neutral-400 uppercase mb-1">Gross Tuition</div>
                        <div className="text-xl font-bold text-white">SGD ${matchedCourse.fee_sgd.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[#6EE7B7] uppercase mb-1">SkillsFuture Subsidy</div>
                        <div className="text-xl font-bold text-[#6EE7B7]">
                          -SGD ${matchedCourse.skillsfuture_subsidy_sgd.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-neutral-400 uppercase mb-1">Final Out-Of-Pocket</div>
                        <div className="text-2xl font-extrabold text-white">SGD ${matchedCourse.net_fee_sgd.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                          Applicant Legal Name
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Kenneth Tan"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF6B35]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="e.g. kenneth@tech.sg"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF6B35]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 cursor-pointer" onClick={() => setIsSingpassVerified(!isSingpassVerified)}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSingpassVerified ? 'bg-[#6EE7B7] border-[#6EE7B7] text-black' : 'border-white/20'}`}>
                        {isSingpassVerified && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span>I am a Singapore Citizen / Permanent Resident claiming SSG / SkillsFuture subsidies via Singpass.</span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF6B35] text-black hover:bg-[#ff7e4a] transition-all duration-200 shadow-xl shadow-[#FF6B35]/25 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Submit Formal Matriculation Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Bottom Step Progression Controls */}
                {currentStep < 5 && (
                  <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={currentStep === 1}
                      onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-white text-black hover:bg-neutral-200 cursor-pointer transition-colors shadow-lg"
                    >
                      <span>Continue to Stage 0{currentStep + 1}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
