'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Sparkles, Building2, Terminal, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import type { CommunityMember } from '@/types/dataset';

interface CommunityProps {
  community: {
    stats: { label: string; value: string }[];
    members: CommunityMember[];
    partners: string[];
    initiatives: { title: string; description: string; tag: string }[];
  };
}

export default function CommunitySection({ community }: CommunityProps) {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filterTabs = ['All', 'Student', 'Professional', 'Mentor', 'Alumni', 'Industry Partner'];

  const filteredMembers =
    activeTab === 'All'
      ? community.members
      : community.members.filter((m) => m.type === activeTab);

  return (
    <section id="community" className="relative py-24 sm:py-32 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Section 13 • Living Human Network</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Ascendra <span className="text-[#38BDF8]">Guild</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            A high-gravity community connecting elite learners, senior technology fellows, and venture builders across Singapore and the Asia-Pacific basin.
          </p>
        </div>

        {/* Community Vital Signs Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl glass-panel border border-white/10 mb-16">
          {community.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-neutral-400 font-mono mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Member Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/5 text-neutral-400 border border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>

        {/* Lively Interactive Members Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 uppercase">
                    {member.type}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 line-clamp-1 max-w-[150px]">
                    {member.company_or_institution}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0 relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {member.name}
                    </h4>
                    <div className="text-xs text-neutral-400 font-mono">{member.title}</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                  &ldquo;{member.contribution}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Verified Singapore Guild Fellow</span>
                <span className="text-[#6EE7B7]">Connected</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Guild Initiatives */}
        <div className="mb-16">
          <div className="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-6 pl-2">
            Standing Ecosystem Initiatives:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {community.initiatives.map((init, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6EE7B7] mb-2 block">
                    {init.tag}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{init.title}</h4>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
                    {init.description}
                  </p>
                </div>
                <div className="text-xs font-mono text-neutral-400 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span>Open to all matriculated Fellows</span>
                  <span className="text-white">Join →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Partner Network Marquee */}
        <div className="p-8 rounded-3xl bg-black/60 border border-white/10 text-center">
          <div className="text-xs font-mono uppercase text-neutral-400 tracking-widest mb-6">
            Enterprise Placement & Research Partners
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {community.partners.map((partner, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
