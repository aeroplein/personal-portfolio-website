/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TimelineEvent, SkillCategory, Achievement, ResearchInterest, JournalEntry } from './types';

export const projects: Project[] = [
  {
    id: 'auraboard',
    title: 'AuraBoard - Digital Vision Board SaaS',
    description: 'An interactive digital vision board platform built with an ASP.NET Core Web API, PostgreSQL, and a responsive Vite + React frontend. It supports custom board layouts, authenticated ownership boundaries, uploaded assets, and external media integrations.',
    tags: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'PostgreSQL', 'React', 'Vite', 'Spotify API'],
    role: 'Full-Stack Developer',
    github: 'https://github.com/pelinzkaya/aura.board',
    takeaway: 'Built a decoupled full-stack application with persistent board state, secure API boundaries, and a UI focused on personal planning and creative organization.',
    cardColor: 'soft-blossom',
    category: 'Full-Stack & Cloud',
    snippet: `[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BoardsController : BaseApiController {
    private readonly IBoardService _boardService;

    [HttpPost("{id}/sync")]
    public async Task<IActionResult> SyncItems(Guid id, [FromBody] List<BoardItemDto> items) {
        var result = await _boardService.UpdateZIndexAndPositionsAsync(id, items, User.GetUserId());
        return result.IsSuccess ? Ok(result) : BadRequest(result.Error);
    }
}`
  },
  {
    id: 'codeyourtree',
    title: 'CodeYourTree - Gamified Academic Platform',
    description: 'A gamified academic sharing platform designed around a Spring Boot backend, secured API endpoints, and dynamic progress visualization for student learning activity.',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JWT Auth', 'PostgreSQL', 'Svelte/Vanilla JS'],
    role: 'Product Owner & Scrum Master',
    github: 'https://github.com/pelinzkaya/CodeYourTree',
    takeaway: 'Led planning and delivery while working through authentication, endpoint protection, database integrity, and user-progress visualization concerns.',
    cardColor: 'ivory',
    category: 'Full-Stack & Cloud',
    snippet: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}`
  },
  {
    id: 'sshtunneling',
    title: 'Secure SSH Tunneling Simulation Engine',
    description: 'A native C++ infrastructure project simulating secure shell tunneling, remote port forwarding mechanics, and full-duplex packet routing with cryptographic key-exchange components.',
    tags: ['C++', 'Diffie-Hellman', 'Cryptography', 'Socket Programming', 'Makefile'],
    role: 'Systems Engineer',
    github: 'https://github.com/pelinzkaya/SSH-Tunneling',
    demo: 'https://github.com/pelinzkaya/SSH-Tunneling#artifacts',
    takeaway: 'Practiced low-level networking, socket lifecycle management, memory-conscious buffer handling, and encryption wrapper design in a systems programming context.',
    cardColor: 'soft-wisteria',
    category: 'Backend & Systems',
    snippet: `#ifndef CRYPTO_MANAGER_HPP
#define CRYPTO_MANAGER_HPP

#include <vector>
#include <string>

class CryptoManager {
public:
    std::vector<uint8_t> encryptAES(const std::string& plaintext, const std::vector<uint8_t>& secretKey);
    std::string decryptAES(const std::vector<uint8_t>& ciphertext, const std::vector<uint8_t>& secretKey);
};

