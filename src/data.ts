/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TimelineEvent, SkillCategory, Achievement, ResearchInterest, JournalEntry } from './types';

export const projects: Project[] = [
  {
    id: 'auraboard',
    title: 'Aura Board - Full-Stack Collaborative Vision-Board App',
    description: 'Aura Board turns a familiar creative product into a real full-stack engineering problem: who owns a board, who can collaborate on it, and how is that state kept secure and persistent? Built with ASP.NET Core, PostgreSQL, Entity Framework Core, Vite, and vanilla JavaScript, it supports visual goal boards with draggable notes, quotes, and images. Owners control settings and invitations, while collaborators contribute to board content within clear permission boundaries.',
    tags: ['ASP.NET Core', 'PostgreSQL', 'EF Core', 'Vite', 'Vanilla JavaScript'],
    role: 'Full-Stack Developer · Student Portfolio Project',
    github: 'https://github.com/aeroplein/aura.board',
    takeaway: 'HttpOnly cookie authentication, relational data modeling, server-side validation, EF Core migrations, permission-aware API design, and resilient local fallbacks for optional Gemini-assisted ideas and media features. Built with real authentication and data controls, but not presented as production SaaS.',
    cardColor: 'soft-blossom',
    category: 'Full-Stack & Cloud',
    snippet: `// Engineering notes
Authentication: HttpOnly cookie sessions
Permissions: owner and collaborator boundaries
Persistence: PostgreSQL + EF Core migrations
Validation: server-side API boundaries
Fallbacks: core experience remains usable without external services`
  },
  {
    id: 'sshtunneling',
    title: 'Secure Tunneling Simulation',
    description: 'A native C++ networking simulation built around framed packets, bidirectional socket routing, concurrent client sessions, and cryptographic concepts. The implementation defines an explicit packet structure, routes traffic in both directions using select, handles client sessions concurrently, and uses OpenSSL primitives including AES-256-CTR and HMAC-SHA256. A multi-client transfer test exercises the network flow.',
    tags: ['C++', 'POSIX Sockets', 'OpenSSL', 'Packet Framing', 'Concurrency'],
    role: 'Systems Engineering · Learning Project',
    github: 'https://github.com/aeroplein/SSH-Tunneling',
    takeaway: 'Demonstrates systems programming, network state, concurrency, packet framing, and cryptographic boundaries. This is not the SSH protocol or a production security product; it is a learning system for understanding routing and the limits of unauthenticated key exchange.',
    cardColor: 'soft-wisteria',
    category: 'Backend & Systems',
    snippet: `// Engineering notes
Packet structure: explicit framed messages
Routing: bidirectional flow with select
Concurrency: per-client sessions
Primitives: AES-256-CTR + HMAC-SHA256
Boundary: learning simulation, not the SSH protocol`
  },
  {
    id: 'overengineering-detector',
    title: 'Overengineering Detector',
    description: 'A rule-based architecture tool that compares stack complexity with project scale and usage context. Instead of treating “overengineered” as an opinion, the system uses inspectable criteria to produce deterministic scores, risk flags, recommendations, what-if scenarios, and persisted analysis history. It also distinguishes excessive complexity from systems that may be too simple for their requirements.',
    tags: ['Node.js', 'Express', 'JavaScript', 'PostgreSQL', 'Rule-Based Scoring'],
    role: 'Backend & Architecture Implementation',
    github: 'https://github.com/aeroplein/Overengineering-Detector',
    takeaway: 'Analyses are ownership-filtered, related results are stored transactionally, and scoring thresholds are covered by tests. Demonstrates domain modeling, deterministic reasoning, authorization, testable thresholds, and product judgment.',
    cardColor: 'soft-wisteria',
    category: 'Backend & Systems',
    snippet: `// Engineering notes
Source of truth: deterministic scoring rules
Inputs: stack complexity, scale, and usage context
Outputs: scores, flags, recommendations, and what-if scenarios
Persistence: ownership-filtered analysis history
Evaluation: test-covered thresholds`
  },
  {
    id: 'codeyourtree',
    title: 'CodeYourTree',
    description: 'A technical software project built with Java 21, Spring Boot, Spring Security, PostgreSQL, and HTML5 Canvas. I developed REST APIs, JWT-based authentication, user and progress management, and visual streak tracking.',
    tags: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'HTML5 Canvas'],
    role: 'Technical Software Project',
    github: 'https://github.com/aeroplein/CodeYourTree',
    takeaway: 'Turns user progress and streak data into persistent, visible state while keeping authentication and progress-management responsibilities explicit.',
    cardColor: 'ivory',
    category: 'Full-Stack & Cloud',
    snippet: `// Engineering notes
API: REST endpoints
Security: JWT-based authentication
State: user and progress management
Visualization: streak tracking with HTML5 Canvas`
  },
  {
    id: 'stegodetector',
    title: 'StegoDetector - Hybrid Image Steganalysis & Threat Detection',
    description: 'Developed as an academic team project, StegoDetector is a hybrid image steganalysis system for detecting hidden information in digital images. It combines statistical image analysis with ensemble machine learning to identify suspicious patterns associated with steganographic manipulation. The project includes feature extraction and diagnostic pipelines using OpenCV and NumPy, a Soft Voting Ensemble combining XGBoost and Random Forest models, and Streamlit visualizations for inspecting predictions, extracted features, and model behavior during evaluation.',
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'OpenCV', 'NumPy', 'Streamlit'],
    role: 'Academic Team Project',
    github: 'https://github.com/aeroplein/image-steganography-and-staganalysis',
    takeaway: 'Achieved 80% classification accuracy. Demonstrates applied machine learning, image processing, cybersecurity thinking, feature engineering, model evaluation, and diagnostic tooling. Presented as a portfolio-scale detection project, not a production security system.',
    cardColor: 'soft-blossom',
    category: 'AI & Data Science',
    snippet: `# Evaluation notes
feature_extraction = "OpenCV + NumPy"
ensemble = "XGBoost + Random Forest"
inspection = "Streamlit diagnostics"
classification_accuracy = "80%"
scope = portfolio-scale detection project`
  },
  {
    id: 'generative-xai-adhd',
    title: 'Generative XAI for ADHD-EEG',
    description: 'A research-oriented PyTorch experiment exploring generative modeling and explainability questions in pediatric EEG analysis. The work centers on what would make an experiment interpretable: preprocessing, subject-level splits, baselines, reproducibility, explainability methods, and clearly stated limitations.',
    tags: ['Python', 'PyTorch', 'EEG Analysis', 'Generative Modeling', 'XAI'],
    role: 'Research-Oriented Implementation',
    github: 'https://github.com/aeroplein/Generative-XAI-ADHD-EEG',
    takeaway: 'Asks what evidence is required before a model output can be understood or trusted. It does not imply diagnosis, clinical validity, publication, or validated results.',
    cardColor: 'ivory',
    category: 'AI & Data Science',
    snippet: `# Experiment framing
focus = [
    "preprocessing",
    "subject-level splits",
    "baselines and reproducibility",
    "explainability methods",
    "clearly stated limitations",
]`
  },
  {
    id: 'music-genre-detection',
    title: 'Music Genre Classification',
    description: 'Developed as an academic team project, this audio-ML pipeline segments tracks, extracts 40-coefficient MFCC sequences with Librosa, stores processed data in HDF5, and explores a TensorFlow/Keras CNN-LSTM model. The preprocessing work is inspectable. Final reproducible evaluation is still in progress, so the project is presented as an experiment pipeline rather than a completed classifier.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Librosa', 'MFCC', 'HDF5'],
    role: 'Academic Team Project',
    github: 'https://github.com/aeroplein/Deep-Learning-Music-Genre_Detection',
    takeaway: 'Exposes the representation and data decisions that happen before a model produces an answer. No final accuracy metric is claimed.',
    cardColor: 'soft-blossom',
    category: 'AI & Data Science',
    snippet: `# Pipeline notes
audio_window = "3-second segments"
representation = "40-coefficient MFCC sequences"
storage = "HDF5"
model_direction = "TensorFlow/Keras CNN-LSTM"
status = final reproducible evaluation in progress`
  },
  {
    id: 'frantic-barista',
    title: 'Frantic Barista',
    description: 'An early Canvas interaction prototype with a JavaScript Cup entity that models espresso, oat milk, and berry syrup as state and renders their proportions as visible layers. The surrounding interface establishes orders, timing, score, and patience concepts, but a complete game loop and customer system are not yet present.',
    tags: ['JavaScript', 'HTML5 Canvas', 'Vite', 'Tailwind CSS'],
    role: 'Interaction Prototype',
    github: 'https://github.com/aeroplein/frantic-barista',
    takeaway: 'Translates internal ingredient state into an immediate visual representation while stating the prototype boundary clearly.',
    cardColor: 'soft-blossom',
    category: 'Interactive Apps',
    snippet: `// Prototype notes
State: espresso, oat milk, and berry syrup ratios
Rendering: layered ingredient proportions on Canvas
UI concepts: orders, timing, score, and patience
Boundary: complete game loop and customer system not yet present`
  },
  {
    id: 'university-automation-system',
    title: 'University Automation System',
    description: 'An academic Java Swing desktop application that models university operations through separate Admin, Instructor, and Student dashboards. It organizes the code into model, data, and UI layers, uses a singleton DataStore for structured text-file persistence, and supports users, departments, courses, enrollments, grade entry, transcripts, GPA calculation, reports, and role-specific navigation.',
    tags: ['Java', 'Swing', 'FlatLaf', 'File Persistence', 'MVC'],
    role: 'Academic Desktop Application',
    github: 'https://github.com/aeroplein/university-automation-system',
    takeaway: 'Makes role boundaries and academic workflows explicit through separate dashboards, validation rules, and immediately persisted records. Its file-based storage and local credential model keep the scope clearly educational rather than production-grade.',
    cardColor: 'ivory',
    category: 'Software Systems',
    snippet: `// Architecture notes
Interface: Java Swing + FlatLaf
Navigation: CardLayout + role-specific dashboards
State: singleton DataStore
Persistence: structured text files
Workflows: enrollment, grading, transcripts, and GPA
Boundary: academic desktop application`
  },
  {
    id: 'mnist-digit-recognition',
    title: 'MNIST Handwritten Digit Recognition',
    description: 'A compact TensorFlow/Keras learning project covering the full supervised-learning pipeline for handwritten-digit classification. It loads the standard MNIST train and test sets, flattens each 28×28 image into 784 features, normalizes pixel values, one-hot encodes labels, trains a 128–64–10 dense network, evaluates the held-out test set, and visualizes training and validation behavior.',
    tags: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib'],
    role: 'Machine Learning Project',
    github: 'https://github.com/aeroplein/MNIST-Handwritten-Digit-Recognition',
    takeaway: 'The repository reports 97.81% test accuracy after 10 epochs with a batch size of 128. Demonstrates preprocessing, model construction, evaluation, and diagnostic plotting while remaining a baseline MLP rather than an image-specific CNN.',
    cardColor: 'soft-wisteria',
    category: 'AI & Data Science',
    snippet: `# Model notes
input = "28×28 pixels → 784 normalized features"
architecture = "Dense(128) → Dense(64) → Softmax(10)"
optimizer = "Adam"
training = "10 epochs · batch size 128"
reported_test_accuracy = "97.81%"`
  },
  {
    id: 'cervical-cancer-prediction',
    title: 'Cervical Cancer Risk Prediction',
    description: 'A scikit-learn classification experiment using the Dx:Cancer target from a cervical-cancer risk-factor dataset. The pipeline converts values to numeric form, replaces missing entries with feature medians, creates a 70/30 train-test split, and evaluates a hard-voting ensemble of Logistic Regression, K-Nearest Neighbors, and Decision Tree models with a classification report.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'VotingClassifier'],
    role: 'Machine Learning Experiment',
    github: 'https://github.com/aeroplein/Cervical-Cancer-Prediction',
    takeaway: 'The repository reports approximately 99.6% accuracy on one split, with six positive examples in the displayed test report. I present it as practice in missing-data handling, class imbalance, ensemble evaluation, and limitation-aware reporting—not as a clinically validated model.',
    cardColor: 'soft-blossom',
    category: 'AI & Data Science',
    snippet: `# Evaluation notes
missing_values = "numeric conversion + median imputation"
split = "70% train · 30% test · random_state 42"
ensemble = "Logistic Regression + KNN + Decision Tree"
voting = "hard"
reported_accuracy = "~99.6% on one split"
positive_test_examples = 6
scope = "learning experiment, not clinical validation"`
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'leadership-campusnote',
    period: 'Academic Team Project',
    title: 'CampusNote Pro',
    organization: 'Product Owner & Scrum Master',
    description: 'In CampusNote Pro, I worked between product decisions, team coordination, and implementation. I organized sprint planning, prioritized the backlog, and helped turn project requirements into concrete development tasks. I also contributed to AI-assisted platform features in Python, giving me direct visibility into both the decisions being made and the technical work required to deliver them.',
    type: 'milestone',
    skills: ['Python', 'AI-assisted feature development', 'Sprint planning', 'Backlog prioritization', 'Task coordination']
  },
  {
    id: 'edu-1',
    period: '2022–Present',
    title: 'Computer Engineering (English), B.S.',
    organization: 'Faculty of Engineering',
    description: 'Studying Computer Engineering in English since 2022, including the English preparatory year. Current CGPA: 3.88/4.00. Coursework and project work span data structures and algorithms, operating systems, databases, software engineering, systems programming, and machine learning.',
    type: 'education',
    skills: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Software Engineering Principles']
  }
];

