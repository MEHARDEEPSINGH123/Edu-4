'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, Award } from 'lucide-react';

interface InfiniteMarqueeProps {
  items?: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

const defaultItems = [
  "SkillsFuture Singapore Accredited",
  "Autonomous AI Agents",
  "Singapore-Cambridge H2 Distinction Pedagogy",
  "98.4% Graduation Rate",
  "Apple Vision Pro Spatial Labs",
  "MAS FinTech Governance",
  "Bilateral Keigo Protocol",
  "10 Flagship Singapore Campuses",
  "48,500+ Active Guild Alumni",
  "Nvidia H100 Cluster Compute",
  "Zero-Trust Cyber Range Defense",
  "GovTech & Grab Placement Syndicate"
];

export default function InfiniteMarquee({
  items = defaultItems,
  direction = 'left',
  speed = 35,
}: InfiniteMarqueeProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/10 bg-black/40 backdrop-blur-md select-none group">
      {/* Edge gradient fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

      <motion.div
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 shrink-0">
            <span
              className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-300 font-semibold group-hover:text-white transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              {item}
            </span>
            <span className="text-neutral-600 text-xs font-mono">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