#endif`
  },
  {
    id: 'generative-xai-adhd',
    title: 'Generative XAI ADHD-EEG Pipeline',
    description: 'A generative explainable AI research pipeline for pediatric EEG signal analysis, exploring diffusion-style modeling, stationarity evaluation, and interpretable neural signal workflows.',
    tags: ['Python', 'PyTorch', 'Diffusion Transformers', 'D4PM', 'EEG Stationarity', 'XAI'],
    role: 'AI Researcher & Developer',
    github: 'https://github.com/pelinzkaya/Generative-XAI-ADHD-EEG',
    demo: 'https://github.com/pelinzkaya/Generative-XAI-ADHD-EEG#results',
    takeaway: 'Explored deep learning research implementation patterns for sensitive neurological data, with emphasis on model structure, reproducibility, and interpretable outputs.',
    cardColor: 'ivory',
    category: 'AI & Data Science',
    snippet: `import torch
import torch.nn as nn
from models.transformer import DiffusionTransformer

class D4PMEEGEngine(nn.Module):
    def __init__(self, channels=19, seq_len=512):
        super().__init__()
        self.transformer = DiffusionTransformer(input_dim=channels, depth=6)
        self.bias_firewall = nn.Linear(seq_len, seq_len)

    def forward(self, x_t, timesteps, condition=None):
        eps_theta = self.transformer(x_t, timesteps, cond=condition)
        return self.bias_firewall(eps_theta)`
  },
  {
    id: 'overengineering-detector',
    title: 'Overengineering Detector Engine',
    description: 'An architectural analysis platform that inspects repository structures to flag structural complexity, unnecessary abstraction, and codebase patterns that make student projects harder to maintain.',
    tags: ['Node.js', 'Express', 'JavaScript', 'PostgreSQL', 'Mermaid.js', 'API Architecture'],
    role: 'Sole Architect',
    github: 'https://github.com/pelinzkaya/Overengineering-Detector',
    takeaway: 'Created deterministic scoring logic and visual dependency mapping to turn vague maintainability concerns into concrete, discussable engineering signals.',
    cardColor: 'soft-wisteria',
    category: 'Backend & Systems',
    snippet: `const analysisService = require('./services/analysisService');
const scoringService = require('./services/scoringService');

exports.analyzeRepo = async (req, res, next) => {
    try {
        const { repositoryUrl } = req.body;
        const structuralTree = await analysisService.cloneAndParse(repositoryUrl);
        const complexityMetrics = scoringService.evaluateOverengineering(structuralTree);
        return res.status(200).json({ success: true, metrics: complexityMetrics });
    } catch (err) {
        next(err);
    }
};`
  },
  {
    id: 'music-genre-detection',
    title: 'Deep Learning Music Genre Classifier',
    description: 'A deep learning audio classification project that extracts spectral and temporal features from acoustic data and trains neural models for music genre recognition.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Librosa', 'Audio Processing', 'TensorBoard'],
    role: 'Deep Learning Engineer',
    github: 'https://github.com/pelinzkaya/Deep-Learning-Music-Genre_Detection',
    demo: 'https://github.com/pelinzkaya/Deep-Learning-Music-Genre_Detection#logs',
    takeaway: 'Worked through audio preprocessing, mel-spectrogram feature extraction, sequential neural networks, and experiment logging for model evaluation.',
    cardColor: 'soft-blossom',
    category: 'AI & Data Science',
    snippet: `import tensorflow as tf
import librosa

def build_mel_classifier(input_shape, num_classes=10):
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=input_shape),
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    return model`
  },
  {
    id: 'frantic-barista',
    title: 'Frantic Barista - Interactive Simulator',
    description: 'An arcade-style simulation game rendered with custom Canvas logic, resource queues, customer satisfaction state, and recipe-mixing interactions under a timed loop.',
    tags: ['TypeScript', 'JavaScript (ES6)', 'HTML5 Canvas', 'Vite', 'Tailwind CSS'],
    role: 'Game Systems Designer',
    github: 'https://github.com/pelinzkaya/frantic-barista',
    takeaway: 'Practiced frame-rate independent updates, object-oriented game state, active rendering entities, and lightweight client-side interaction design.',
    cardColor: 'soft-blossom',
    category: 'Interactive Apps',
    snippet: `export class Cup {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ingredients = [];
    }

    addIngredient(ingredient, amount) {
        this.ingredients.push({ name: ingredient, qty: amount });
    }
}`
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'edu-1',
    period: '2023 - Present',
    title: 'Computer Engineering, B.S.',
    organization: 'Faculty of Engineering & Natural Sciences',
    description: 'Pursuing a highly analytical curriculum with a focus on systems, software design, compilation, and machine learning. Recipient of a 100% OSYM scholarship and an additional university top-student scholarship.',
    type: 'education',
    skills: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Software Engineering Principles']
  }
];

