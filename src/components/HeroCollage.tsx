/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Terminal, Cpu, Sparkles, Heart } from 'lucide-react';

export default function HeroCollage() {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center">
      {/* Dreamy Gradient Glow point in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-linear-to-tr from-soft-blossom/35 via-thistle/45 to-sky-reflection/25 blur-3xl -z-10" />

      {/* Decorative floral/sticker backdrop items */}
      <div className="absolute top-4 left-10 w-8 h-8 rounded-full bg-petal-pink/15 flex items-center justify-center animate-pulse">
        <span className="text-petal-pink text-xs">✿</span>
      </div>
      <div className="absolute bottom-6 right-8 w-12 h-12 rounded-full bg-bright-lavender/10 flex items-center justify-center">
        <span className="text-bright-lavender text-lg">❀</span>
      </div>

      {/* BASE WRAPPER FOR MOTION CASCADE */}
      <div className="relative w-full max-w-[420px] h-full flex items-center justify-center">
        
        {/* Layer 1: The Code Terminal Card (A elegant notebook mockup showing backend code) */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, rotate: -1, zIndex: 30 }}
          className="absolute left-4 top-12 w-[280px] sm:w-[320px] bg-ivory rounded-xl-editorial p-5 border border-thistle/30 sticker-shadow shadow-deep-plum/5 cursor-grab active:cursor-grabbing z-10"
        >
          {/* Notebook style header rings */}
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-soft-blossom" />
            <div className="w-2.5 h-2.5 rounded-full bg-bright-lavender" />
            <div className="w-2.5 h-2.5 rounded-full bg-sky-reflection" />
            <span className="font-mono text-[9px] text-deep-plum/40 ml-auto tracking-wider">BoardsController.cs</span>
          </div>

          <div className="font-mono text-[11px] leading-relaxed text-deep-plum/90">
            <p className="text-rose-ink font-semibold">// Syncing authenticated board items</p>
            <p className="mt-1">
              <span className="text-bright-lavender">public class</span>{' '}
              <span className="text-deep-plum font-bold">BoardsController</span> &#123;
            </p>
            <p className="pl-3 text-deep-plum/70">
              service: <span className="text-rose-ink">IBoardService</span>,
            </p>
            <p className="pl-3 text-deep-plum/70">
              auth: <span className="text-rose-ink">User.GetUserId()</span>,
            </p>
            <p className="pl-3 text-deep-plum/70">
              db: <span className="text-rose-ink">PostgreSQL</span>,
            </p>
            <p className="pl-1">&#125;</p>
            <p className="mt-1">
              <span className="text-bright-lavender">async</span> SyncItems(id, items)
            </p>
            <p className="pl-3 text-deep-plum/60">
              <span className="text-soft-periwinkle font-semibold">await</span>{' '}
              UpdateZIndexAndPositionsAsync()
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-thistle/20 flex items-center justify-between text-[10px] font-sans text-deep-plum/50">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-petal-pink" />
              systems code
            </span>
            <span className="bg-bright-lavender/10 text-rose-ink px-2 py-0.5 rounded-full font-mono text-[9px]">
              csharp api
            </span>
          </div>
        </motion.div>

        {/* Layer 2: Academic Profile Sticker Card */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10, rotate: 6 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, rotate: 2, zIndex: 30 }}
          className="absolute right-2 top-28 w-[190px] sm:w-[210px] bg-soft-wisteria rounded-xl-editorial p-4 border border-petal-pink/20 sticker-shadow shadow-deep-plum/5 cursor-grab active:cursor-grabbing z-20"
        >
          <div className="relative">
            {/* Sparkle decorative pin on top block */}
            <div className="absolute -top-6 -right-2 bg-ivory text-petal-pink text-xs border border-thistle/40 p-1.5 rounded-full rotate-12 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <span className="bg-petal-pink text-ivory text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono font-bold">
              Senior ✿ Candidate
            </span>

            <h4 className="mt-2.5 font-serif font-bold text-base text-deep-plum leading-tight">
              Pelin Zeynep Kaya
            </h4>
            <p className="font-mono text-[10px] text-rose-ink mt-0.5">
              Cumulative GPA: 3.89/4.00
            </p>

            <p className="mt-3 font-sans text-xs text-deep-plum/70 leading-relaxed">
              Studying hardware interfaces & compilation layers at Computer Engineering.
            </p>

            <div className="mt-3.5 pt-2 border-t border-thistle/30 flex items-center gap-1.5 text-[9px] font-mono text-deep-plum/50">
              <div className="w-2 h-2 rounded-full bg-honeydew animate-pulse" />
              <span>currently coding...</span>
            </div>
          </div>
        </motion.div>

        {/* Layer 3: Tactile Paper Cutout: "Software with a Soul" Script text */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, rotate: -2, zIndex: 30 }}
          className="absolute -bottom-2 left-6 w-[180px] bg-soft-blossom rounded-lg p-3 border border-deep-plum/10 sticker-shadow shadow-deep-plum/6 z-25 text-center cursor-grab active:cursor-grabbing"
        >
          <h5 className="font-script text-3xl text-mulberry leading-none py-1">
            software with a soul
          </h5>
          <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-rose-ink uppercase tracking-widest mt-0.5">
            <Heart className="w-2.5 h-2.5 fill-rose-ink" />
            <span>artistic tech</span>
          </div>
        </motion.div>

        {/* Layer 4: Floating Mini Chart representing Data / ML */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -10, rotate: -3, zIndex: 30 }}
          className="absolute right-6 -bottom-6 w-[140px] bg-ivory rounded-lg p-3 border border-thistle/40 shadow-sm z-15 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[9px] text-deep-plum tracking-tight flex items-center gap-1">
              <Cpu className="w-3 h-3 text-sky-reflection" /> Sentiment model
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-petal-pink" />
          </div>

          {/* Simple Vector Flow SVG Line simulating ML curve */}
          <div className="w-full h-8 mt-1.5 flex items-end">
            <svg viewBox="0 0 100 30" width="100%" height="100%">
              <path
                d="M0,25 Q15,5 30,20 T60,5 T90,15 T100,0"
                fill="none"
                stroke="url(#gradient-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DEAFC2" />
                  <stop offset="50%" stopColor="#A775C9" />
                  <stop offset="100%" stopColor="#75ADC9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-[9px] font-sans text-deep-plum/60 text-right mt-1">Accuracy: 89.2%</p>
        </motion.div>
      </div>
    </div>
  );
}
