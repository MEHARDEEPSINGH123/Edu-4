'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, ArrowUpRight, Sparkles, Ticket } from 'lucide-react';
import type { EventWorkshop } from '@/types/dataset';

interface EventsProps {
  events: EventWorkshop[];
}

export default function EventsWorkshopsSection({ events }: EventsProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [rsvpDone, setRsvpDone] = useState<Record<string, boolean>>({});

  const filterTabs = [
    { label: 'All Sessions', value: 'all' },
    { label: 'Keynotes & Summits', value: 'Keynote' },
    { label: 'Executive Masterclasses', value: 'Masterclass' },
    { label: 'Hands-On Workshops', value: 'Workshop' },
    { label: 'Industry Talks', value: 'Industry Talk' },
    { label: 'Career Placements', value: 'Career Session' },
  ];

  const filteredEvents =
    filterType === 'all' ? events : events.filter((e) => e.type === filterType);

  const featuredEvent = events[0];

  const handleRsvp = (id: string) => {
    setRsvpDone((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="events" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Section 11 • Magazine Editorial Curations</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Events & <span className="text-[#FF6B35]">Workshops</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            High-density symposiums, closed-door masterclasses, and executive career summits across our 10 Singapore campuses.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {filterTabs.map((tab) => {
            const isSelected = filterType === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilterType(tab.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-semibold border-white shadow-md'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Magazine Style Hero Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Cover Story Card */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden glass-panel border border-white/15 relative min-h-[500px] flex flex-col justify-between group">
            <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden">
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FF6B35] text-black uppercase tracking-wider shadow-lg">
                  Magazine Cover Feature • {featuredEvent.type}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/70 backdrop-blur-md text-white border border-white/10">
                  {featuredEvent.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-200">
                <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>{featuredEvent.date}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
                  <Clock className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>{featuredEvent.time}</span>
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between bg-black/40">
              <div>
                <h3
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 group-hover:text-[#FF6B35] transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {featuredEvent.title}
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                  {featuredEvent.description}
                </p>

                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-6">
                  <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0" />
                  <span>Venue: {featuredEvent.venue}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredEvent.speaker_image}
                      alt={featuredEvent.speaker}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{featuredEvent.speaker}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{featuredEvent.speaker_title}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRsvp(featuredEvent.id)}
                  disabled={rsvpDone[featuredEvent.id]}
                  className={`px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg ${
                    rsvpDone[featuredEvent.id]
                      ? 'bg-[#6EE7B7] text-black'
                      : 'bg-[#FF6B35] text-black hover:bg-[#ff7b47]'
                  }`}
                >
                  {rsvpDone[featuredEvent.id] ? 'Pass Reserved ✓' : 'Claim Invitation Pass'}
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Stories Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider pl-2">
              Featured Program Masterclasses
            </div>

            {filteredEvents.slice(1, 3).map((evt) => (
              <div
                key={evt.id}
                className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px]">
                      {evt.type}
                    </span>
                    <span className="text-[#6EE7B7]">{evt.spots_left} passes left</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#FF6B35] transition-colors">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs font-mono text-neutral-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-[#6EE7B7]" />
                      <span>{evt.venue.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">
                    {evt.is_free ? 'Complimentary' : 'Executive Pass'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRsvp(evt.id)}
                    className="text-xs text-[#FF6B35] hover:underline font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <span>{rsvpDone[evt.id] ? 'Reserved ✓' : 'Register'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