export const skillsData: SkillCategory[] = [
  {
    category: 'Protecting Boundaries',
    skills: [
      { name: 'C#', level: 'fluent' },
      { name: 'ASP.NET Core', level: 'fluent' },
      { name: 'Spring Security', level: 'fluent' },
      { name: 'JWT and cookie authentication', level: 'fluent' },
      { name: 'Authorization', level: 'fluent' },
      { name: 'DTO validation', level: 'fluent' },
      { name: 'Error handling', level: 'fluent' }
    ]
  },
  {
    category: 'Modeling Persistent State',
    skills: [
      { name: 'PostgreSQL', level: 'fluent' },
      { name: 'Microsoft SQL Server', level: 'fluent' },
      { name: 'Entity Framework Core', level: 'fluent' },
      { name: 'JPA/Hibernate', level: 'fluent' },
      { name: 'Transactions', level: 'fluent' },
      { name: 'Migrations', level: 'fluent' },
      { name: 'Constraints', level: 'fluent' }
    ]
  },
  {
    category: 'Understanding Data Flow',
    skills: [
      { name: 'C', level: 'fluent' },
      { name: 'C++', level: 'fluent' },
      { name: 'POSIX sockets', level: 'fluent' },
      { name: 'Packet framing', level: 'fluent' },
      { name: 'Threads', level: 'fluent' },
      { name: 'select', level: 'fluent' },
      { name: 'Buffer handling', level: 'fluent' },
      { name: 'OpenSSL concepts', level: 'fluent' }
    ]
  },
  {
    category: 'Evaluating Data & Models',
    skills: [
      { name: 'Python', level: 'fluent' },
      { name: 'TensorFlow/Keras', level: 'fluent' },
      { name: 'PyTorch', level: 'fluent' },
      { name: 'Pandas', level: 'fluent' },
      { name: 'Librosa', level: 'fluent' },
      { name: 'MFCC preprocessing', level: 'fluent' },
      { name: 'HDF5', level: 'fluent' },
      { name: 'Experiment design', level: 'fluent' }
    ]
  },
  {
    category: 'Making Behavior Visible',
    skills: [
      { name: 'TypeScript', level: 'fluent' },
      { name: 'JavaScript', level: 'fluent' },
      { name: 'React', level: 'fluent' },
      { name: 'Vite', level: 'fluent' },
      { name: 'HTML', level: 'fluent' },
      { name: 'CSS', level: 'fluent' },
      { name: 'Canvas', level: 'fluent' },
      { name: 'API integration', level: 'fluent' }
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '100% ÖSYM Scholarship',
    issuer: 'ÖSYM',
    year: 'Full Scholarship',
    description: 'Awarded a full scholarship for undergraduate study through ÖSYM.',
    badge: 'Full Scholarship'
  },
  {
    id: 'ach-2',
    title: 'University Academic Scholarship',
    issuer: 'University',
    year: '10% Scholarship',
    description: 'Awarded an additional 10% academic scholarship in recognition of university performance.',
    badge: 'Academic Excellence'
  },
  {
    id: 'ach-3',
    title: 'English Preparatory Year · 91/100 Average · Top Student',
    issuer: 'Faculty of Engineering',
    year: '91/100 Average',
    description: 'Completed the English preparatory year with a 91/100 average and finished as the top student.',
    badge: 'Academic Achievement'
  }
];

export const researchInterests: ResearchInterest[] = [
  {
    id: 'res-1',
    title: 'Developer Ergonomics and Compiler UX',
    description: 'How can error messages and visual representations of program structure make debugging easier to understand for early learners?',
    iconName: 'Sparkles'
  },
  {
    id: 'res-2',
    title: 'Resource-Aware Caching',
    description: 'When can probabilistic membership checks and recency-based eviction reduce wasted memory on small systems?',
    iconName: 'Database'
  },
  {
    id: 'res-3',
    title: 'Human-Centered AI Interfaces',
    description: 'How can calmer visual systems improve focus and comprehension without reducing technical depth?',
    iconName: 'Heart'
  },
  {
    id: 'res-4',
    title: 'Explainable Biomedical ML',
    description: 'What preprocessing, evaluation, and limitation reporting should be required before an EEG model’s output can be meaningfully interpreted?',
    iconName: 'BookOpen'
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
    mood: 'soft systems thinking',
    slug: 'room-not-resume',
    pullQuote: 'The interface is part of the explanation: it tells visitors what to notice, what belongs together, and where to look next.',
    sections: [
      {
        heading: 'A portfolio is spatial',
        paragraphs: [
          'A resume asks someone to move down a list. A portfolio asks them to move through a space. That difference changed how I thought about this site. I was not only arranging projects by importance; I was deciding what a visitor should notice first, what should reward a slower look, and how one piece of work should lead into the next.',
          'I wanted the page to feel closer to entering a room that has been carefully lived in. The first impression should be clear, but the details should still feel personal: a technical note tucked into a project card, a softer typeface beside a precise label, or a research question that explains what I want to understand next. Those choices create orientation. They tell the visitor where they are and what kind of thinking shaped the space.'
        ]
      },
      {
        heading: 'The visual system carries meaning',
        paragraphs: [
          'The lilac background, editorial serif type, handwritten accents, rounded cards, and small mono labels are not separate from the technical content. They establish a rhythm for reading it. Large headings create landmarks. Compact labels make categories and roles easy to scan. Repeated card shapes signal that different projects belong to the same body of work even when their technologies are very different.',
          'I do not see the visual identity as a decorative layer placed on top of engineering. It is part of how the engineering is communicated. A calm interface can hold dense information without making it feel defensive or inaccessible. Warmth can invite someone to stay long enough to notice the authentication boundary, data model, evaluation decision, or limitation that gives a project its real shape.'
        ]
      },
      {
        heading: 'Show the structure behind the surface',
        paragraphs: [
          'The projects on this site are intentionally described through the parts that are easy to miss in a screenshot. Aura Board is not only a draggable board; it is also ownership, collaboration permissions, persistence, validation, and fallbacks. A tunneling simulation is not only a terminal result; it is packet framing, concurrent sessions, routing, and clearly stated security boundaries. Machine-learning work is not only an accuracy number; it is preprocessing, feature choices, evaluation, and the limits of what the result can support.',
          'That is why each project card includes more than a summary. Roles, technical stacks, engineering takeaways, source links, and the Peek Logic panel expose different layers of the same system. The interface becomes a way of making internal decisions inspectable. It lets a visitor move from “what is this?” to “how does it behave?” without leaving the visual language of the portfolio.'
        ]
      },
      {
        heading: 'Soft does not mean vague',
        paragraphs: [
          'Technical portfolios often borrow seriousness from dark dashboards, dense terminal imagery, or deliberately severe typography. Those choices can work, but they are not the only way to communicate rigor. I wanted to test whether a softer environment could still make boundaries, evidence, and implementation details feel exact.',
          'For me, the useful contrast is not feminine versus technical. It is vague versus specific. A pastel card can still say exactly which authentication model a project uses. A script accent can sit beside a reproducible metric. A warm page can be honest about unfinished evaluation, a prototype boundary, or a result that should not be treated as clinical validation. Precision comes from the writing and the structure, not from making the interface feel cold.'
        ]
      },
      {
        heading: 'Designing for two reading speeds',
        paragraphs: [
          'A hiring manager may give this page thirty seconds. A curious engineer may stay much longer. The portfolio has to work for both. At scanning speed, the hero establishes backend, systems, and machine-learning range; project ordering brings the strongest evidence forward; and repeated labels make roles, technologies, and outcomes predictable to find.',
          'At a slower speed, the site opens up. Technical panels show how I frame system behavior. Research interests connect current projects to questions I want to investigate. The journal creates room for reasoning that does not fit inside a project description. These deeper layers should never be required to understand the basics, but they should be available when someone wants to follow the thread.'
        ]
      },
      {
        heading: 'A room can keep changing',
        paragraphs: [
          'A resume is usually treated as a finished snapshot. A room changes as its owner learns, builds, removes, and rearranges things. I want this portfolio to behave in the same way. New projects can enter without erasing the older questions that led to them. Research directions can become experiments. Journal notes can record why a technical or visual decision changed.',
          'The goal is not to make every part permanent. It is to keep the logic of the space coherent as it grows. If the layout, color, writing, and code continue pointing toward the same values—clear boundaries, visible state, and explainable decisions—the portfolio can evolve without becoming a disconnected collection. It can remain a room rather than turning back into a list.'
        ]
      }
    ]
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
