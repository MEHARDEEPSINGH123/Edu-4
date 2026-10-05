'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowUpRight, Compass, Layers, Milestone, Users, GraduationCap, MapPin } from 'lucide-react';

const navItems = [
  { label: 'Explore', href: '#goals', icon: Compass },
  { label: 'Programs', href: '#programs', icon: Layers },
  { label: 'Pathways', href: '#pathways', icon: Milestone },
  { label: 'Community', href: '#community', icon: Users },
  { label: 'Admissions', href: '#admissions', icon: GraduationCap },
  { label: 'Campuses', href: '#campuses', icon: MapPin },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('goals');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Auto-hide when scrolling down significantly, show when scrolling up
      if (currentScrollY > 150 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Detect active section based on scroll position
      const sectionIds = ['goals', 'universe', 'programs', 'pathways', 'trainers', 'trial', 'admissions', 'formats', 'certifications', 'success', 'events', 'scholarships', 'community', 'campuses'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            if (['goals', 'universe'].includes(id)) {
              setActiveSection('goals');
            } else {
              setActiveSection(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <nav className="pointer-events-auto flex items-center justify-between gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full glass-floating-nav max-w-5xl w-full border border-white/10 shadow-2xl">
              {/* Brand Identity */}
              <a
                href="#"
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/5 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFD166] flex items-center justify-center shadow-lg shadow-[#FF6B35]/25">
                  <span className="text-black font-extrabold text-sm tracking-tighter">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight text-white group-hover:text-[#FF6B35] transition-colors leading-none">
                    ASCENDRA
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono mt-0.5">
                    Singapore
                  </span>
                </div>
              </a>

              {/* Desktop Nav Items */}
              <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                {navItems.map((item) => {
                  const isActive =
                    (item.label === 'Explore' && (activeSection === 'goals' || activeSection === 'universe')) ||
                    (item.label === 'Programs' && activeSection === 'programs') ||
                    (item.label === 'Pathways' && activeSection === 'pathways') ||
                    (item.label === 'Community' && activeSection === 'community') ||
                    (item.label === 'Admissions' && activeSection === 'admissions') ||
                    (item.label === 'Campuses' && activeSection === 'campuses');

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-white/15 to-white/10 border border-white/20 shadow-inner"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pr-1">
                <a
                  href="#trial"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#FF6B35] text-black hover:bg-[#ff7d4d] transition-all duration-200 shadow-lg shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Trial</span>
                </a>

                {/* Mobile Menu Trigger */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle Navigation"
                  className="md:hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl p-6 glass-floating-nav border border-white/15 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-white/10 text-neutral-200 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
                <a
                  href="#trial"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full text-xs font-semibold bg-[#FF6B35] text-black"
                >
                  Book Complimentary Trial
                </a>
                <a
                  href="#admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full text-xs font-semibold bg-white/10 text-white"
                >
                  Start Fast-Track Application
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
