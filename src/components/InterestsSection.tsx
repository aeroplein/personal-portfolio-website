/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Database, Heart, BookOpen, Quote } from 'lucide-react';
import { researchInterests } from '../data';
import { getResearch } from '../api/portfolioApi';
import type { ResearchInterest } from '../types';

export default function InterestsSection() {
  const [researchItems, setResearchItems] = useState<ResearchInterest[]>(researchInterests);

  useEffect(() => {
    getResearch()
      .then(setResearchItems)
      .catch((error) => {
        console.warn('Using static research data because the backend is unavailable.', error);
      });
  }, []);
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-petal-pink" />;
      case 'Database':
        return <Database className="w-5 h-5 text-soft-periwinkle" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-ink" />;
      default:
        return <BookOpen className="w-5 h-5 text-deep-plum" />;
    }
  };

  return (
    <section id="interests" className="py-24 bg-lilac-mist relative overflow-hidden">
      {/* Editorial floating accent shapes */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-soft-blossom/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-soft-wisteria/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Philosophy block and magazine callout */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-petal-pink font-semibold block">
              06 / Academic Inquiry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum leading-tight">
              Research & Future <span className="font-script text-petal-pink text-4xl sm:text-5xl italic font-normal">Endeavors</span>
            </h2>
            <div className="w-16 h-1 bg-petal-pink mt-4 rounded-full" />

            <p className="font-sans text-sm sm:text-base text-deep-plum/80 leading-relaxed pt-2">
              My engineering education forms the engine, but curiosity feeds the fuel. I suspect that the next great paradigm shifts in software design will not only focus on faster execution speeds, but on creating accessible, inclusive cognitive models.
            </p>

            {/* Cozy quotation callout card */}
            <div className="bg-soft-blossom/20 border border-petal-pink/20 p-6 rounded-xl-editorial shadow-xs relative">
              <Quote className="absolute -top-3 -left-2 w-8 h-8 text-petal-pink/30 stroke-[3px]" />
              <p className="font-serif italic text-base text-mulberry leading-relaxed">
                "We represent code as dynamic flows. When compilers are structured visually, the translation of instructions transitions from a dry mechanism to a story of flow."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-petal-pink/20 flex items-center justify-center">
                  <span className="text-petal-pink font-serif text-[10px]">✿</span>
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-rose-ink">Research thesis proposal, 2026</span>
              </div>
            </div>
          </div>

          {/* Right: Listed specific areas with beautiful icons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-6">
              {researchItems.map((interest, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  key={interest.id}
                  className="bg-ivory border border-thistle/45 hover:border-petal-pink/30 p-6 rounded-lg shadow-xs flex gap-5 items-start sticker-shadow-hover"
                >
                  <div className="w-12 h-12 rounded-full bg-soft-wisteria text-rose-ink flex items-center justify-center border border-petal-pink/15 shrink-0">
                    {getIcon(interest.iconName)}
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-lg text-deep-plum">
                      {interest.title}
                    </h4>
                    <p className="font-sans text-sm text-deep-plum/80 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
