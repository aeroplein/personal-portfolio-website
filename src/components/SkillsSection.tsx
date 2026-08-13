/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Braces, 
  Database, 
  Layout, 
  Sparkles, 
  Sliders, 
  Cpu, 
  Laptop, 
  Code2,
  Circle
} from 'lucide-react';
import { skillsData } from '../data';
import { getSkills, hasPortfolioApi } from '../api/portfolioApi';
import type { SkillCategory } from '../types';

// Custom technical commentary from Pelin's computer engineering experience
const skillCommentaries: Record<string, { note: string; project: string; depth: string; fact: string }> = {
  Java: {
    note: 'I use Java to practice object-oriented programming, backend concepts, and structured application design.',
    project: 'CodeYourTree and coursework',
    depth: 'Fluent',
    fact: 'Supports clear, maintainable application logic.'
  },
  Python: {
    note: 'I use Python for data work, machine learning experiments, and research-oriented programming.',
    project: 'Music Genre Detection and AI research work',
    depth: 'Fluent',
    fact: 'Supports data preparation, model experiments, and analysis.'
  },
  'C / C++': {
    note: 'I use C and C++ for systems programming, data structures, and memory-aware implementation.',
    project: 'Secure SSH Tunneling Simulation Engine',
    depth: 'Fluent',
    fact: 'Builds a strong foundation in lower-level programming.'
  },
  'Node.js': {
    note: 'I use Node.js to build server-side functionality and connect applications to APIs and data.',
    project: 'Overengineering Detector',
    depth: 'Fluent',
    fact: 'Supports practical backend and service development.'
  },
  Express: {
    note: 'I use Express to organize routes, request handling, and API responses in Node.js applications.',
    project: 'Overengineering Detector',
    depth: 'Fluent',
    fact: 'Keeps backend endpoints structured and understandable.'
  },
  'REST APIs': {
    note: 'I design and work with REST APIs to connect frontend interfaces, backend logic, and databases.',
    project: 'Portfolio API and full-stack projects',
    depth: 'Fluent',
    fact: 'Connects application features through clear HTTP contracts.'
  },
  HTML: {
    note: 'I use HTML to structure accessible, semantic web interfaces.',
    project: 'Portfolio and web projects',
    depth: 'Fluent',
    fact: 'Provides the foundation for clear web content.'
  },
  CSS: {
    note: 'I use CSS to create responsive, polished interfaces with attention to layout and visual clarity.',
    project: 'Portfolio and web projects',
    depth: 'Fluent',
    fact: 'Turns structure into a useful, enjoyable experience.'
  },
  PostgreSQL: {
    note: 'I use PostgreSQL for relational data modeling, queries, and persistent application data.',
    project: 'AuraBoard and CodeYourTree',
    depth: 'Fluent',
    fact: 'Supports reliable relational data storage.'
  },
  'Microsoft SQL Server': {
    note: 'I use Microsoft SQL Server for relational database design and SQL querying.',
    project: 'Database coursework',
    depth: 'Fluent',
    fact: 'Strengthens practical SQL and data-modeling skills.'
  },
  Pandas: {
    note: 'I use Pandas for cleaning, exploring, and preparing datasets for analysis and machine learning.',
    project: 'Data science coursework and experiments',
    depth: 'Fluent',
    fact: 'Makes tabular data easier to inspect and transform.'
  },
  PyTorch: {
    note: 'I use PyTorch to explore neural-network ideas and implement deep-learning experiments.',
    project: 'Generative XAI ADHD-EEG project',
    depth: 'Fluent',
    fact: 'Supports hands-on research and model experimentation.'
  },
  TensorFlow: {
    note: 'I use TensorFlow for machine-learning workflows and model experimentation.',
    project: 'Music Genre Detection',
    depth: 'Fluent',
    fact: 'Supports end-to-end model development and evaluation.'
  }
};

// Map the API categories to the labels used in the portfolio.
const categoryTabs = [
  { label: 'All Skills', value: 'all' },
  { label: 'Protecting Boundaries', value: 'Protecting Boundaries' },
  { label: 'Persistent State', value: 'Modeling Persistent State' },
  { label: 'Data Flow', value: 'Understanding Data Flow' },
  { label: 'Data & Models', value: 'Evaluating Data & Models' },
  { label: 'Visible Behavior', value: 'Making Behavior Visible' },
] as const;

