'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Navigation, Clock, Phone, Sparkles, Check, ArrowRight } from 'lucide-react';
import type { Campus } from '@/types/dataset';

interface CampusesProps {
  campuses: Campus[];
}

export default function CampusesSection({ campuses }: CampusesProps) {
  const [activeZone, setActiveZone] = useState<string>('All');
  const [selectedCampusId, setSelectedCampusId] = useState<string>(campuses[0]?.id || '');

  const zones = ['All', 'Central', 'West', 'East', 'South', 'North'];

  const filteredCampuses =
    activeZone === 'All'
      ? campuses
      : campuses.filter((c) => c.zone === activeZone);

  const activeCampus =
    campuses.find((c) => c.id === selectedCampusId) || filteredCampuses[0] || campuses[0];

  return (
    <section id="campuses" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Section 14 • Spatial Architectural Network</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Singapore <span className="text-[#FF6B35]">Campuses</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Ten bespoke physical studios engineered for focus, high-bandwidth compute, and high-stakes executive dialogue across Singapore’s key economic districts.
          </p>
        </div>

        {/* Zone Filter Matrix */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {zones.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setActiveZone(zone)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeZone === zone
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/5 text-neutral-400 border border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {zone} {zone !== 'All' ? 'District' : 'Hubs'}
            </button>
          ))}
        </div>

        {/* Large Featured Campus Showcase (NO GOOGLE MAPS - IMMERSIVE STORYTELLING) */}
        <div className="rounded-3xl glass-panel border border-white/15 overflow-hidden p-6 sm:p-12 mb-12 shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCampus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              {/* Massive Architectural Visual */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden border border-white/15 group">
                <Image
                  src={activeCampus.image}
                  alt={activeCampus.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FF6B35] text-black uppercase tracking-wider shadow-lg">
                    {activeCampus.zone} Singapore Node
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#6EE7B7]" />
                    <span>Transit: {activeCampus.mrt}</span>
                  </span>
                  <span className="text-[#FFD166]">{activeCampus.phone}</span>
                </div>
              </div>

              {/* Narrative Architectural Concept & Facilities */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase text-[#FF6B35] tracking-wider mb-2">
                    Flagship Studio Overview
                  </div>
                  <h3
                    className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activeCampus.name}
                  </h3>

                  <div className="text-xs font-mono text-neutral-400 mb-6 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                    <span>{activeCampus.address}</span>
                  </div>

                  {/* Architectural Story Concept */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <div className="text-xs font-mono uppercase text-[#6EE7B7] mb-1">
                      Architectural Philosophy:
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {activeCampus.architectural_concept}
                    </p>
                  </div>

                  {/* Dedicated Facilities */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      Campus Infrastructure & Amenities:
                    </div>
                    {activeCampus.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200 font-light">
                        <Check className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0 mt-0.5" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2 mb-4">
                    <Clock className="w-3.5 h-3.5 text-[#FFD166]" />
                    <span>Hours: {activeCampus.opening_hours}</span>
                  </div>

                  <a
                    href="#trial"
                    className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <span>Book Studio Visit at {activeCampus.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Campus Gallery Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {filteredCampuses.map((cmp) => {
            const isSelected = cmp.id === activeCampus.id;
            return (
              <div
                key={cmp.id}
                onClick={() => setSelectedCampusId(cmp.id)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/15 border-white/40 shadow-lg scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono text-[#FF6B35] uppercase mb-1">
                    {cmp.zone} Node
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">
                    {cmp.name}
                  </h4>
                  <div className="text-[11px] text-neutral-400 line-clamp-1">{cmp.mrt}</div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 text-[10px] font-mono text-[#6EE7B7]">
                  View Hub Story →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
