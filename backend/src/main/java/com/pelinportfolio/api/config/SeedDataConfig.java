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
                        "Aura Board - Full-Stack Collaborative Vision-Board App",
                        "Aura Board turns a familiar creative product into a real full-stack engineering problem: who owns a board, who can collaborate on it, and how is that state kept secure and persistent? Built with ASP.NET Core, PostgreSQL, Entity Framework Core, Vite, and vanilla JavaScript, it supports visual goal boards with draggable notes, quotes, and images. Owners control settings and invitations, while collaborators contribute to board content within clear permission boundaries.",
                        List.of("ASP.NET Core", "PostgreSQL", "EF Core", "Vite", "Vanilla JavaScript"),
                        "https://github.com/aeroplein/aura.board",
                        null,
                        null,
                        true,
                        1,
                        "Full-Stack Developer · Student Portfolio Project",
                        "HttpOnly cookie authentication, relational data modeling, server-side validation, EF Core migrations, permission-aware API design, and resilient local fallbacks for optional Gemini-assisted ideas and media features. Built with real authentication and data controls, but not presented as production SaaS.",
                        "soft-blossom",
                        "Full-Stack & Cloud",
                        """
                        // Engineering notes
                        Authentication: HttpOnly cookie sessions
                        Permissions: owner and collaborator boundaries
                        Persistence: PostgreSQL + EF Core migrations
                        Validation: server-side API boundaries
                        Fallbacks: core experience remains usable without external services"""
                ),
                new Project(
                        "codeyourtree",
                        "CodeYourTree",
                        "A technical software project built with Java 21, Spring Boot, Spring Security, PostgreSQL, and HTML5 Canvas. I developed REST APIs, JWT-based authentication, user and progress management, and visual streak tracking.",
                        List.of("Java 21", "Spring Boot", "Spring Security", "PostgreSQL", "HTML5 Canvas"),
                        "https://github.com/aeroplein/CodeYourTree",
                        null,
                        null,
                        false,
                        4,
                        "Technical Software Project",
                        "Turns user progress and streak data into persistent, visible state while keeping authentication and progress-management responsibilities explicit.",
                        "ivory",
                        "Full-Stack & Cloud",
                        """
                        // Engineering notes
                        API: REST endpoints
                        Security: JWT-based authentication
                        State: user and progress management
                        Visualization: streak tracking with HTML5 Canvas"""
                ),
                new Project(
                        "sshtunneling",
                        "Secure Tunneling Simulation",
                        "A native C++ networking simulation built around framed packets, bidirectional socket routing, concurrent client sessions, and cryptographic concepts. The implementation defines an explicit packet structure, routes traffic in both directions using select, handles client sessions concurrently, and uses OpenSSL primitives including AES-256-CTR and HMAC-SHA256. A multi-client transfer test exercises the network flow.",
                        List.of("C++", "POSIX Sockets", "OpenSSL", "Packet Framing", "Concurrency"),
                        "https://github.com/aeroplein/SSH-Tunneling",
                        null,
                        null,
                        true,
                        2,
                        "Systems Engineering · Learning Project",
                        "Demonstrates systems programming, network state, concurrency, packet framing, and cryptographic boundaries. This is not the SSH protocol or a production security product; it is a learning system for understanding routing and the limits of unauthenticated key exchange.",
                        "soft-wisteria",
                        "Backend & Systems",
                        """
                        // Engineering notes
                        Packet structure: explicit framed messages
                        Routing: bidirectional flow with select
                        Concurrency: per-client sessions
                        Primitives: AES-256-CTR + HMAC-SHA256
                        Boundary: learning simulation, not the SSH protocol"""
                ),
                new Project(
                        "stegodetector",
                        "StegoDetector - Hybrid Image Steganalysis & Threat Detection",
                        "Developed as an academic team project, StegoDetector is a hybrid image steganalysis system for detecting hidden information in digital images. It combines statistical image analysis with ensemble machine learning to identify suspicious patterns associated with steganographic manipulation. The project includes feature extraction and diagnostic pipelines using OpenCV and NumPy, a Soft Voting Ensemble combining XGBoost and Random Forest models, and Streamlit visualizations for inspecting predictions, extracted features, and model behavior during evaluation.",
                        List.of("Python", "Scikit-learn", "XGBoost", "OpenCV", "NumPy", "Streamlit"),
                        "https://github.com/aeroplein/image-steganography-and-staganalysis",
                        null,
                        null,
                        false,
                        5,
                        "Academic Team Project",
                        "Achieved 80% classification accuracy. Demonstrates applied machine learning, image processing, cybersecurity thinking, feature engineering, model evaluation, and diagnostic tooling. Presented as a portfolio-scale detection project, not a production security system.",
                        "soft-blossom",
                        "AI & Data Science",
                        """
                        # Evaluation notes
                        feature_extraction = "OpenCV + NumPy"
                        ensemble = "XGBoost + Random Forest"
                        inspection = "Streamlit diagnostics"
                        classification_accuracy = "80%"
                        scope = portfolio-scale detection project"""
                ),
                new Project(
                        "generative-xai-adhd",
                        "Generative XAI for ADHD-EEG",
                        "A research-oriented PyTorch experiment exploring generative modeling and explainability questions in pediatric EEG analysis. The work centers on what would make an experiment interpretable: preprocessing, subject-level splits, baselines, reproducibility, explainability methods, and clearly stated limitations.",
                        List.of("Python", "PyTorch", "EEG Analysis", "Generative Modeling", "XAI"),
                        "https://github.com/aeroplein/Generative-XAI-ADHD-EEG",
                        null,
                        null,
                        false,
                        6,
                        "Research-Oriented Implementation",
                        "Asks what evidence is required before a model output can be understood or trusted. It does not imply diagnosis, clinical validity, publication, or validated results.",
                        "ivory",
                        "AI & Data Science",
                        """
                        # Experiment framing
                        focus = [
                            "preprocessing",
                            "subject-level splits",
                            "baselines and reproducibility",
                            "explainability methods",
                            "clearly stated limitations",
                        ]"""
                ),
                new Project(
                        "overengineering-detector",
                        "Overengineering Detector",
                        "A rule-based architecture tool that compares stack complexity with project scale and usage context. Instead of treating “overengineered” as an opinion, the system uses inspectable criteria to produce deterministic scores, risk flags, recommendations, what-if scenarios, and persisted analysis history. It also distinguishes excessive complexity from systems that may be too simple for their requirements.",
                        List.of("Node.js", "Express", "JavaScript", "PostgreSQL", "Rule-Based Scoring"),
                        "https://github.com/aeroplein/Overengineering-Detector",
                        null,
                        null,
                        true,
                        3,
                        "Backend & Architecture Implementation",
                        "Analyses are ownership-filtered, related results are stored transactionally, and scoring thresholds are covered by tests. Demonstrates domain modeling, deterministic reasoning, authorization, testable thresholds, and product judgment.",
                        "soft-wisteria",
                        "Backend & Systems",
                        """
                        // Engineering notes
                        Source of truth: deterministic scoring rules
                        Inputs: stack complexity, scale, and usage context
                        Outputs: scores, flags, recommendations, and what-if scenarios
                        Persistence: ownership-filtered analysis history
                        Evaluation: test-covered thresholds"""
                ),
                new Project(
                        "music-genre-detection",
                        "Music Genre Classification",
                        "Developed as an academic team project, this audio-ML pipeline segments tracks, extracts 40-coefficient MFCC sequences with Librosa, stores processed data in HDF5, and explores a TensorFlow/Keras CNN-LSTM model. The preprocessing work is inspectable. Final reproducible evaluation is still in progress, so the project is presented as an experiment pipeline rather than a completed classifier.",
                        List.of("Python", "TensorFlow", "Keras", "Librosa", "MFCC", "HDF5"),
                        "https://github.com/aeroplein/Deep-Learning-Music-Genre_Detection",
                        null,
                        null,
                        false,
                        7,
                        "Academic Team Project",
                        "Exposes the representation and data decisions that happen before a model produces an answer. No final accuracy metric is claimed.",
                        "soft-blossom",
                        "AI & Data Science",
                        """
                        # Pipeline notes
                        audio_window = "3-second segments"
                        representation = "40-coefficient MFCC sequences"
                        storage = "HDF5"
                        model_direction = "TensorFlow/Keras CNN-LSTM"
                        status = final reproducible evaluation in progress"""
                ),
                new Project(
                        "frantic-barista",
                        "Frantic Barista",
                        "An early Canvas interaction prototype with a JavaScript Cup entity that models espresso, oat milk, and berry syrup as state and renders their proportions as visible layers. The surrounding interface establishes orders, timing, score, and patience concepts, but a complete game loop and customer system are not yet present.",
                        List.of("JavaScript", "HTML5 Canvas", "Vite", "Tailwind CSS"),
                        "https://github.com/aeroplein/frantic-barista",
                        null,
                        null,
                        false,
                        8,
                        "Interaction Prototype",
                        "Translates internal ingredient state into an immediate visual representation while stating the prototype boundary clearly.",
                        "soft-blossom",
                        "Interactive Apps",
                        """
                        // Prototype notes
                        State: espresso, oat milk, and berry syrup ratios
                        Rendering: layered ingredient proportions on Canvas
                        UI concepts: orders, timing, score, and patience
                        Boundary: complete game loop and customer system not yet present"""
                ),
                new Project(
                        "university-automation-system",
                        "University Automation System",
                        "An academic Java Swing desktop application that models university operations through separate Admin, Instructor, and Student dashboards. It organizes the code into model, data, and UI layers, uses a singleton DataStore for structured text-file persistence, and supports users, departments, courses, enrollments, grade entry, transcripts, GPA calculation, reports, and role-specific navigation.",
                        List.of("Java", "Swing", "FlatLaf", "File Persistence", "MVC"),
                        "https://github.com/aeroplein/university-automation-system",
                        null,
                        null,
                        false,
                        9,
                        "Academic Desktop Application",
                        "Makes role boundaries and academic workflows explicit through separate dashboards, validation rules, and immediately persisted records. Its file-based storage and local credential model keep the scope clearly educational rather than production-grade.",
                        "ivory",
                        "Software Systems",
                        """
                        // Architecture notes
                        Interface: Java Swing + FlatLaf
                        Navigation: CardLayout + role-specific dashboards
                        State: singleton DataStore
                        Persistence: structured text files
                        Workflows: enrollment, grading, transcripts, and GPA
                        Boundary: academic desktop application"""
                ),
                new Project(
                        "mnist-digit-recognition",
                        "MNIST Handwritten Digit Recognition",
                        "A compact TensorFlow/Keras learning project covering the full supervised-learning pipeline for handwritten-digit classification. It loads the standard MNIST train and test sets, flattens each 28×28 image into 784 features, normalizes pixel values, one-hot encodes labels, trains a 128–64–10 dense network, evaluates the held-out test set, and visualizes training and validation behavior.",
                        List.of("Python", "TensorFlow", "Keras", "NumPy", "Matplotlib"),
                        "https://github.com/aeroplein/MNIST-Handwritten-Digit-Recognition",
                        null,
                        null,
                        false,
                        10,
                        "Machine Learning Project",
                        "The repository reports 97.81% test accuracy after 10 epochs with a batch size of 128. Demonstrates preprocessing, model construction, evaluation, and diagnostic plotting while remaining a baseline MLP rather than an image-specific CNN.",
                        "soft-wisteria",
                        "AI & Data Science",
                        """
                        # Model notes
                        input = "28×28 pixels → 784 normalized features"
                        architecture = "Dense(128) → Dense(64) → Softmax(10)"
                        optimizer = "Adam"
                        training = "10 epochs · batch size 128"
                        reported_test_accuracy = "97.81%"
                        """
                ),
                new Project(
                        "cervical-cancer-prediction",
                        "Cervical Cancer Risk Prediction",
                        "A scikit-learn classification experiment using the Dx:Cancer target from a cervical-cancer risk-factor dataset. The pipeline converts values to numeric form, replaces missing entries with feature medians, creates a 70/30 train-test split, and evaluates a hard-voting ensemble of Logistic Regression, K-Nearest Neighbors, and Decision Tree models with a classification report.",
                        List.of("Python", "Scikit-learn", "Pandas", "NumPy", "VotingClassifier"),
                        "https://github.com/aeroplein/Cervical-Cancer-Prediction",
                        null,
                        null,
                        false,
                        11,
                        "Machine Learning Experiment",
                        "The repository reports approximately 99.6% accuracy on one split, with six positive examples in the displayed test report. I present it as practice in missing-data handling, class imbalance, ensemble evaluation, and limitation-aware reporting—not as a clinically validated model.",
                        "soft-blossom",
                        "AI & Data Science",
                        """
                        # Evaluation notes
                        missing_values = "numeric conversion + median imputation"
                        split = "70% train · 30% test · random_state 42"
                        ensemble = "Logistic Regression + KNN + Decision Tree"
                        voting = "hard"
                        reported_accuracy = "~99.6% on one split"
                        positive_test_examples = 6
                        scope = "learning experiment, not clinical validation"""
                )
        );
    }

    private List<Skill> skills() {
        List<Skill> skills = new ArrayList<>();
        int order = 1;

        order = addSkills(skills, "Protecting Boundaries", order,
                "C#|fluent", "ASP.NET Core|fluent", "Spring Security|fluent",
                "JWT and cookie authentication|fluent", "Authorization|fluent",
                "DTO validation|fluent", "Error handling|fluent");
        order = addSkills(skills, "Modeling Persistent State", order,
                "PostgreSQL|fluent", "Microsoft SQL Server|fluent",
                "Entity Framework Core|fluent", "JPA/Hibernate|fluent",
                "Transactions|fluent", "Migrations|fluent", "Constraints|fluent");
        order = addSkills(skills, "Understanding Data Flow", order,
                "C|fluent", "C++|fluent", "POSIX sockets|fluent",
                "Packet framing|fluent", "Threads|fluent", "select|fluent",
                "Buffer handling|fluent", "OpenSSL concepts|fluent");
        order = addSkills(skills, "Evaluating Data & Models", order,
                "Python|fluent", "TensorFlow/Keras|fluent", "PyTorch|fluent",
                "Pandas|fluent", "Librosa|fluent", "MFCC preprocessing|fluent",
                "HDF5|fluent", "Experiment design|fluent");
        addSkills(skills, "Making Behavior Visible", order,
                "TypeScript|fluent", "JavaScript|fluent", "React|fluent",
                "Vite|fluent", "HTML|fluent", "CSS|fluent", "Canvas|fluent",
                "API integration|fluent");

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
                        "Developer Ergonomics and Compiler UX",
                        "How can error messages and visual representations of program structure make debugging easier to understand for early learners?",
                        null,
                        "Research interest",
                        null,
                        "Sparkles",
                        1
                ),
                new ResearchItem(
                        "res-2",
                        "Resource-Aware Caching",
                        "When can probabilistic membership checks and recency-based eviction reduce wasted memory on small systems?",
                        null,
                        "Research interest",
                        null,
                        "Database",
                        2
                ),
                new ResearchItem(
                        "res-3",
                        "Human-Centered AI Interfaces",
                        "How can calmer visual systems improve focus and comprehension without reducing technical depth?",
                        null,
                        "Research interest",
                        null,
                        "Heart",
                        3
                ),
                new ResearchItem(
                        "res-4",
                        "Explainable Biomedical ML",
                        "What preprocessing, evaluation, and limitation reporting should be required before an EEG model’s output can be meaningfully interpreted?",
                        null,
                        "Research interest",
                        null,
                        "BookOpen",
                        4
                )
        );
    }
}
