'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Layers,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChevronDown,
  Check,
  ShieldCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import type { Course } from '@/types/dataset';

interface ProgramExplorerProps {
  courses: Course[];
}

export default function ProgramExplorerSection({ courses }: ProgramExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCourseId, setActiveCourseId] = useState<string>(courses[0]?.id || '');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const filterCategories = [
    { label: 'All Disciplines', value: 'all' },
    { label: 'DeepTech & AI', value: 'technology' },
    { label: 'Academic (A-Level / PSLE)', value: 'academic' },
    { label: 'Business & FinTech', value: 'business' },
    { label: 'Diplomatic Languages', value: 'languages' },
    { label: 'Spatial Creative', value: 'creative' },
    { label: 'Boardroom Governance', value: 'professional' },
  ];

  const filteredCourses =
    selectedCategory === 'all'
      ? courses
      : courses.filter((c) => c.universe === selectedCategory);

  const featuredCourse =
    courses.find((c) => c.id === activeCourseId) || filteredCourses[0] || courses[0];

  return (
    <section id="programs" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FFD166] bg-[#FFD166]/10 border border-[#FFD166]/20 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Section 03 • Editorial Program Explorer</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Curated <span className="text-[#FFD166]">Curricula</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Multi-tiered executive and foundational programs built in collaboration with Singapore state initiatives and global academic bodies.
          </p>
        </div>

        {/* Filter Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
            <span className="pl-3 pr-2 text-neutral-400 text-xs font-mono flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#FFD166]" />
            </span>
            {filterCategories.map((tab) => {
              const isSelected = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(tab.value);
                    const matching = tab.value === 'all' ? courses[0] : courses.find((c) => c.universe === tab.value);
                    if (matching) setActiveCourseId(matching.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Layout: Large Featured Program Hero (NOT small cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Large Editorial Featured Program Card */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden glass-panel border border-white/15 p-6 sm:p-10 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#FFD166] text-black">
                  {featuredCourse.code}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-neutral-300">
                  {featuredCourse.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#6EE7B7]/20 text-[#6EE7B7] border border-[#6EE7B7]/30">
                  {featuredCourse.level} Tier
                </span>
              </div>

              {featuredCourse.skillsfuture_eligible && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6EE7B7]/15 border border-[#6EE7B7]/30 text-xs text-[#6EE7B7] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SkillsFuture Subsidy Eligible</span>
                </div>
              )}
            </div>

            <h3
              className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {featuredCourse.title}
            </h3>

            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8">
              {featuredCourse.overview}
            </p>

            {/* Editorial Visual Showcase with Overlay */}
            <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden mb-8 border border-white/10">
              <Image
                src={featuredCourse.image}
                alt={featuredCourse.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-200">
                <span className="flex items-center gap-1.5 bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Next Cohort: {featuredCourse.next_cohort_date}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md">
                  <Clock className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>{featuredCourse.duration} ({featuredCourse.hours_total} hrs)</span>
                </span>
              </div>
            </div>

            {/* Fee & Financial Architecture */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-xs font-mono uppercase text-neutral-400 mb-1">Standard Tuition</div>
                <div className="text-2xl font-bold text-neutral-300 font-mono">
                  SGD ${featuredCourse.fee_sgd.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-500">GST inclusive</div>
              </div>

              {featuredCourse.skillsfuture_eligible ? (
                <div>
                  <div className="text-xs font-mono uppercase text-[#6EE7B7] mb-1">SSG Mid-Career Subsidy</div>
                  <div className="text-2xl font-bold text-[#6EE7B7] font-mono">
                    -SGD ${featuredCourse.skillsfuture_subsidy_sgd.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-neutral-400">Up to 70-90% grant</div>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-1">Fellowship Fund</div>
                  <div className="text-2xl font-bold text-[#FFD166] font-mono">Merit Available</div>
                  <div className="text-[11px] text-neutral-400">Up to 100% via Application</div>
                </div>
              )}

              <div>
                <div className="text-xs font-mono uppercase text-neutral-400 mb-1">Net Out-Of-Pocket</div>
                <div className="text-2xl font-extrabold text-white font-mono">
                  SGD ${featuredCourse.net_fee_sgd.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-400">Claims via Singpass portal</div>
              </div>
            </div>

            {/* Program Eligibility & Prerequisites */}
            <div className="space-y-4 mb-8 text-sm">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="font-semibold text-white font-mono text-xs uppercase tracking-wider block mb-1">
                  Eligibility Criteria:
                </span>
                <p className="text-neutral-300 font-light">{featuredCourse.eligibility}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="font-semibold text-white font-mono text-xs uppercase tracking-wider block mb-1">
                  Prerequisites:
                </span>
                <p className="text-neutral-300 font-light">{featuredCourse.prerequisites}</p>
              </div>
            </div>

            {/* Interactive Syllabus Accordion Drawer */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD166]" />
                  <span>Modular Curriculum Architecture</span>
                </h4>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSyllabusId(
                      expandedSyllabusId === featuredCourse.id ? null : featuredCourse.id
                    )
                  }
                  className="text-xs text-[#FFD166] hover:underline flex items-center gap-1 font-mono cursor-pointer"
                >
                  <span>{expandedSyllabusId === featuredCourse.id ? 'Collapse Syllabus' : 'View Full Syllabus'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedSyllabusId === featuredCourse.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <AnimatePresence>
                {expandedSyllabusId === featuredCourse.id ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 overflow-hidden pt-2"
                  >
                    {featuredCourse.syllabus.map((mod) => (
                      <div
                        key={mod.module_number}
                        className="p-4 rounded-xl bg-black/40 border border-white/10"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-white">
                            0{mod.module_number}
                          </span>
                          <span className="text-sm font-semibold text-white">{mod.title}</span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-8 text-xs text-neutral-400">
                          {mod.topics.map((t, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD166]" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {featuredCourse.syllabus.slice(0, 2).map((mod) => (
                      <div
                        key={mod.module_number}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs"
                      >
                        <span className="font-mono text-neutral-400 mr-2">Mod 0{mod.module_number}:</span>
                        <span className="text-white font-medium">{mod.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Hosted at: {featuredCourse.campus_locations.join(', ')}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#trial"
                  className="px-6 py-3 rounded-full text-xs font-bold bg-[#FFD166] text-black hover:bg-[#ffe082] transition-colors shadow-lg"
                >
                  Book Trial Session
                </a>
                <a
                  href="#admissions"
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Direct Enrollment
                </a>
              </div>
            </div>
          </div>

          {/* Right Editorial Selection Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 px-2 flex items-center justify-between">
              <span>Related Programs ({filteredCourses.length})</span>
              <span>Select to view</span>
            </div>

            {filteredCourses.map((c) => {
              const isCurrent = c.id === featuredCourse.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveCourseId(c.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden group ${
                    isCurrent
                      ? 'bg-white/10 border-white/30 shadow-xl'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FFD166]" />
                  )}

                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span className="font-semibold text-white">{c.code}</span>
                    <span className="text-[#6EE7B7]">SGD ${c.fee_sgd.toLocaleString()}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#FFD166] transition-colors">
                    {c.title}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-2 mb-3 font-light leading-relaxed">
                    {c.overview}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/5">
                    <span>{c.duration}</span>
                    <span className="flex items-center gap-1 text-[#FFD166]">
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
