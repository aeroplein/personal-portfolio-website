/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, ExternalLink, Terminal, ChevronDown, ChevronUp, Cpu, Flame, Code2 } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';
import { getProjects, hasPortfolioApi } from '../api/portfolioApi';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<string>('all');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [projectItems, setProjectItems] = useState<Project[]>(projects);

  useEffect(() => {
    if (!hasPortfolioApi) return;

    getProjects()
      .then(setProjectItems)
      .catch((error) => {
        console.warn('Using static project data because the backend is unavailable.', error);
      });
  }, []);

  const filteredProjects = projectItems.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const categories = [
    { label: 'All Projects', value: 'all' },
    ...Array.from(new Set(projectItems.map((project) => project.category))).map((category) => ({
      label: category,
      value: category,
    })),
  ];

  const getSnippetExtension = (project: Project) => {
    const firstTag = project.tags[0]?.toLowerCase() ?? '';

    if (firstTag.includes('python')) return 'py';
    if (firstTag.includes('java')) return 'java';
    if (firstTag.includes('c++')) return 'hpp';
    if (firstTag.includes('c#')) return 'cs';
    if (firstTag.includes('typescript')) return 'ts';
    if (firstTag.includes('node') || firstTag.includes('javascript')) return 'js';
    return 'txt';
  };

  // Map database colors to actual tailwind classes or background hexes
  const getCardBg = (color: Project['cardColor']) => {
    switch (color) {
      case 'ivory':
        return 'bg-ivory border-thistle/40 text-deep-plum';
      case 'soft-wisteria':
        return 'bg-soft-wisteria border-bright-lavender/30 text-deep-plum';
      case 'soft-blossom':
        return 'bg-soft-blossom border-petal-pink/20 text-deep-plum';
      default:
        return 'bg-ivory border-thistle/40 text-deep-plum';
    }
  };

  return (
    <section id="projects" className="py-24 bg-lilac-mist relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-petal-pink font-semibold">
            02 / Engineering Notebook
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mt-2">
            Featured <span className="font-script text-petal-pink text-4xl sm:text-5xl italic font-normal">Creations</span>
          </h2>
          <p className="font-sans text-sm text-mulberry/80 mt-2 max-w-xl mx-auto">
            A handpicked selection of compiled projects showcasing systems integrity, algorithmic depth, and aesthetic layout patterns.
          </p>
          <div className="w-16 h-1 bg-petal-pink mt-4 rounded-full mx-auto" />
        </div>

        {/* Custom Magazine Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setFilter(cat.value);
                setExpandedCode(null);
              }}
              className={`px-5 py-2 rounded-full font-serif font-medium text-sm transition-all cursor-pointer ${
                filter === cat.value
                  ? 'bg-mulberry text-ivory shadow-md mt-0 font-semibold'
                  : 'bg-ivory text-deep-plum/80 border border-thistle/40 hover:bg-soft-wisteria'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-12 space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isCodeOpen = expandedCode === project.id;
                const cardStyle = getCardBg(project.cardColor);
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    key={project.id}
                    className={`rounded-xl-editorial border p-8 md:p-10 shadow-xs sticker-shadow-hover relative overflow-hidden flex flex-col ${cardStyle}`}
                  >
                    {/* Background Subtle Floral Watermark */}
                    <div className="absolute top-4 right-4 opacity-[0.06] text-9xl font-serif pointer-events-none -mr-4 select-none">
                      ✿
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                      
                      {/* Left: Project Metadata & Description */}
                      <div className="lg:col-span-7 space-y-5">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="font-mono text-[10px] uppercase bg-deep-plum/5 text-deep-plum px-2.5 py-1 rounded-full font-semibold">
                            {project.category}
                          </span>
                          <span className="font-mono text-[10px] uppercase text-rose-ink/80 px-2.5 py-1 bg-rose-ink/5 rounded-full border border-rose-ink/15">
                            Role: {project.role}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-deep-plum">
                          {project.title}
                        </h3>

                        <p className="font-sans text-base text-deep-plum/80 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Takeaway Block */}
                        <div className="bg-ivory/55 border-l-4 border-rose-ink p-4 rounded-r-lg">
                          <span className="block font-mono text-[10px] uppercase font-bold tracking-wider text-rose-ink">
                            Engineering Takeaway:
                          </span>
                          <p className="text-sm font-sans text-deep-plum/85 mt-1 leading-relaxed italic">
                            {project.takeaway}
                          </p>
                        </div>

                        {/* Tech Stack Tags Grid */}
                        <div className="space-y-2">
                          <span className="block font-mono text-[10px] uppercase text-deep-plum/50">Tech Stack:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono text-[10px] bg-ivory text-deep-plum px-2.5 py-1 rounded border border-thistle/45"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA / Action Buttons */}
                        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="inline-flex w-full items-center justify-center gap-1.5 bg-mulberry hover:bg-rose-ink text-ivory px-4 py-2 rounded-full font-serif font-medium text-xs tracking-wide transition-all shadow-sm cursor-pointer sm:w-auto"
                            >
                              <FolderGit2 className="w-3.5 h-3.5 text-soft-blossom" />
                              <span>Source Code</span>
                            </a>
                          )}

                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="inline-flex w-full items-center justify-center gap-1.5 bg-ivory/85 border border-thistle/60 hover:bg-soft-wisteria text-deep-plum px-4 py-2 rounded-full font-sans font-semibold text-xs tracking-wide transition-all cursor-pointer sm:w-auto"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-petal-pink" />
                              <span>Live Canvas</span>
                            </a>
                          )}

                          {project.snippet && (
                            <button
                              onClick={() => setExpandedCode(isCodeOpen ? null : project.id)}
                              className="inline-flex w-full items-center justify-center gap-1.5 bg-bright-lavender/15 border border-bright-lavender/40 hover:bg-bright-lavender/30 text-rose-ink px-4 py-2 rounded-full font-mono text-xs font-semibold cursor-pointer sm:ml-auto sm:w-auto"
                            >
                              <Terminal className="w-3.5 h-3.5 text-petal-pink" />
                              <span>{isCodeOpen ? 'Hide Code' : 'Peek Logic'}</span>
                              {isCodeOpen ? (
                                <ChevronUp className="w-3 h-3 text-petal-pink" />
                              ) : (
                                <ChevronDown className="w-3 h-3 text-petal-pink" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Code Block Visualizer Panel */}
                      <div className="lg:col-span-5 h-full flex flex-col justify-stretch">
                        <div className="bg-deep-plum text-ivory rounded-xl p-5 border border-mulberry/80 h-full min-h-[220px] flex flex-col shadow-inner relative justify-between">
                          <div className="absolute top-2 right-2 flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-soft-blossom" />
                            <span className="w-2 h-2 rounded-full bg-bright-lavender" />
                            <span className="w-2 h-2 rounded-full bg-sky-reflection" />
                          </div>

                          <div className="flex items-center gap-2 border-b border-ivory/10 pb-2 mb-3">
                            <Terminal className="w-4 h-4 text-petal-pink" />
                            <span className="font-mono text-[10px] tracking-wider text-ivory/60">
                              snippet_preview.{getSnippetExtension(project)}
                            </span>
                          </div>

                          <div className="font-mono text-xs h-[180px] overflow-y-auto pr-1 text-ivory/90 leading-relaxed scrollbar-thin select-all">
                            <pre className="text-[11px]">
                              {project.snippet}
                            </pre>
                          </div>

                          <div className="border-t border-ivory/10 pt-2.5 mt-2 flex items-center justify-between font-mono text-[9px] text-ivory/50">
                            <span className="flex items-center gap-1 text-rose-ink">
                              <Code2 className="w-3 h-3 text-petal-pink" /> UTF-8
                            </span>
                            <span>Line 15 • Col 4</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Interactive Expandable Detailed Code (For screen-reader/detailed users) */}
                    <AnimatePresence>
                      {isCodeOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mt-6 pt-6 border-t border-deep-plum/10 overflow-hidden"
                        >
                          <h4 className="font-serif font-bold text-sm text-deep-plum mb-2">
                            Implementation Context
                          </h4>
                          <p className="font-sans text-xs text-deep-plum/70 leading-relaxed mb-4 max-w-3xl">
                            This snippet highlights one representative part of the project architecture, from backend authorization and data flow to model logic, analysis services, or interactive state handling.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
