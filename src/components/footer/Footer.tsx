'use client';

import { ArrowUp, Sparkles, ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070707] border-t border-white/10 pt-20 pb-12 px-4 sm:px-8 overflow-hidden text-neutral-400">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6B35]/5 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFD166] flex items-center justify-center text-black font-extrabold text-base shadow-lg shadow-[#FF6B35]/20">
                A
              </div>
              <div>
                <span className="text-xl font-black uppercase tracking-tight text-white block leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  Ascendra Learning
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                  Singapore Premium Lifelong Learning Ecosystem
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-sm">
              Engineered for ambitious learners in Singapore. Multi-disciplinary mastery spanning DeepTech Artificial Intelligence, Singapore-Cambridge Academic Sciences, FinTech Strategy, Diplomatic Languages, and Spatial Design.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[#6EE7B7]">
              <ShieldCheck className="w-4 h-4" />
              <span>SkillsFuture Singapore (SSG) Accredited Partner</span>
            </div>
          </div>

          {/* Quick Curricula Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Curricula
            </div>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#programs" className="hover:text-white transition-colors">Autonomous AI Systems</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">H2 Economics & Sciences</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">PSLE Olympiad Heuristics</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Cross-Border FinTech</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Corporate Diplomatic Keigo</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Spatial VisionOS Design</a></li>
            </ul>
          </div>

          {/* Ecosystem Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Ecosystem
            </div>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#goals" className="hover:text-white transition-colors">Orientation Engine</a></li>
              <li><a href="#universe" className="hover:text-white transition-colors">Learning Universe</a></li>
              <li><a href="#pathways" className="hover:text-white transition-colors">Career Pathways</a></li>
              <li><a href="#trainers" className="hover:text-white transition-colors">Faculty Chronicles</a></li>
              <li><a href="#trial" className="hover:text-white transition-colors">Trial Class Studios</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">Admissions Portal</a></li>
              <li><a href="#scholarships" className="hover:text-white transition-colors">Fellowship Grants</a></li>
              <li><a href="#campuses" className="hover:text-white transition-colors">10 Campus Nodes</a></li>
            </ul>
          </div>

          {/* Headquarters Concierge */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Central Concierge
            </div>
            <div className="space-y-2 text-xs font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <span>Marina Bay Financial Centre, Tower 2, Level 42, Singapore 018983</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                <span>+65 6820 9001 (Mon - Sun 8AM - 10PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>admissions@ascendra.edu.sg</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
              >
                <span>Back to Zenith</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#FF6B35]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} Ascendra Learning Pte. Ltd. (UEN: 202418902K). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Singapore PDPA Compliance</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">SSG WSQ Framework</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Matriculation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
