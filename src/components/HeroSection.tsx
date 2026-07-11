/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight, FileCode, Star } from 'lucide-react';
import HeroCollage from './HeroCollage';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center bg-lilac-mist overflow-hidden"
    >
      {/* Decorative large atmospheric background circles */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-soft-wisteria/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-16 right-1/4 w-[400px] h-[400px] rounded-full bg-soft-blossom/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content Text Left-Side */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Elegant tiny floating banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-1.5 self-start bg-soft-blossom/30 border border-petal-pink/30 text-rose-ink px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold tracking-wider uppercase mb-6"
            >
              <Star className="w-3 h-3 text-petal-pink fill-petal-pink" />
              <span>Computer Engineering Candidate ✿ 2026</span>
            </motion.div>

            {/* Title with Sacramento calligraphy script accent */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-deep-plum font-bold tracking-tight leading-[1.08] mb-6"
            >
              Building <span className="font-script text-petal-pink font-normal lowercase tracking-wide text-5xl sm:text-6xl lg:text-7xl block sm:inline-block md:-mr-2">thoughtful</span> software with a soft spot for data, design, and clean engineering.
            </motion.h1>

            {/* Subheadline sentence */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-lg text-mulberry font-medium leading-relaxed max-w-2xl mb-10"
            >
              Hi, I’m Pelin Zeynep Kaya, a Computer Engineering student exploring backend development, full-stack applications, and AI/data-driven projects.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={() => onNavigate('projects')}
                className="group flex items-center justify-center gap-2 bg-gradient-to-br from-[#DEAFC2] via-[#D480BB] to-[#A775C9] text-[#F4F7EA] border border-[#F4F7EA]/45 px-6 py-3.5 rounded-full font-serif font-medium text-base tracking-wide shadow-[0_12px_28px_rgba(212,128,187,0.22)] hover:shadow-[0_16px_32px_rgba(212,128,187,0.32)] hover:-translate-y-[2px] hover:brightness-105 active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>View My Work</span>
                <ChevronRight className="w-4 h-4 text-[#F4F7EA] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center justify-center gap-2 bg-[#F4F7EA] border-[1.5px] border-[#CDB9DD] hover:bg-[#EEE5F7]/40 text-[#5A2848] px-6 py-3.5 rounded-full font-sans font-semibold text-sm hover:-translate-y-[2px] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Contact Details</span>
                <ArrowUpRight className="w-4 h-4 text-[#D480BB]" />
              </button>
            </motion.div>

            {/* Bullet attributes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-14 pt-8 border-t border-thistle/20 grid grid-cols-3 gap-4"
            >
              <div>
                <span className="block font-serif text-2xl font-semibold text-deep-plum">3.89</span>
                <span className="block font-mono text-[10px] text-rose-ink uppercase tracking-wider mt-1">Cumulative GPA</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-semibold text-deep-plum">6+</span>
                <span className="block font-mono text-[10px] text-rose-ink uppercase tracking-wider mt-1">Tech Stacks</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-semibold text-deep-plum">100%</span>
                <span className="block font-mono text-[10px] text-rose-ink uppercase tracking-wider mt-1">Feminine Dev Soul</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Interactive Sticker Collage Right-Side */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <HeroCollage />
          </div>
        </div>
      </div>
    </section>
  );
}
