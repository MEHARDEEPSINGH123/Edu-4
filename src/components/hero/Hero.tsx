'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, ArrowRight, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';
import type { Brand } from '@/types/dataset';
import MagneticButton from '@/components/common/MagneticButton';

interface HeroProps {
  brand: Brand;
}

export default function Hero({ brand }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const letterContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const lineItem: Variants = {
    hidden: { y: '110%', opacity: 0, rotateX: 30 },
    show: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pb-16 px-4 sm:px-8 border-b border-white/5"
    >
      {/* Dynamic Ambient Background Motion */}
      <motion.div
        style={{ y: yBackground }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[700px] sm:h-[950px] rounded-full bg-gradient-to-b from-[#FF6B35]/15 via-[#6EE7B7]/8 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute top-[40%] -left-[10%] w-[450px] h-[450px] rounded-full bg-[#FFD166]/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[60%] -right-[10%] w-[450px] h-[450px] rounded-full bg-[#38BDF8]/10 blur-[130px] pointer-events-none" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </motion.div>

      {/* Top Meta Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-mono text-neutral-400"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" />
          <span>Singapore Central Hub • Admissions Open for 2026/2027 Cohorts</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
            <span>SSG / SkillsFuture Accredited</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#FFD166]" />
            <span>10 Singapore Campuses</span>
          </div>
        </div>
      </motion.div>

      {/* Main Kinetic Typography Headline */}
      <motion.div
        style={{ opacity: opacityHero, scale: scaleTitle }}
        className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12"
      >
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start select-none"
        >
          {/* Line 1: LEARN */}
          <div className="overflow-hidden">
            <motion.h1
              variants={lineItem}
              className="text-[14vw] sm:text-[12vw] lg:text-[9.5vw] font-black uppercase tracking-tighter leading-[0.88] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              LEARN
            </motion.h1>
          </div>

          {/* Line 2: BEYOND */}
          <div className="overflow-hidden">
            <motion.h1
              variants={lineItem}
              className="text-[14vw] sm:text-[12vw] lg:text-[9.5vw] font-black uppercase tracking-tighter leading-[0.88] text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 hover:to-[#FF6B35] transition-all duration-700"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              BEYOND
            </motion.h1>
          </div>

          {/* Line 3: BOUNDARIES */}
          <div className="overflow-hidden">
            <motion.h1
              variants={lineItem}
              className="text-[10.5vw] sm:text-[9.2vw] lg:text-[7.6vw] xl:text-[6.5rem] font-black uppercase tracking-tight leading-[0.88] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              BOUNDARIES
            </motion.h1>
          </div>

          {/* Dynamic Badges Row */}
          <div className="overflow-hidden mt-3 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <motion.span
              variants={lineItem}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono uppercase bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35]"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Next-Gen Ecosystem
            </motion.span>

            <motion.div
              variants={lineItem}
              className="inline-flex items-center gap-2 font-handwriting text-2xl sm:text-3xl text-[#FFD166] -rotate-2 select-none"
            >
              <span>✦ Future-ready mastery in SG</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Subheadline and CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              {brand.subheadline}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-400">
              <span className="text-[#FF6B35] font-semibold">
                Multi-Disciplinary Synthesis:
              </span>
              <span>DeepTech AI</span>
              <span>•</span>
              <span>Singapore-Cambridge Academic</span>
              <span>•</span>
              <span>FinTech</span>
              <span>•</span>
              <span>Diplomatic Keigo</span>
              <span>•</span>
              <span>Spatial Design</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3.5">
            <MagneticButton as="a" href="#goals" strength={0.3}>
              <div className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm bg-[#FF6B35] text-black hover:bg-[#ff7b47] transition-all duration-300 shadow-xl shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 hover:-translate-y-0.5 active:translate-y-0">
                <span>Explore Learning Paths</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </MagneticButton>

            <MagneticButton as="a" href="#trial" strength={0.3}>
              <div className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium text-sm text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5">
                <Sparkles className="w-4 h-4 text-[#FFD166]" />
                <span>Book Trial Class</span>
              </div>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* Metric Highlights Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {brand.stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-300 mt-0.5">
              {stat.label}
            </span>
            <span className="text-[11px] text-neutral-500 font-sans mt-0.5 hidden sm:block">
              {stat.description}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Floating Scroll Prompt */}
      <div className="max-w-7xl mx-auto w-full flex justify-center pt-8">
        <a
          href="#goals"
          aria-label="Scroll down to explore"
          className="flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest group-hover:tracking-wider transition-all">
            Scroll to Discover
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-white/30"
          >
            <ArrowDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#FF6B35] transition-colors" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
