/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, Circle, Compass, Flower2, Heart, Laptop, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-soft-wisteria relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-lilac-mist/40 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-96 h-96 rounded-full bg-soft-blossom/15 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Section Heading */}
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-petal-pink font-semibold">
            01 / Identity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mt-2">
            Meet <span className="font-script text-rose-ink text-4xl sm:text-5xl italic font-normal">Pelin Zeynep</span>
          </h2>
          <div className="w-16 h-1 bg-petal-pink mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Magazine-style Personal Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-ivory border border-thistle/45 p-8 rounded-xl-editorial shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-soft-blossom/10 rounded-bl-full pointer-events-none" />
              
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-deep-plum mb-4 leading-tight">
                "Software engineering is more than writing algorithms. It is the craft of understanding real problems closely enough to design solutions that genuinely help people. I believe technical work becomes stronger when curiosity, creativity, and the things we enjoy are allowed into the process."
              </h3>
              
                            <p className="font-sans text-base text-deep-plum/80 leading-relaxed">
                As a fourth-year Computer Engineering student, I am exploring how full-stack development, backend systems, AI, machine learning, and data science can work together to solve meaningful problems.
              </p>
              
                            <p className="font-sans text-base text-deep-plum/80 leading-relaxed mt-4">
                I am equally interested in the academic side of computing: learning the theoretical foundations behind a system, understanding why an approach works, and carrying that knowledge into practical, human-centered solutions. I enjoy connecting systems, data, design, and real user needs to create work that is technically grounded, creatively considered, and genuinely useful.
              </p>

              <div className="mt-6 pt-6 border-t border-thistle/30 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-rose-ink">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  B.S. Senior Candidate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Circle className="w-1.5 h-1.5 fill-current" aria-hidden="true" />
                  Systems learner
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Flower2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Human-centered developer
                </span>
              </div>
            </div>

            {/* Sub-quote block */}
            <div className="border-l-4 border-petal-pink pl-6 py-1 italic font-serif text-lg text-mulberry leading-relaxed">
              "I believe code should feel like home. Every error message, API route, and hover state is a chance to provide hospitality and clarity to the developer or the end user."
            </div>
          </div>

          {/* Right Column: Layered Interactive Bento Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Academic Interest Block 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-ivory border border-thistle/45 p-6 rounded-lg shadow-xs flex gap-4"
            >
              <div className="w-12 h-12 shrink-0 bg-soft-blossom/40 text-rose-ink rounded-full flex items-center justify-center border border-petal-pink/20">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg text-deep-plum">What I Love Building</h4>
                <p className="font-sans text-sm text-deep-plum/70 mt-1.5 leading-relaxed">
                  Fast REST and gRPC backend systems, type-safe compilers, visual state parsers, and machine learning pipelines that process unstructured sentiment logs.
                </p>
              </div>
            </motion.div>

            {/* Academic Interest Block 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-ivory border border-thistle/45 p-6 rounded-lg shadow-xs flex gap-4"
            >
              <div className="w-12 h-12 shrink-0 bg-bright-lavender/30 text-mulberry rounded-full flex items-center justify-center border border-bright-lavender/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg text-deep-plum">Academic Focus</h4>
                <p className="font-sans text-sm text-deep-plum/70 mt-1.5 leading-relaxed">
                  Compilers, automata theory, data structures, and advanced database indexes. Currently exploring lightweight in-memory caching layers in Rust.
                </p>
              </div>
            </motion.div>

            {/* Academic Interest Block 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-ivory border border-thistle/45 p-6 rounded-lg shadow-xs flex gap-4"
            >
              <div className="w-12 h-12 shrink-0 bg-sky-reflection/30 text-deep-plum rounded-full flex items-center justify-center border border-sky-reflection/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg text-deep-plum">Currently Exploring</h4>
                <p className="font-sans text-sm text-deep-plum/70 mt-1.5 leading-relaxed">
                  How editorial layouts can optimize student mental focus on complex tech dashboards, making STEM education workspaces softer and less daunting.
                </p>
              </div>
            </motion.div>

            {/* Cute personal stamp */}
            <div className="bg-soft-blossom border border-petal-pink/20 p-5 rounded-xl-editorial text-center sticker-shadow">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mulberry font-bold flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-ink stroke-rose-ink" /> Vibe Check
              </p>
              <p className="font-sans text-xs text-deep-plum/80 mt-2">
                Lavender matcha fuel â€¢ 100+ book shelf â€¢ mechanical keyboards with pink accents â€¢ clean compilers
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

