/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Calendar, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { timelineEvents } from '../data';

export default function JourneyTimeline() {
  
  const getIcon = (type: 'education' | 'experience' | 'milestone') => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-5 h-5 text-rose-ink" />;
      case 'experience':
        return <Briefcase className="w-5 h-5 text-soft-periwinkle" />;
      case 'milestone':
        return <Sparkles className="w-5 h-5 text-petal-pink" />;
      default:
        return <Star className="w-5 h-5 text-deep-plum" />;
    }
  };

  return (
    <section id="journey" className="py-24 bg-lilac-mist relative overflow-hidden">
      {/* Background soft blurs for luxury layout */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-soft-blossom/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-bright-lavender/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-petal-pink font-semibold">
            04 / Project Leadership &amp; Education
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mt-2">
            Decisions into <span className="font-script text-petal-pink text-4xl sm:text-5xl italic font-normal">delivery</span>
          </h2>
          <p className="font-sans text-sm text-mulberry/80 mt-2 max-w-xl mx-auto">
            Academic leadership and technical contribution, followed by the foundation behind the work.
          </p>
          <div className="w-16 h-1 bg-petal-pink mt-4 rounded-full mx-auto" />
        </div>

        {/* Vertical Timeline Wrapper */}
        <div className="relative border-l border-thistle/50 max-w-4xl mx-auto pl-6 sm:pl-10 space-y-12">
          
          {timelineEvents.map((event, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              key={event.id}
              className="relative"
            >
              {/* Hanging icon anchor point */}
              <div className="absolute -left-[39px] sm:-left-[55px] top-1 w-10 h-10 rounded-full bg-ivory border border-thistle/60 flex items-center justify-center shadow-xs z-10 hover:scale-110 transition-transform">
                <div className="w-8 h-8 rounded-full bg-soft-wisteria/40 flex items-center justify-center">
                  {getIcon(event.type)}
                </div>
              </div>

              {/* Layout Content Card */}
              <div className="bg-ivory border border-thistle/45 hover:border-petal-pink/40 rounded-xl-editorial p-6 sm:p-8 shadow-xs sticker-shadow-hover relative">
                {/* Visual badge top right */}
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-rose-ink/80 bg-rose-ink/5 px-2.5 py-1 rounded-full border border-rose-ink/10">
                  <Calendar className="w-3 h-3 text-petal-pink" />
                  {event.period}
                </span>

                <div className="mb-4 pr-16">
                  <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-petal-pink block">
                    {event.organization}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-deep-plum mt-1">
                    {event.title}
                  </h3>
                </div>

                <p className="font-sans text-sm sm:text-base text-deep-plum/80 leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Event Competencies / Skills Learned */}
                {event.skills && event.skills.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-thistle/15">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-deep-plum/50 font-bold">
                      Proven Competencies:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {event.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[10px] bg-soft-wisteria text-deep-plum px-3 py-1 rounded-full flex items-center gap-1 border border-petal-pink/10"
                        >
                          <CheckCircle2 className="w-3 h-3 text-petal-pink" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
