'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, MapPin, Users, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import type { TrialClass, Trainer, Campus, Course } from '@/types/dataset';

interface TrialClassProps {
  trialClasses: TrialClass[];
  trainers: Trainer[];
  campuses: Campus[];
  courses: Course[];
}

export default function TrialClassSection({
  trialClasses,
  trainers,
  campuses,
  courses,
}: TrialClassProps) {
  const [selectedTrialId, setSelectedTrialId] = useState<string>(trialClasses[0]?.id || '');
  const [booked, setBooked] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  const activeTrial =
    trialClasses.find((t) => t.id === selectedTrialId) || trialClasses[0];

  const matchedTrainer = trainers.find((tr) => tr.id === activeTrial.trainer_id);
  const matchedCampus = campuses.find((cmp) => cmp.id === activeTrial.campus_id);
  const matchedCourse = courses.find((crs) => crs.id === activeTrial.course_id);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput || !emailInput) return;

    setBooked(true);
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#6EE7B7', '#FFD166', '#38BDF8'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="trial" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#6EE7B7] bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 06 • Diagnostic Studio Trial</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Trial Class <span className="text-[#6EE7B7]">Experience</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Test the rigor before enrolling. Attend an immersive 90-minute studio workshop with our senior faculty across our Singapore flagship campuses.
          </p>
        </div>

        {/* Trial Session Selector Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {trialClasses.map((trial) => {
            const isSelected = trial.id === selectedTrialId;
            const trainer = trainers.find((tr) => tr.id === trial.trainer_id);
            const campus = campuses.find((cmp) => cmp.id === trial.campus_id);

            return (
              <div
                key={trial.id}
                onClick={() => {
                  setSelectedTrialId(trial.id);
                  setBooked(false);
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/15 border-white/40 shadow-xl scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#6EE7B7] font-bold">Complimentary (SGD $0)</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px]">
                      {trial.seats_remaining} seats left
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug line-clamp-2">
                    {trial.title}
                  </h4>
                  <div className="text-xs text-neutral-400 font-mono mb-3">
                    By {trainer?.name || 'Senior Fellow'}
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span>{campus?.name.split(' ')[0]} Hub</span>
                  <span className="text-[#6EE7B7]">Select →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Booking Studio Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Workshop Agenda & Faculty Info */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl glass-panel border border-white/15 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#6EE7B7] text-black uppercase tracking-wider">
                  {activeTrial.mode}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <Users className="w-4 h-4 text-[#FF6B35]" />
                  <span>Capped at {activeTrial.seats_total} Fellows Max</span>
                </div>
              </div>

              <h3
                className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {activeTrial.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-black/50 border border-white/10 mb-8 font-mono text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6EE7B7]" />
                  <span>{activeTrial.date_time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFD166]" />
                  <span>{activeTrial.duration_mins} Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                  <span>{matchedCampus?.name || 'Flagship Hub'}</span>
                </div>
              </div>

              {/* 3-Point Hands-On Agenda */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                  Interactive Studio Agenda:
                </div>
                {activeTrial.agenda.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5 text-white">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Key Takeaway */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono uppercase text-[#6EE7B7] mb-1">Tangible Takeaway:</div>
                <p className="text-sm text-neutral-200 font-light">{activeTrial.key_takeaway}</p>
              </div>
            </div>

            {/* Session Host Credential Pill (Zero photo repetition) */}
            {matchedTrainer && (
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#6EE7B7] to-[#38BDF8] flex items-center justify-center text-black font-extrabold font-mono text-sm shadow-md">
                    {matchedTrainer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{matchedTrainer.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#6EE7B7]/15 text-[#6EE7B7] border border-[#6EE7B7]/30">
                        Session Lead
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 font-mono">{matchedTrainer.title}</div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">Faculty Affiliation</div>
                  <div className="text-xs font-mono text-neutral-300">{matchedTrainer.campus_base}</div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Instant Booking Form */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-black border border-white/15 flex flex-col justify-between shadow-2xl relative">
            <AnimatePresence mode="wait">
              {booked ? (
                <motion.div
                  key="booked"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="my-auto py-8 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#6EE7B7]/20 border border-[#6EE7B7] flex items-center justify-center text-[#6EE7B7] mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Studio Reservation Confirmed</h4>
                  <p className="text-sm text-neutral-300 font-light max-w-sm mb-6">
                    Welcome, <strong className="text-white">{nameInput}</strong>. An email calendar invite and Singpass campus security badge have been dispatched to{' '}
                    <strong className="text-white">{emailInput}</strong>.
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 mb-6 text-left w-full space-y-1">
                    <div>Session: {activeTrial.title}</div>
                    <div>Location: {matchedCampus?.address}</div>
                    <div>Host: {matchedTrainer?.name}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBooked(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Reserve for Colleague or Modify
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleBooking}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono uppercase text-[#6EE7B7]">Complimentary Pass</span>
                      <span className="text-xs font-mono text-neutral-400">100% Subsidized</span>
                    </div>
                    <h4 className="text-2xl font-black uppercase text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      Reserve Studio Seat
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      Strict cap of {activeTrial.seats_remaining} seats remaining for this upcoming session.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Rachel Lim"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#6EE7B7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Corporate / Academic Email
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. rachel@enterprise.sg"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#6EE7B7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Singapore Mobile Number (+65)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="e.g. 9123 4567"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#6EE7B7]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#6EE7B7] text-black hover:bg-[#8bf0c6] transition-all duration-200 shadow-xl shadow-[#6EE7B7]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Confirm Free Trial Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
                    <span>Instant confirmation • No credit card required</span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
