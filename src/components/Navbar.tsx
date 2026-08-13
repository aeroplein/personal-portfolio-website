/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, FileText, Heart } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const resumeUrl = `${import.meta.env.BASE_URL}Pelin-Zeynep-Kaya-Resume.pdf`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link calculation
      const sections = ['home', 'about', 'projects', 'skills', 'journey', 'achievements', 'journal', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Journey', id: 'journey' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Journal', id: 'journal' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-lilac-mist/98 backdrop-blur-md py-4 border-b border-thistle/20 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo area */}
        <button
          onClick={() => handleLinkClick('home')}
          className="group flex items-center gap-2 cursor-pointer text-left"
        >
          <div className="w-10 h-10 rounded-full bg-soft-blossom/80 flex items-center justify-center border border-petal-pink/40 shadow-sm group-hover:scale-105 transition-all">
            <span className="font-serif italic font-bold text-deep-plum text-lg">p</span>
          </div>
          <div>
            <span className="font-serif font-semibold text-deep-plum tracking-tight text-lg block">
              pelin zeynep
            </span>
            <span className="font-mono text-[10px] text-petal-pink tracking-widest uppercase block -mt-1 group-hover:text-rose-ink transition-colors">
              comp. eng ✿
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          <ul className="flex items-center gap-5 xl:gap-8 font-sans font-medium text-sm text-deep-plum">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors hover:text-petal-pink ${
                    activeSection === item.id ? 'text-petal-pink' : 'text-deep-plum/80'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-petal-pink rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Pelin Zeynep Kaya's resume as a PDF"
            className="flex items-center gap-2 bg-gradient-to-br from-[#DEAFC2] via-[#D480BB] to-[#A775C9] text-[#F4F7EA] border border-[#F4F7EA]/45 px-4 py-2 rounded-full font-serif font-medium text-sm tracking-wide shadow-[0_12px_28px_rgba(212,128,187,0.22)] hover:shadow-[0_16px_32px_rgba(212,128,187,0.32)] hover:-translate-y-[2px] hover:brightness-105 active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#F4F7EA]" />
            Get Resume
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-soft-wisteria transition-colors text-deep-plum"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer drop-down */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-lilac-mist/95 backdrop-blur-lg border-b border-thistle/40 py-6 px-6 shadow-xl flex flex-col gap-6 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col gap-4 font-sans font-medium text-base text-deep-plum text-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full py-1.5 rounded-lg active:bg-soft-wisteria/60 ${
                    activeSection === item.id ? 'text-petal-pink font-semibold bg-soft-wisteria/40' : 'text-deep-plum/80'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center border-t border-thistle/30 pt-4 gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Pelin Zeynep Kaya's resume as a PDF"
              onClick={() => setIsOpen(false)}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-br from-[#DEAFC2] via-[#D480BB] to-[#A775C9] text-[#F4F7EA] border border-[#F4F7EA]/45 py-2.5 rounded-full font-serif font-medium text-sm text-center shadow-[0_12px_28px_rgba(212,128,187,0.22)] hover:shadow-[0_16px_32px_rgba(212,128,187,0.32)] hover:-translate-y-[2px] hover:brightness-105 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#F4F7EA]" />
              Get Resume
            </a>
            <p className="font-sans text-xs text-deep-plum/50 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-petal-pink fill-petal-pink" /> in 2026
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
