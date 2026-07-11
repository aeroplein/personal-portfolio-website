/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle, Heart, ArrowUp } from 'lucide-react';
import { submitContact } from '../api/portfolioApi';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please fill in your name, email, subject, and message before sending.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await submitContact({
        name,
        email,
        subject,
        message,
        website,
      });

      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setWebsite('');
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Message could not be sent right now.');
    }
  };

  const syncScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-mulberry text-ivory pt-24 pb-12 relative overflow-hidden">
      {/* Soft overlay patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#F4F7EA_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-rose-ink/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left: Contact Info & Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#DEAFC2] font-semibold block">
              07 / Connection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory-neutral">
              Write a <span className="font-script text-[#DEAFC2] text-4xl sm:text-5xl italic font-normal lowercase block sm:inline">digital letter</span>
            </h2>
            <div className="w-16 h-1 bg-[#D480BB] mt-4 rounded-full" />

            <p className="font-sans text-sm sm:text-base text-ivory/80 leading-relaxed max-w-md pt-2">
              Whether you are curious about my database compilation theories, want to recruit me for summer engineering cohorts, or just share a cozy tea recipe — I am always listening.
            </p>

            {/* Practical Contact Attributes */}
            <div className="space-y-4 pt-6">
              
              <a
                href="mailto:pelinzeynepkaya@gmail.com"
                className="flex items-center gap-3.5 group text-ivory/90 hover:text-[#DEAFC2] transition-colors"
                aria-label="Email Pelin"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#D480BB]/20 group-hover:border-[#D480BB]/50 transition-colors">
                  <Mail className="w-4 h-4 text-[#DEAFC2]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase text-white/40">electronic email</span>
                  <span className="block font-sans text-sm font-semibold">pelinzeynepkaya@gmail.com</span>
                </div>
              </a>

              <a
                href="https://github.com/pelinzkaya"
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-3.5 group text-ivory/90 hover:text-[#DEAFC2] transition-colors"
                aria-label="GitHub profile"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#D480BB]/20 group-hover:border-[#D480BB]/50 transition-colors">
                  <Github className="w-4 h-4 text-[#DEAFC2]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase text-white/40">compiled repositories</span>
                  <span className="block font-sans text-sm font-semibold">github.com/pelinzkaya</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/pelinzeynepkaya"
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-3.5 group text-ivory/90 hover:text-[#DEAFC2] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#D480BB]/20 group-hover:border-[#D480BB]/50 transition-colors">
                  <Linkedin className="w-4 h-4 text-[#DEAFC2]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase text-white/40">professional network</span>
                  <span className="block font-sans text-sm font-semibold">linkedin.com/in/pelinzeynepkaya</span>
                </div>
              </a>

            </div>

            {/* Mini cute digital sticker */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-lg text-center font-serif italic text-xs text-ivory/60 max-w-sm">
              ✿ "No cookie-cutter SaaS logs. Just structured compilers with soft intentions." ✿
            </div>
          </div>

          {/* Right: Immersive envelope style input card */}
          <div className="lg:col-span-7">
            <div className="bg-ivory text-deep-plum border border-thistle p-6 sm:p-8 rounded-xl-editorial shadow-xl relative">
              {/* Paper line pattern border on left of stationary */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#DEAFC2] via-[#A775C9] to-[#75ADC9] rounded-l-xl-editorial" />
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-rose-ink/10 text-rose-ink flex items-center justify-center mx-auto border border-petal-pink/30 animate-bounce">
                    <CheckCircle className="w-8 h-8 text-[#D480BB]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-deep-plum">
                    Letter Stored Safely!
                  </h3>
                  <p className="font-sans text-sm text-deep-plum/70 leading-relaxed max-w-sm mx-auto">
                    Thank you! The Spring Boot backend validated your message and stored it in the portfolio database.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-full bg-mulberry hover:bg-rose-ink text-ivory font-serif font-medium text-xs transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h4 className="font-serif font-bold text-xl text-deep-plum mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span>Write to Pelin</span>
                    <span className="text-petal-pink font-script text-2xl font-normal lowercase italic">stationery.</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="block font-mono text-[10px] uppercase font-bold text-deep-plum/50">
                        Your human name:
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Grace Hopper"
                        className="w-full bg-[#EEE5F7]/40 border border-[#CDB9DD]/60 rounded-lg px-4 py-2.5 font-sans text-sm text-deep-plum focus:outline-hidden focus:border-[#D480BB] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email-input" className="block font-mono text-[10px] uppercase font-bold text-deep-plum/50">
                        Your electronic mail:
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. grace@computing.org"
                        className="w-full bg-[#EEE5F7]/40 border border-[#CDB9DD]/60 rounded-lg px-4 py-2.5 font-sans text-sm text-deep-plum focus:outline-hidden focus:border-[#D480BB] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject-input" className="block font-mono text-[10px] uppercase font-bold text-deep-plum/50">
                      Letter subject:
                    </label>
                    <input
                      id="subject-input"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Portfolio collaboration"
                      className="w-full bg-[#EEE5F7]/40 border border-[#CDB9DD]/60 rounded-lg px-4 py-2.5 font-sans text-sm text-deep-plum focus:outline-hidden focus:border-[#D480BB] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="msg-input" className="block font-mono text-[10px] uppercase font-bold text-deep-plum/50">
                      Message letter:
                    </label>
                    <textarea
                      id="msg-input"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your thoughtful words here..."
                      className="w-full bg-[#EEE5F7]/40 border border-[#CDB9DD]/60 rounded-lg px-4 py-3 font-sans text-sm text-deep-plum focus:outline-hidden focus:border-[#D480BB] focus:bg-white transition-all"
                    />
                  </div>

                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {error && (
                    <div className="rounded-lg border border-rose-ink/20 bg-rose-ink/5 px-4 py-3 text-sm text-rose-ink font-sans">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-mulberry hover:bg-rose-ink disabled:bg-deep-plum/40 text-ivory py-3 rounded-lg font-serif font-medium text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    {loading ? (
                      <span className="font-mono text-xs animate-pulse">transmitting packets...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#DEAFC2]" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER RIBBON BLOCK */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-ivory/60 font-sans">
          
          <div className="flex flex-col md:items-start items-center gap-1.5 text-center md:text-left">
            <span className="font-serif font-bold text-xl text-ivory">pelin zeynep.</span>
            <p className="font-mono text-[10px] tracking-wider text-[#DEAFC2] uppercase">
              computer engineering student ✿ design explorer
            </p>
          </div>

          <p className="text-center font-mono text-xs text-ivory/50">
            © 2026 Pelin Zeynep Kaya. Crafted with{' '}
            <Heart className="w-3.5 h-3.5 text-[#D480BB] fill-[#D480BB] inline-block mx-0.5" /> in London/London-dev context.
          </p>

          <button
            onClick={syncScrollTop}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D480BB] hover:border-[#D480BB] text-ivory hover:text-ivory transition-all cursor-pointer hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>
      </div>
    </footer>
  );
}
