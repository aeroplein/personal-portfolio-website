/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tags } from 'lucide-react';
import type { JournalEntry } from '../types';

interface JournalEntryPageProps {
  entry: JournalEntry;
}

export default function JournalEntryPage({ entry }: JournalEntryPageProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const frame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [entry.id]);

  return (
    <article className="relative min-h-screen overflow-hidden bg-lilac-mist pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-soft-blossom/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-soft-wisteria/55 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <nav aria-label="Journal navigation" className="mb-10">
          <a
            href="#journal"
            className="inline-flex items-center gap-2 rounded-full border border-thistle/50 bg-ivory px-4 py-2 font-serif text-sm font-semibold text-deep-plum shadow-xs transition-all hover:-translate-y-0.5 hover:border-petal-pink/45 hover:text-rose-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petal-pink focus-visible:ring-offset-4 focus-visible:ring-offset-lilac-mist"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to journal
          </a>
        </nav>

        <header className="mb-14 border-b border-thistle/40 pb-10 sm:mb-16 sm:pb-12">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-ink/10 bg-rose-ink/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-rose-ink">
              <Tags className="h-3 w-3" />
              {entry.category}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-deep-plum/55">
              <Clock className="h-3 w-3 text-petal-pink" />
              {entry.readTime}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-deep-plum/45">
              {entry.date}
            </span>
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="outline-none font-serif text-4xl font-bold leading-tight text-deep-plum sm:text-5xl lg:text-6xl"
          >
            {entry.title}
          </h1>

          <p className="mt-6 font-sans text-base leading-relaxed text-deep-plum/80 sm:text-lg">
            {entry.excerpt}
          </p>
          <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-wider text-petal-pink">
            Current mood: {entry.mood}
          </p>
        </header>

        <div className="space-y-12 sm:space-y-14">
          {entry.sections?.map((section, index) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
            >
              <section aria-labelledby={`journal-section-${index}`}>
                <h2
                  id={`journal-section-${index}`}
                  className="mb-5 font-serif text-2xl font-bold leading-tight text-deep-plum sm:text-3xl"
                >
                  {section.heading}
                </h2>
                <div className="space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="font-sans text-base leading-8 text-deep-plum/80 sm:text-[1.0625rem]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {index === 1 && entry.pullQuote && (
                <blockquote className="relative mt-12 rounded-xl-editorial border border-thistle/45 bg-ivory p-7 shadow-xs sm:p-9">
                  <span aria-hidden="true" className="absolute -top-5 right-6 font-script text-5xl italic text-petal-pink/70">
                    note
                  </span>
                  <p className="font-serif text-xl font-semibold italic leading-relaxed text-deep-plum sm:text-2xl">
                    “{entry.pullQuote}”
                  </p>
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>

        <nav aria-label="Journal navigation" className="mt-16 border-t border-thistle/40 pt-10">
          <a
            href="#journal"
            className="inline-flex items-center gap-2 rounded-full bg-mulberry px-5 py-3 font-serif text-sm font-semibold text-ivory shadow-xs transition-all hover:-translate-y-0.5 hover:bg-rose-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petal-pink focus-visible:ring-offset-4 focus-visible:ring-offset-lilac-mist"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to journal
          </a>
        </nav>
      </div>
    </article>
  );
}
