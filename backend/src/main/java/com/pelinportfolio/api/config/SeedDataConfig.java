package com.pelinportfolio.api.config;

import com.pelinportfolio.api.model.Project;
import com.pelinportfolio.api.model.ResearchItem;
import com.pelinportfolio.api.model.Skill;
import com.pelinportfolio.api.repository.ProjectRepository;
import com.pelinportfolio.api.repository.ResearchItemRepository;
import com.pelinportfolio.api.repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner seedPortfolioData(
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            ResearchItemRepository researchItemRepository
    ) {
        return args -> {
            if (projectRepository.count() == 0) {
                projectRepository.saveAll(projects());
            }
            if (skillRepository.count() == 0) {
                skillRepository.saveAll(skills());
            }
            if (researchItemRepository.count() == 0) {
                researchItemRepository.saveAll(researchItems());
            }
        };
    }

    private List<Project> projects() {
        return List.of(
                new Project(
                        "auraboard",
                        "AuraBoard - Digital Vision Board SaaS",
                        "An interactive digital vision board platform built with an ASP.NET Core Web API, PostgreSQL, and a responsive Vite + React frontend. It supports custom board layouts, authenticated ownership boundaries, uploaded assets, and external media integrations.",
                        List.of("C#", "ASP.NET Core", "Entity Framework Core", "PostgreSQL", "React", "Vite", "Spotify API"),
                        "https://github.com/pelinzkaya/aura.board",
                        null,
                        null,
                        true,
                        1,
                        "Full-Stack Developer",
                        "Built a decoupled full-stack application with persistent board state, secure API boundaries, and a UI focused on personal planning and creative organization.",
                        "soft-blossom",
                        "Full-Stack & Cloud",
                        """
                        [Authorize]
                        [ApiController]
                        [Route("api/[controller]")]
                        public class BoardsController : BaseApiController {
                            private readonly IBoardService _boardService;

                            [HttpPost("{id}/sync")]
                            public async Task<IActionResult> SyncItems(Guid id, [FromBody] List<BoardItemDto> items) {
                                var result = await _boardService.UpdateZIndexAndPositionsAsync(id, items, User.GetUserId());
                                return result.IsSuccess ? Ok(result) : BadRequest(result.Error);
                            }
                        }"""
                ),
                new Project(
                        "codeyourtree",
                        "CodeYourTree - Gamified Academic Platform",
                        "A gamified academic sharing platform designed around a Spring Boot backend, secured API endpoints, and dynamic progress visualization for student learning activity.",
                        List.of("Java", "Spring Boot", "Spring Security", "JWT Auth", "PostgreSQL", "Svelte/Vanilla JS"),
                        "https://github.com/pelinzkaya/CodeYourTree",
                        null,
                        null,
                        true,
                        2,
                        "Product Owner & Scrum Master",
                        "Led planning and delivery while working through authentication, endpoint protection, database integrity, and user-progress visualization concerns.",
                        "ivory",
                        "Full-Stack & Cloud",
                        """
                        @Configuration
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
                        }"""
                ),
                new Project(
                        "sshtunneling",
                        "Secure SSH Tunneling Simulation Engine",
                        "A native C++ infrastructure project simulating secure shell tunneling, remote port forwarding mechanics, and full-duplex packet routing with cryptographic key-exchange components.",
                        List.of("C++", "Diffie-Hellman", "Cryptography", "Socket Programming", "Makefile"),
                        "https://github.com/pelinzkaya/SSH-Tunneling",
                        "https://github.com/pelinzkaya/SSH-Tunneling#artifacts",
                        null,
                        true,
                        3,
                        "Systems Engineer",
                        "Practiced low-level networking, socket lifecycle management, memory-conscious buffer handling, and encryption wrapper design in a systems programming context.",
                        "soft-wisteria",
                        "Backend & Systems",
                        """
                        #ifndef CRYPTO_MANAGER_HPP
                        #define CRYPTO_MANAGER_HPP

                        #include <vector>
                        #include <string>

                        class CryptoManager {
                        public:
                            std::vector<uint8_t> encryptAES(const std::string& plaintext, const std::vector<uint8_t>& secretKey);
                            std::string decryptAES(const std::vector<uint8_t>& ciphertext, const std::vector<uint8_t>& secretKey);
                        };

                        #endif"""
                ),
                new Project(
                        "generative-xai-adhd",
                        "Generative XAI ADHD-EEG Pipeline",
                        "A generative explainable AI research pipeline for pediatric EEG signal analysis, exploring diffusion-style modeling, stationarity evaluation, and interpretable neural signal workflows.",
                        List.of("Python", "PyTorch", "Diffusion Transformers", "D4PM", "EEG Stationarity", "XAI"),
                        "https://github.com/pelinzkaya/Generative-XAI-ADHD-EEG",
                        "https://github.com/pelinzkaya/Generative-XAI-ADHD-EEG#results",
                        null,
                        true,
                        4,
                        "AI Researcher & Developer",
                        "Explored deep learning research implementation patterns for sensitive neurological data, with emphasis on model structure, reproducibility, and interpretable outputs.",
                        "ivory",
                        "AI & Data Science",
                        """
                        import torch
                        import torch.nn as nn
                        from models.transformer import DiffusionTransformer

                        class D4PMEEGEngine(nn.Module):
                            def __init__(self, channels=19, seq_len=512):
                                super().__init__()
                                self.transformer = DiffusionTransformer(input_dim=channels, depth=6)
                                self.bias_firewall = nn.Linear(seq_len, seq_len)

                            def forward(self, x_t, timesteps, condition=None):
                                eps_theta = self.transformer(x_t, timesteps, cond=condition)
                                return self.bias_firewall(eps_theta)"""
                ),
                new Project(
                        "overengineering-detector",
                        "Overengineering Detector Engine",
                        "An architectural analysis platform that inspects repository structures to flag structural complexity, unnecessary abstraction, and codebase patterns that make student projects harder to maintain.",
                        List.of("Node.js", "Express", "JavaScript", "PostgreSQL", "Mermaid.js", "API Architecture"),
                        "https://github.com/pelinzkaya/Overengineering-Detector",
                        null,
                        null,
                        true,
                        5,
                        "Sole Architect",
                        "Created deterministic scoring logic and visual dependency mapping to turn vague maintainability concerns into concrete, discussable engineering signals.",
                        "soft-wisteria",
                        "Backend & Systems",
                        """
                        const analysisService = require('./services/analysisService');
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
                        };"""
                ),
                new Project(
                        "music-genre-detection",
                        "Deep Learning Music Genre Classifier",
                        "A deep learning audio classification project that extracts spectral and temporal features from acoustic data and trains neural models for music genre recognition.",
                        List.of("Python", "TensorFlow", "Keras", "Librosa", "Audio Processing", "TensorBoard"),
                        "https://github.com/pelinzkaya/Deep-Learning-Music-Genre_Detection",
                        "https://github.com/pelinzkaya/Deep-Learning-Music-Genre_Detection#logs",
                        null,
                        true,
                        6,
                        "Deep Learning Engineer",
                        "Worked through audio preprocessing, mel-spectrogram feature extraction, sequential neural networks, and experiment logging for model evaluation.",
                        "soft-blossom",
                        "AI & Data Science",
                        """
                        import tensorflow as tf
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
                            return model"""
                ),
                new Project(
                        "frantic-barista",
                        "Frantic Barista - Interactive Simulator",
                        "An arcade-style simulation game rendered with custom Canvas logic, resource queues, customer satisfaction state, and recipe-mixing interactions under a timed loop.",
                        List.of("TypeScript", "JavaScript (ES6)", "HTML5 Canvas", "Vite", "Tailwind CSS"),
                        "https://github.com/pelinzkaya/frantic-barista",
                        null,
                        null,
                        true,
                        7,
                        "Game Systems Designer",
                        "Practiced frame-rate independent updates, object-oriented game state, active rendering entities, and lightweight client-side interaction design.",
                        "soft-blossom",
                        "Interactive Apps",
                        """
                        export class Cup {
                            constructor(x, y, size) {
                                this.x = x;
                                this.y = y;
                                this.size = size;
                                this.ingredients = [];
                            }

                            addIngredient(ingredient, amount) {
                                this.ingredients.push({ name: ingredient, qty: amount });
                            }
                        }"""
                )
        );
    }

    private List<Skill> skills() {
        List<Skill> skills = new ArrayList<>();
        int order = 1;

        order = addSkills(skills, "Languages", order,
                "TypeScript / JS|expert", "Rust|familiar", "Python|fluent",
                "C / C++|fluent", "SQL|fluent");
        order = addSkills(skills, "Backend Systems", order,
                "Node.js / Express|expert", "FastAPI / Flask|fluent",
                "gRPC & Protocol Buffers|familiar", "RESTful Architecture|expert");
        order = addSkills(skills, "Frontend & Design", order,
                "React 19 & Next.js|expert", "Tailwind CSS v4|expert",
                "Figma Prototyping|fluent", "Motion / Framer Motion|fluent");
        order = addSkills(skills, "Databases & Cache", order,
                "PostgreSQL|expert", "RocksDB / LevelDB|familiar",
                "Redis Cache Layer|fluent", "MongoDB / JSON Stores|fluent");
        order = addSkills(skills, "AI & Data Science", order,
                "scikit-learn Classifier|fluent", "Pandas & NumPy Stack|expert",
                "PyTorch Basics|familiar", "Data Visualisation (D3 / Recharts)|fluent");
        addSkills(skills, "Tools & DevOps", order,
                "Git & GitHub Actions|expert", "Docker Containerization|fluent",
                "Linux Command Line|expert", "Vite & Bundler Systems|expert");

        return skills;
    }

    private int addSkills(List<Skill> skills, String category, int startOrder, String... values) {
        int order = startOrder;
        for (String value : values) {
            String[] parts = value.split("\\|", 2);
            skills.add(new Skill(parts[0], category, parts[1], order++));
        }
        return order;
    }

    private List<ResearchItem> researchItems() {
        return List.of(
                new ResearchItem(
                        "res-1",
                        "Developer Ergonomics & Compiler UX",
                        "Researching how error compiler logs and live visual trees (AST) influence programmer debugging speeds and mental anxiety in early stem education.",
                        null,
                        "Research interest",
                        null,
                        "Sparkles",
                        1
                ),
                new ResearchItem(
                        "res-2",
                        "Resource-Constrained Cache Policies",
                        "Exploring custom predictive caching mechanisms at the systems layer, marrying Bloom filters with LRU policies to decrease memory bloat on personal IoT micro-servers.",
                        null,
                        "Research interest",
                        null,
                        "Database",
                        2
                ),
                new ResearchItem(
                        "res-3",
                        "Feminine & Soft Human-AI Cooperations",
                        "Investigating how softer, editorial layouts and cozy web ecosystems impact focus and information retention compared to brutalist or over-masculinized dark panels commonly found in developer software.",
                        null,
                        "Research interest",
                        null,
                        "Heart",
                        3
                )
        );
    }
}
