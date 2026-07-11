/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Star, Trophy, Sparkles } from 'lucide-react';
import { achievements } from '../data';

export default function AwardsSection() {
  
  const getIcon = (badge?: string) => {
    if (badge?.includes('Academic')) return <Trophy className="w-5 h-5 text-rose-ink" />;
    if (badge?.includes('STEM')) return <Sparkles className="w-5 h-5 text-soft-periwinkle" />;
    return <Award className="w-5 h-5 text-petal-pink" />;
  };

  return (
    <section id="achievements" className="py-24 bg-soft-wisteria relative overflow-hidden">
      {/* Background elegant details */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-soft-blossom/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-10 w-96 h-96 rounded-full bg-bright-lavender/15 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-petal-pink font-semibold">
            05 / Academic Laudations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mt-2">
            Laurels & <span className="font-script text-petal-pink text-4xl sm:text-5xl italic font-normal">Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-petal-pink mt-4 rounded-full mx-auto" />
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {achievements.map((ach, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              key={ach.id}
              className="bg-ivory border border-thistle/45 hover:border-petal-pink/30 rounded-xl-editorial p-8 shadow-xs sticker-shadow-hover flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Stamp Ribbon Top row */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-soft-wisteria flex items-center justify-center border border-petal-pink/15">
                    {getIcon(ach.badge)}
                  </div>
                  <span className="font-mono text-[9px] uppercase font-bold text-rose-ink bg-rose-ink/5 border border-rose-ink/10 px-2.5 py-1 rounded-full">
                    {ach.year}
                  </span>
                </div>

                {/* Content block */}
                <div>
                  <h4 className="font-serif font-bold text-lg text-deep-plum leading-snug">
                    {ach.title}
                  </h4>
                  <span className="block font-mono text-[10px] text-deep-plum/40 uppercase mt-1 tracking-wider">
                    Issued by {ach.issuer}
                  </span>
                </div>

                <p className="font-sans text-sm text-deep-plum/85 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Gilded Seal Style Tag on Bottom corner */}
              <div className="mt-8 pt-4 border-t border-thistle/20 flex items-center justify-between text-[11px] font-mono text-petal-pink uppercase font-semibold">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-petal-pink" />
                  {ach.badge}
                </span>
                <span className="text-deep-plum/30">✿</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
