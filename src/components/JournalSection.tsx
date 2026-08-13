/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, Clock, Tags } from 'lucide-react';
import { journalEntries } from '../data';

export default function JournalSection() {
  return (
    <section id="journal" className="py-24 bg-ivory relative overflow-hidden">
      <div className="absolute -top-24 left-10 w-80 h-80 rounded-full bg-soft-blossom/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-soft-wisteria/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-petal-pink font-semibold block">
              06 / Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum leading-tight">
              Notes from my <span className="font-script text-petal-pink text-4xl sm:text-5xl italic font-normal">digital desk</span>
            </h2>
            <div className="w-16 h-1 bg-petal-pink rounded-full" />
            <p className="font-sans text-sm sm:text-base text-deep-plum/80 leading-relaxed">
              Research notes, project reflections, and writing about the questions I am actively exploring.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {journalEntries.map((entry, index) => {
              const cardContent = (
                <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-rose-ink bg-rose-ink/5 border border-rose-ink/10 px-2.5 py-1 rounded-full">
                      <Tags className="w-3 h-3" />
                      {entry.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-deep-plum/50">
                      <Clock className="w-3 h-3 text-petal-pink" />
                      {entry.readTime}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-deep-plum/45">
                    {entry.date}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-10 space-y-3">
                    <h3 className={`font-serif text-2xl sm:text-3xl font-bold text-deep-plum leading-tight ${entry.slug ? 'group-hover:text-rose-ink transition-colors' : ''}`}>
                      {entry.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-deep-plum/78 leading-relaxed">
                      {entry.excerpt}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-petal-pink font-semibold pt-2">
                      Current mood: {entry.mood}
                    </p>
                  </div>

                  <div className="md:col-span-2 flex md:justify-end">
                    {entry.slug ? (
                      <span className="inline-flex items-center justify-center gap-2 w-full md:w-12 h-12 rounded-full bg-ivory border border-thistle/50 text-rose-ink group-hover:bg-mulberry group-hover:text-ivory group-hover:border-mulberry transition-all">
                        <BookOpen className="w-4 h-4 md:hidden" />
                        <span className="font-serif text-sm md:hidden">Read note</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center whitespace-nowrap px-3 py-2 rounded-full bg-ivory border border-thistle/50 font-mono text-[10px] uppercase tracking-wider text-deep-plum/55">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
                </>
              );

              const cardClassName = `${entry.slug ? 'group' : ''} block bg-lilac-mist border border-thistle/45 rounded-xl-editorial p-6 sm:p-8 shadow-xs`;
              const motionProps = {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-80px' },
                transition: { duration: 0.55, delay: index * 0.12 }
              };

              return entry.slug ? (
                <motion.a
                  key={entry.id}
                  href={`#/journal/${entry.slug}`}
                  aria-label={`Read ${entry.title}`}
                  {...motionProps}
                  className={`${cardClassName} hover:border-petal-pink/35 sticker-shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petal-pink focus-visible:ring-offset-4 focus-visible:ring-offset-ivory`}
                >
                  {cardContent}
                </motion.a>
              ) : (
                <motion.article
                  key={entry.id}
                  {...motionProps}
                  className={cardClassName}
                >
                  {cardContent}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
