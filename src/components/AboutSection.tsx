/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, Compass, Laptop, PenLine } from 'lucide-react';

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
            The parts people rarely see—<span className="font-script text-rose-ink text-4xl sm:text-5xl italic font-normal">but always feel</span>
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
                Who has access. What changes state. Where data moves. What happens when something fails. Which assumptions a result depends on.
              </h3>
              
                            <p className="font-sans text-base text-deep-plum/80 leading-relaxed">
                I like turning those invisible rules into something inspectable: a permission model, a packet format, a deterministic score, a preprocessing pipeline, or an interface that makes state easier to understand.
              </p>
              
                            <p className="font-sans text-base text-deep-plum/80 leading-relaxed mt-4">
                My work moves between backend systems, C++ networking, developer tooling, applied machine learning, and human-centered interfaces. The technologies change, but the underlying questions remain surprisingly consistent.
              </p>

              <p className="font-sans text-base text-deep-plum/80 leading-relaxed mt-4">
                This is also why I care about gentle interfaces. Clarity is not decoration. A calm interface, a useful error message, and an honest limitation can all make a system easier to trust, debug, and use.
              </p>

              <div className="mt-6 pt-6 border-t border-thistle/30 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-rose-ink">
                <span>{'\u2726'} Explicit boundaries</span>
                <span>{'\u2022'} Inspectable state</span>
                <span>{'\u273F'} Explainable decisions</span>
              </div>
            </div>

            {/* Sub-quote block */}
            <div className="border-l-4 border-petal-pink pl-6 py-1 italic font-serif text-lg text-mulberry leading-relaxed">
              "Clarity is not decoration. It is part of making a system easier to trust, debug, and use."
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
                <h4 className="font-serif font-semibold text-lg text-deep-plum">Make Boundaries Explicit</h4>
                <p className="font-sans text-sm text-deep-plum/70 mt-1.5 leading-relaxed">
                  Authentication, authorization, ownership, validation, and honest limits should be visible parts of a system—not assumptions buried inside it.
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
                <h4 className="font-serif font-semibold text-lg text-deep-plum">Make State Inspectable</h4>
                <p className="font-sans text-sm text-deep-plum/70 mt-1.5 leading-relaxed">
                  Whether the state is a vision board, learning streak, network packet, audio representation, or cup of ingredients, I want to understand how it changes and becomes visible.
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
                <h4 className="font-serif font-semibold text-lg text-deep-plum">Make Decisions Explainable</h4>
                <p className="font-sans text-sm text-deep-plum/70 mt-1.5 leading-relaxed">
                  A score, model result, architecture choice, or security claim should have reasoning behind it. I prefer inspectable rules and stated limitations over unexplained confidence.
                </p>
              </div>
            </motion.div>

            {/* Current writing note */}
            <div className="bg-soft-blossom border border-petal-pink/20 p-5 rounded-xl-editorial text-center sticker-shadow">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mulberry font-bold flex items-center justify-center gap-1.5">
                <PenLine className="w-3.5 h-3.5" /> A recurring question
              </p>
              <p className="font-sans text-xs text-deep-plum/80 mt-2">
                Different stacks, same question: what is the system doing, and can someone understand why?
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

