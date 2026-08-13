/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import JourneyTimeline from './components/JourneyTimeline';
import AwardsSection from './components/AwardsSection';
import JournalSection from './components/JournalSection';
import InterestsSection from './components/InterestsSection';
import ContactSection from './components/ContactSection';
import JournalEntryPage from './components/JournalEntryPage';
import { journalEntries } from './data';

const PORTFOLIO_TITLE = 'Pelin Zeynep Kaya Portfolio';

function readHash() {
  return window.location.hash || '#home';
}

function getJournalSlug(hash: string) {
  const match = /^#\/journal\/([^/]+)$/.exec(hash);
  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return '';
  }
}

export default function App() {
  const [location, setLocation] = useState(() => ({ hash: readHash(), isInitial: true }));
  const journalSlug = getJournalSlug(location.hash);
  const articleEntry = journalSlug
    ? journalEntries.find((entry) => entry.slug === journalSlug)
    : undefined;

  useEffect(() => {
    const handleHashChange = () => {
      setLocation({ hash: readHash(), isInitial: false });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (journalSlug !== null && !articleEntry) {
      window.history.replaceState(null, '', '#journal');
      setLocation((current) => ({ hash: '#journal', isInitial: current.isInitial }));
    }
  }, [articleEntry, journalSlug]);

  useEffect(() => {
    document.title = articleEntry ? `${articleEntry.title} | Pelin Zeynep Kaya` : PORTFOLIO_TITLE;
  }, [articleEntry]);

  useEffect(() => {
    if (journalSlug !== null || articleEntry) return;

    const sectionId = location.hash.startsWith('#') ? location.hash.slice(1) : '';
    if (!sectionId || sectionId.startsWith('/')) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: location.isInitial ? 'auto' : 'smooth',
        block: 'start'
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [articleEntry, journalSlug, location.hash, location.isInitial]);

  const handleNavigate = (sectionId: string) => {
    if (articleEntry || journalSlug !== null) {
      window.location.hash = sectionId;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-lilac-mist text-deep-plum font-sans antialiased overflow-x-hidden">
      
      {/* Editorial floating badge layout backdrops */}
      <div className="fixed top-0 inset-x-0 h-1.5 bg-gradient-to-r from-soft-blossom via-bright-lavender to-sky-reflection z-50" />

      {/* Styled top navbar */}
      <Navbar onNavigate={handleNavigate} />

      <main className="relative z-10">
        {articleEntry ? (
          <>
            <JournalEntryPage entry={articleEntry} />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.8 }}
            >
              <ContactSection />
            </motion.div>
          </>
        ) : (
          <>
        {/* Primary single-page content flow with staggered motion wraps */}
        {/* Section 1: Hero Cover */}
        <HeroSection onNavigate={handleNavigate} />

        {/* Section 2: Personal Identity & Manifesto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <AboutSection />
        </motion.div>

        {/* Section 3: Engineering Notebook / Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <ProjectsSection />
        </motion.div>

        {/* Section 4: Tooling & Dynamic RAM state checks */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <SkillsSection />
        </motion.div>

        {/* Section 5: Experience Schedule */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <JourneyTimeline />
        </motion.div>

        {/* Section 6: Laurels & Honors */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <AwardsSection />
        </motion.div>

        {/* Section 7: Journal / Writing Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <JournalSection />
        </motion.div>

        {/* Section 8: Future Focus Interests */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <InterestsSection />
        </motion.div>

        {/* Section 9: Interactive Letter Contact & Integrated Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <ContactSection />
        </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