export const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'TypeScript / JS', level: 'expert' },
      { name: 'Rust', level: 'familiar' },
      { name: 'Python', level: 'fluent' },
      { name: 'C / C++', level: 'fluent' },
      { name: 'SQL', level: 'fluent' }
    ]
  },
  {
    category: 'Backend Systems',
    skills: [
      { name: 'Node.js / Express', level: 'expert' },
      { name: 'FastAPI / Flask', level: 'fluent' },
      { name: 'gRPC & Protocol Buffers', level: 'familiar' },
      { name: 'RESTful Architecture', level: 'expert' }
    ]
  },
  {
    category: 'Frontend & Design',
    skills: [
      { name: 'React 19 & Next.js', level: 'expert' },
      { name: 'Tailwind CSS v4', level: 'expert' },
      { name: 'Figma Prototyping', level: 'fluent' },
      { name: 'Motion / Framer Motion', level: 'fluent' }
    ]
  },
  {
    category: 'Databases & Cache',
    skills: [
      { name: 'PostgreSQL', level: 'expert' },
      { name: 'RocksDB / LevelDB', level: 'familiar' },
      { name: 'Redis Cache Layer', level: 'fluent' },
      { name: 'MongoDB / JSON Stores', level: 'fluent' }
    ]
  },
  {
    category: 'AI & Data Science',
    skills: [
      { name: 'scikit-learn Classifier', level: 'fluent' },
      { name: 'Pandas & NumPy Stack', level: 'expert' },
      { name: 'PyTorch Basics', level: 'familiar' },
      { name: 'Data Visualisation (D3 / Recharts)', level: 'fluent' }
    ]
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub Actions', level: 'expert' },
      { name: 'Docker Containerization', level: 'fluent' },
      { name: 'Linux Command Line', level: 'expert' },
      { name: 'Vite & Bundler Systems', level: 'expert' }
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '100% OSYM Scholarship',
    issuer: 'OSYM',
    year: 'Full Scholarship',
    description: 'Awarded a full scholarship for undergraduate study through OSYM.',
    badge: 'Full Scholarship'
  },
  {
    id: 'ach-2',
    title: 'University Top Student Scholarship',
    issuer: 'University Scholarship Award',
    year: '10% Scholarship',
    description: 'Awarded an additional 10% scholarship in recognition of top-student academic achievement.',
    badge: 'Academic Excellence'
  }
];

export const researchInterests: ResearchInterest[] = [
  {
    id: 'res-1',
    title: 'Developer Ergonomics & Compiler UX',
    description: 'Researching how error compiler logs and live visual trees (AST) influence programmer debugging speeds and mental anxiety in early stem education.',
    iconName: 'Sparkles'
  },
  {
    id: 'res-2',
    title: 'Resource-Constrained Cache Policies',
    description: 'Exploring custom predictive caching mechanisms at the systems layer, marrying Bloom filters with LRU policies to decrease memory bloat on personal IoT micro-servers.',
    iconName: 'Database'
  },
  {
    id: 'res-3',
    title: 'Feminine & Soft Human-AI Cooperations',
    description: 'Investigating how softer, editorial layouts and cozy web ecosystems impact focus and information retention compared to brutalist or over-masculinized dark panels commonly found in developer software.',
    iconName: 'Heart'
  }
];

export const journalEntries: JournalEntry[] = [
  {
    id: 'journal-1',
    title: 'Building a portfolio that feels like a room, not a resume',
    date: 'January 2026',
    readTime: '4 min read',
    category: 'Design Notes',
    excerpt: 'A reflection on turning technical work into a personal digital space, where layout, color, and code all communicate the same story.',
    mood: 'soft systems thinking'
  },
  {
    id: 'journal-2',
    title: 'What I learned while debugging my first full-stack project',
    date: 'December 2025',
    readTime: '6 min read',
    category: 'Engineering Diary',
    excerpt: 'Notes on confusing errors, small breakthroughs, and the moment a project starts feeling less mysterious because you can trace the flow end to end.',
    mood: 'patient debugging'
  },
  {
    id: 'journal-3',
    title: 'Why I like gentle interfaces for serious technical work',
    date: 'November 2025',
    readTime: '5 min read',
    category: 'Human-Computer Interaction',
    excerpt: 'A mini essay about calm visual systems, learning anxiety, and how softer interfaces can still carry rigorous engineering ideas.',
    mood: 'curious and reflective'
  }
];