export default function SkillsSection() {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('C#');
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(skillsData);

  // Flat list of all skills populated by category
  useEffect(() => {
    if (!hasPortfolioApi) return;

    getSkills()
      .then(setSkillCategories)
      .catch((error) => {
        console.warn('Using static skill data because the backend is unavailable.', error);
      });
  }, []);

  const allSkillsList = useMemo(
    () => skillCategories.flatMap((cat) =>
      cat.skills.map((s) => ({
      ...s,
      categoryName: cat.category,
      categoryLabel: categoryTabs.find(tab => tab.value === cat.category)?.label || 'Tech'
      }))
    ),
    [skillCategories],
  );

  const displayedSkills = useMemo(
    () => selectedTab === 'all'
      ? allSkillsList
      : allSkillsList.filter((skill) => skill.categoryName === selectedTab),
    [allSkillsList, selectedTab],
  );

  // Automatically switch active commentary if selected skill isn't in filtered list
  useEffect(() => {
    const isCurrentInList = displayedSkills.some(s => s.name === selectedSkill);
    if (!isCurrentInList && displayedSkills.length > 0) {
      setSelectedSkill(displayedSkills[0].name);
    }
  }, [displayedSkills, selectedSkill]);

  // Get matching icons for category types
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Protecting Boundaries':
        return <Braces className="w-4 h-4 text-petal-pink" />;
      case 'Modeling Persistent State':
        return <Database className="w-4 h-4 text-[#9580D4]" />;
      case 'Making Behavior Visible':
        return <Layout className="w-4 h-4 text-rose-ink" />;
      case 'Understanding Data Flow':
        return <Cpu className="w-4 h-4 text-sky-reflection" />;
      case 'Evaluating Data & Models':
        return <Sparkles className="w-4 h-4 text-bright-lavender" />;
      default:
        return <Sliders className="w-4 h-4 text-deep-plum" />;
    }
  };

  const activeCommentary = skillCommentaries[selectedSkill] || {
    note: "I use this in projects, coursework, or experiments where its responsibility is visible in the system.",
    project: "Projects, coursework, and experiments",
    depth: "Project use",
    fact: "The toolkit is organized by engineering responsibility rather than a proficiency score."
  };

  return (
    <section id="skills" className="py-24 bg-soft-wisteria relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-petal-pink font-semibold">
            03 / Tooling & Logic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mt-2">
            Technical <span className="font-script text-petal-pink text-4xl sm:text-5xl italic font-normal">Syllabus</span>
          </h2>
          <div className="w-16 h-1 bg-petal-pink mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Bento Grid layout */}
        <div>
          
          {/* LEFT PANEL: Interactive Skill Tag Cloud Workspace (Ivory paper panel) */}
          <div className="bg-ivory border border-[#CDB9DD] p-6 md:p-8 rounded-xl-editorial shadow-sm flex flex-col justify-between">
            
            <div>
              {/* Category selectors */}
              <div className="border-b border-[#CDB9DD]/35 pb-5 mb-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-deep-plum flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-petal-pink" />
                    <span>Technical Toolkit</span>
                  </h3>
                  <p className="font-sans text-xs text-deep-plum/60 mt-1">
                    Select a discipline to see the tools I can explain and connect to real project work.
                  </p>
                </div>
              </div>

              {/* Responsive custom horizontal scroll category tabs */}
              <div className="flex flex-wrap gap-2 pb-2 mb-6 select-none">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedTab(tab.value)}
                    className={`shrink-0 px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                      selectedTab === tab.value
                        ? 'bg-mulberry border-mulberry text-ivory shadow-xs font-bold'
                        : 'bg-[#EEE5F7]/30 border-[#CDB9DD]/50 text-deep-plum/80 hover:bg-[#EEE5F7]/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tag Cloud Arena */}
              <div className="relative bg-[#EEE5F7]/25 border border-[#CDB9DD]/30 rounded-xl p-5 mb-6 overflow-hidden">
                {/* Background soft grid lines mimicking engineering paper */}
                <div className="absolute inset-0 bg-[radial-gradient(#CDB9DD_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {displayedSkills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;

                    return (
                      <motion.button
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill.name)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className={`min-h-14 px-4 py-3 rounded-lg font-sans text-sm font-semibold tracking-wide border transition-colors duration-200 cursor-pointer grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-left shadow-[0_2px_8px_rgba(90,40,72,0.02)] ${
                          isSelected
                            ? 'bg-[#D480BB] border-[#D480BB] text-ivory shadow-md shadow-[#D480BB]/15'
                            : 'bg-ivory border-[#A775C9] text-deep-plum hover:bg-[#A775C9] hover:text-ivory hover:border-[#A775C9] hover:shadow-md'
                        }`}
                      >
                        <Circle className="row-span-2 h-3 w-3 opacity-70" fill="currentColor" />
                        <span className="min-w-0 leading-tight">{skill.name}</span>
                        {selectedTab === 'all' && (
                          <span className="min-w-0 truncate text-[10px] font-medium opacity-65">
                            {skill.categoryLabel}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* EXPANDABLE ENGINEERING MEMO: Tactile handwritten notepad style */}
            <div className="bg-soft-blossom/20 border-l-4 border-petal-pink p-5 rounded-r-lg relative overflow-hidden shadow-xs">
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#CDB9DD]/35 pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-petal-pink" />
                  <span className="font-serif font-bold text-sm text-deep-plum">
                    Engineering Memo: {selectedSkill}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-[9px] uppercase tracking-wider bg-rose-ink/10 text-rose-ink px-2 py-0.5 rounded">
                    Evidence: Project use
                  </span>
                </div>
              </div>

              <p className="font-sans text-sm text-deep-plum/85 leading-relaxed italic">
                "{activeCommentary.note}"
              </p>

              {/* Metadata ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#CDB9DD]/20 font-mono text-[10px] text-deep-plum/60">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#9580D4] font-bold">Used in:</span>
                  <span className="text-deep-plum font-semibold underline decoration-[#CDB9DD]">{activeCommentary.project}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#9580D4] font-bold">Shows:</span>
                  <span className="text-deep-plum/85 italic">{activeCommentary.fact}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
