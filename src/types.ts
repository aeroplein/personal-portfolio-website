/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  github?: string;
  demo?: string;
  takeaway: string;
  cardColor: 'ivory' | 'soft-wisteria' | 'soft-blossom';
  category: string;
  snippet?: string; // a short elegant code snippet for computer engineering charm
}

export interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'experience' | 'milestone';
  skills?: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: 'familiar' | 'fluent' | 'expert' }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  issuer: string;
  year: string;
  badge?: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface JournalArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  mood: string;
  slug?: string;
  sections?: JournalArticleSection[];
  pullQuote?: string;
}
