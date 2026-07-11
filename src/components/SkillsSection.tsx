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
import { getSkills } from '../api/portfolioApi';
import type { SkillCategory } from '../types';

// Custom technical commentary from Pelin's computer engineering experience
const skillCommentaries: Record<string, { note: string; project: string; depth: string; fact: string }> = {
  'TypeScript / JS': {
    note: "I use TypeScript and JavaScript for typed React components, API wiring, frontend behavior, and browser-based interactions.",
    project: "Portfolio UI, AuraBoard, Frantic Barista",
    depth: "Expert (95%)",
    fact: "Shows I can connect interface state, data from APIs, and interactive client-side logic."
  },
  'Rust': {
    note: "Studied as part of systems-level programming interests, memory safety, and low-level architecture exploration.",
    project: "Systems learning track",
    depth: "Familiar (75%)",
    fact: "Connects ownership and borrowing concepts to safer systems design."
  },
  'Python': {
    note: "My primary engine for matrix manipulations, supervised machine learning pipelines, text processing, and data filtering.",
    project: "Music Genre Classifier & Generative XAI ADHD-EEG",
    depth: "Fluent (88%)",
    fact: "Supports model training, feature extraction, and research-oriented data workflows."
  },
  'C / C++': {
    note: "My foundation in low-level systems. Guided over 90 students on pointers, raw memory blocks, and balanced trees.",
    project: "Data Structures Course Assistant",
    depth: "Fluent (85%)",
    fact: "Executed manual malloc leak verification using Valgrind."
  },
  'SQL': {
    note: "Designing third-normal-form relation structures, normal schemas, row index plans, and fast execution queries.",
    project: "AstraSoft Databases",
    depth: "Fluent (80%)",
    fact: "Optimized complex multi-table JOINs to reduce index scan latencies."
  },
  'Node.js / Express': {
    note: "Structuring modular API routers, custom error-handling middlewares, and low-latency microservice interfaces.",
    project: "Overengineering Detector Engine",
    depth: "Expert (90%)",
    fact: "Coordinates repository analysis requests and scoring-service responses."
  },
  'FastAPI / Flask': {
    note: "Building modern asynchronous endpoints, strict Pydantic models, and auto-documenting schema configurations in Python.",
    project: "Python ML API practice",
    depth: "Fluent (85%)",
    fact: "Useful for serving lightweight model inference and experiment endpoints."
  },
  'gRPC & Protocol Buffers': {
    note: "Designing protobuf schemas for type-safe, lightweight, and language-independent client-server network routing.",
    project: "Backend systems study",
    depth: "Familiar (70%)",
    fact: "Builds intuition for strict API contracts and efficient service boundaries."
  },
  'RESTful Architecture': {
    note: "Designing clean endpoint parameters, safe headers, stateless tokens, and precise HTTP method integrity.",
    project: "Backend API cohorts",
    depth: "Expert (95%)",
    fact: "Standardized rate-limiting schemes for security cohorts."
  },
  'React 19 & Next.js': {
    note: "Building cohesive web interfaces using functional architectures, responsive rendering hooks, and component scopes.",
    project: "Portfolio UI and AuraBoard frontend",
    depth: "Expert (92%)",
    fact: "Connects backend data to polished, responsive portfolio and app screens."
  },
  'Tailwind CSS v4': {
    note: "Transforming high-fidelity mockups into polished, responsive, and tactile layouts using custom CSS theme tokens.",
    project: "Feminine magazine designs",
    depth: "Expert (95%)",
    fact: "Employs modern CSS-first theme variables for rapid UI load times."
  },
  'Figma Prototyping': {
    note: "Drafting user flows, selecting editorial palettes, arranging negative space, and designing custom interactive elements.",
    project: "CozyHacks STEM wireframes",
    depth: "Fluent (80%)",
    fact: "Built structured responsive grids and unified design styles."
  },
  'Motion / Framer Motion': {
    note: "Breathing a warm, cozy soul into sterile tech through staggered entries, spring layouts, and physical feedback loops.",
    project: "Tactile web assets",
    depth: "Fluent (85%)",
    fact: "Synchronizes layout shifts using spring-physics coordinates."
  },
  'PostgreSQL': {
    note: "My relational system of choice. Tuning query executions, configuring row indexes, and managing database connection pools.",
    project: "AstraSoft Internship",
    depth: "Expert (90%)",
    fact: "Designed transactional schemas with strict integrity rules."
  },
  'RocksDB / LevelDB': {
    note: "Experimenting with embedded log-structured merge trees (LSM), block caches, and persistent raw key-value storage.",
    project: "Storage systems study",
    depth: "Familiar (75%)",
    fact: "Sharpens database internals knowledge beyond ordinary ORM usage."
  },
  'Redis Cache Layer': {
    note: "Employing standard cache-aside design strategies to decrease database read cycles and host rapid sessions.",
    project: "AstraSoft API pipelines",
    depth: "Fluent (85%)",
    fact: "Reduced bulk export endpoint latency by 3x with caching."
  },
  'MongoDB / JSON Stores': {
    note: "Using document arrays to save flexible schemas, micro-journals, and unstructured state-machine records.",
    project: "CozyHacks storage schemas",
    depth: "Fluent (80%)",
    fact: "Optimized complex nested sub-document pipeline queries."
  },
  'scikit-learn Classifier': {
    note: "Preparing feature vectors, cleaning datasets, training classifiers, and evaluating baseline model behavior.",
    project: "Music Genre Classifier",
    depth: "Fluent (82%)",
    fact: "Builds the baseline modeling instincts that support deeper learning experiments."
  },
  'Pandas & NumPy Stack': {
    note: "Parsing tabular statistics, vectorizing operations, and managing large matrix arrays for analytical computation.",
    project: "Undergrad ML coursework",
    depth: "Expert (90%)",
    fact: "Eliminated Python loop overflows with high-performance vectors."
  },
  'PyTorch Basics': {
    note: "Exploring linear layers, training cycles, backpropagation formulas, activation functions, and tensor arithmetic.",
    project: "Introductory ML models",
    depth: "Familiar (65%)",
    fact: "Designed small feed-forward networks for handwritten digit tests."
  },
  'Data Visualisation (D3 / Recharts)': {
    note: "Generating custom charts, dependency maps, and visual summaries for technical analysis results.",
    project: "Overengineering Detector Engine",
    depth: "Fluent (85%)",
    fact: "Turns structural analysis into readable diagrams and comparison views."
  },
  'Git & GitHub Actions': {
    note: "Managing source integrity, rebase workflows, and writing automated CI scripts to check compilation steps.",
    project: "Collaborative STEM cohorts",
    depth: "Expert (90%)",
    fact: "Scripts custom triggers to lint, format, and build on commits."
  },
  'Docker Containerization': {
    note: "Isolating web microservices, preparing multi-stage builds, and configuring predictable server environments.",
    project: "FastAPI server containers",
    depth: "Fluent (80%)",
    fact: "Reduced Docker image sizes by utilizing alpine-based stages."
  },
  'Linux Command Line': {
    note: "Working with bash environments, standard piping utilities, automation scripts, and server configuration registers.",
    project: "Daily systems workspace",
    depth: "Expert (90%)",
    fact: "Automates diagnostic checks via custom shell procedures."
  },
  'Vite & Bundler Systems': {
    note: "Setting up lightweight dev servers, resolving custom paths, tree-shaking dead code, and optimizing build distributions.",
    project: "Modern web layouts",
    depth: "Expert (92%)",
    fact: "Customizes asset routing paths for fast browser loads."
  }
};

// Map the API categories to the labels used in the portfolio.
const categoryTabs = [
  { label: 'All Skills', value: 'all' },
  { label: 'Languages', value: 'Languages' },
  { label: 'Backend', value: 'Backend Systems' },
  { label: 'Frontend & UI', value: 'Frontend & Design' },
  { label: 'Databases & Cache', value: 'Databases & Cache' },
  { label: 'AI & Data Science', value: 'AI & Data Science' },
  { label: 'Tools', value: 'Tools & DevOps' },
] as const;

export default function SkillsSection() {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('TypeScript / JS');
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(skillsData);

  // Flat list of all skills populated by category
  useEffect(() => {
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
      case 'Languages':
        return <Braces className="w-4 h-4 text-petal-pink" />;
      case 'Backend Systems':
        return <Database className="w-4 h-4 text-[#9580D4]" />;
      case 'Frontend & Design':
        return <Layout className="w-4 h-4 text-rose-ink" />;
      case 'Databases & Cache':
        return <Cpu className="w-4 h-4 text-sky-reflection" />;
      case 'AI & Data Science':
        return <Sparkles className="w-4 h-4 text-bright-lavender" />;
      default:
        return <Sliders className="w-4 h-4 text-deep-plum" />;
    }
  };

  const activeCommentary = skillCommentaries[selectedSkill] || {
    note: "Building practical software with clear data flow and maintainable implementation choices.",
    project: "Engineering Portfolio",
    depth: "Proficient",
    fact: "Connects the skill to projects, coursework, and hands-on implementation."
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT PANEL: Interactive Skill Tag Cloud Workspace (Ivory paper panel) */}
          <div className="lg:col-span-8 bg-ivory border border-[#CDB9DD] p-6 md:p-8 rounded-xl-editorial shadow-sm flex flex-col justify-between">
            
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
              <div className="absolute top-2 right-2 opacity-5 pointer-events-none font-serif text-6xl select-none">
                âœ
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#CDB9DD]/35 pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-petal-pink" />
                  <span className="font-serif font-bold text-sm text-deep-plum">
                    Engineering Memo: {selectedSkill}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-[9px] uppercase tracking-wider bg-rose-ink/10 text-rose-ink px-2 py-0.5 rounded">
                    Practical Proficiency: {activeCommentary.depth}
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

          {/* RIGHT PANEL: concise engineering approach */}
          <div className="lg:col-span-4 bg-mulberry text-ivory border border-deep-plum p-6 md:p-8 rounded-xl-editorial shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(#DEAFC2_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            <div className="relative z-10 flex h-full flex-col gap-6">
              <div>
                <p className="font-mono text-[10px] tracking-wider text-soft-blossom uppercase">Working principles</p>
                <h3 className="mt-3 font-serif text-2xl font-bold leading-tight">How I build</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/80">
                  I prefer understandable systems: a clear interface, an explicit data flow, and a testable backend boundary.
                </p>
              </div>

              <div className="space-y-4 border-t border-white/15 pt-5">
                {[
                  ['Start with the user flow', 'Define the screen state and the API contract before adding visual polish.'],
                  ['Keep boundaries explicit', 'Separate browser concerns from server logic and protect authenticated routes.'],
                  ['Measure before optimizing', 'Use real loading or interaction evidence before adding caching or complexity.'],
                ].map(([title, description]) => (
                  <div key={title} className="flex gap-3">
                    <Circle className="mt-1 h-2.5 w-2.5 shrink-0 text-petal-pink" fill="currentColor" />
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-ivory">{title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-ivory/70">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}



