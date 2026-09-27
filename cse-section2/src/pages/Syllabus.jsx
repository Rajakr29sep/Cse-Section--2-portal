import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  Code2,
  FileText,
  GraduationCap,
  Layers3,
  Search,
  X,
  Sparkles,
  FlaskConical,
  Award,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Syllabus.css";

/* =========================================================
   DATA
   ========================================================= */

const semesterData = [
  {
    semester: 1,
    title: "Foundation",
    subtitle: "Engineering & Programming Fundamentals",
    color: "violet",
    subjects: [
      {
        code: "ES-101",
        name: "Programming for Problem Solving",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Fundamental programming concepts and problem-solving using a programming language.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Introduction to programming and problem solving",
              "Algorithms and flowcharts",
              "Programming fundamentals",
              "Variables, constants and data types",
              "Operators and expressions",
              "Input and output",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Conditional statements",
              "Looping constructs",
              "Functions",
              "Arrays",
              "Strings",
              "Basic problem-solving techniques",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Pointers",
              "Structures",
              "Dynamic memory concepts",
              "File handling",
              "Modular programming",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Problem decomposition",
              "Searching and sorting fundamentals",
              "Recursion",
              "Complexity basics",
              "Programming problem solving",
            ],
          },
        ],
      },

      {
        code: "ES-103 / ES-105",
        name: "Basics of Electrical / Electronics Engineering",
        credits: 3,
        type: "Elective",
        category: "Theory",
        description:
          "One of the two foundation engineering subjects is offered to the batch.",
        units: [
          {
            title: "Course Structure",
            topics: [
              "Basics of Electrical Engineering OR Basics of Electronics Engineering",
              "The exact paper is determined according to the scheme applicable to the batch.",
            ],
          },
        ],
      },

      {
        code: "BS-107",
        name: "Engineering Mathematics – I",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Mathematical foundations required for engineering and computer science.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Differential calculus",
              "Functions of several variables",
              "Partial derivatives",
              "Applications of derivatives",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Integral calculus",
              "Multiple integration",
              "Applications of integration",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Sequences and series",
              "Taylor and Maclaurin expansions",
              "Convergence concepts",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Differential equations",
              "First-order equations",
              "Higher-order equations",
              "Applications",
            ],
          },
        ],
      },

      {
        code: "BS-109 / BS-111",
        name: "Engineering Chemistry / Engineering Physics",
        credits: 3,
        type: "Elective",
        category: "Theory",
        description:
          "One of Engineering Chemistry or Engineering Physics is offered.",
        units: [
          {
            title: "Course Structure",
            topics: [
              "Engineering Chemistry OR Engineering Physics",
              "Paper offered depends on the batch scheme.",
            ],
          },
        ],
      },

      {
        code: "ES-113 / AEC-115",
        name: "Engineering Mechanics / Communication Skills",
        credits: 3,
        type: "Elective",
        category: "Theory",
        description:
          "One of Engineering Mechanics or Communication Skills.",
        units: [
          {
            title: "Course Structure",
            topics: [
              "Engineering Mechanics OR Communication Skills",
              "Paper offered depends on the batch scheme.",
            ],
          },
        ],
      },

      {
        code: "VAC-117",
        name: "Indian Constitution",
        credits: 2,
        type: "VAC",
        category: "Theory",
        description: "Value Added Course on the Indian Constitution.",
        units: [],
      },

      {
        code: "VAC-119",
        name: "Human Values & Ethics",
        credits: 2,
        type: "VAC",
        category: "Theory",
        description: "Value Added Course covering human values and ethics.",
        units: [],
      },

      {
        code: "ES-151",
        name: "Programming for Problem Solving Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description:
          "Practical programming exercises corresponding to Programming for Problem Solving.",
        units: [
          {
            title: "Laboratory",
            topics: [
              "Basic programming exercises",
              "Conditional and looping problems",
              "Functions and arrays",
              "Strings",
              "Pointers",
              "Structures",
              "Searching and sorting",
              "Recursion",
            ],
          },
        ],
      },
    ],
  },

  {
    semester: 2,
    title: "Core Computing",
    subtitle: "Data Structures, Mathematics & Computing",
    color: "blue",
    subjects: [
      {
        code: "PC-102",
        name: "Data Structures",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Fundamental data structures and their operations.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Introduction to data structures",
              "Arrays",
              "Linked lists",
              "Stacks",
              "Queues",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Trees",
              "Binary trees",
              "Binary search trees",
              "Tree traversal",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Graphs",
              "Graph representations",
              "Graph traversal",
              "Breadth First Search",
              "Depth First Search",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Searching",
              "Sorting",
              "Hashing",
              "Priority queues",
              "Complexity analysis",
            ],
          },
        ],
      },

      {
        code: "BS-104",
        name: "Engineering Mathematics – II",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Second-semester mathematical foundation.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Linear algebra",
              "Matrices",
              "Determinants",
              "Systems of linear equations",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Vector spaces",
              "Eigenvalues",
              "Eigenvectors",
              "Matrix transformations",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Probability fundamentals",
              "Random variables",
              "Probability distributions",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Statistics",
              "Correlation",
              "Regression",
              "Applications",
            ],
          },
        ],
      },

      {
        code: "PC-104",
        name: "Python Programming",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Programming concepts and problem solving using Python.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Python syntax",
              "Variables",
              "Data types",
              "Operators",
              "Input/output",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Conditional statements",
              "Loops",
              "Functions",
              "Strings",
              "Lists",
              "Tuples",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Dictionaries",
              "Sets",
              "Modules",
              "Packages",
              "Exception handling",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Object-oriented programming",
              "File handling",
              "Libraries",
              "Problem solving",
            ],
          },
        ],
      },

      {
        code: "PC-152",
        name: "Data Structures Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description:
          "Implementation of fundamental data structures and algorithms.",
        units: [
          {
            title: "Laboratory",
            topics: [
              "Arrays",
              "Linked lists",
              "Stacks",
              "Queues",
              "Trees",
              "Graphs",
              "Searching",
              "Sorting",
            ],
          },
        ],
      },

      {
        code: "PC-154",
        name: "Python Programming Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description:
          "Hands-on Python programming exercises.",
        units: [
          {
            title: "Laboratory",
            topics: [
              "Python basics",
              "Functions",
              "Collections",
              "File handling",
              "Exception handling",
              "Object-oriented programming",
            ],
          },
        ],
      },
    ],
  },

  {
    semester: 3,
    title: "Systems",
    subtitle: "Core Computer Science Foundations",
    color: "cyan",
    subjects: [
      {
        code: "PC-201",
        name: "Computer Organization and Architecture",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Organization of computer systems, processors, memory and I/O.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Computer organization",
              "Instruction set architecture",
              "Register organization",
              "Instruction cycle",
              "CPU organization",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Arithmetic operations",
              "ALU",
              "Control unit",
              "Instruction formats",
              "Addressing modes",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Memory organization",
              "Cache memory",
              "Virtual memory",
              "Memory hierarchy",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Input-output organization",
              "Interrupts",
              "DMA",
              "I/O processors",
            ],
          },
        ],
      },

      {
        code: "PC-203",
        name: "Database Management Systems",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Database models, relational databases, SQL and transaction processing.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Database concepts",
              "DBMS architecture",
              "Data models",
              "Entity Relationship model",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Relational model",
              "Relational algebra",
              "SQL",
              "Database constraints",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Functional dependencies",
              "Normalization",
              "Normal forms",
              "Schema design",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Transactions",
              "Concurrency control",
              "Recovery",
              "Database security",
            ],
          },
        ],
      },

      {
        code: "PC-205",
        name: "Object Oriented Programming using Java",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Object-oriented programming principles and Java programming.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Java fundamentals",
              "Classes and objects",
              "Constructors",
              "Methods",
              "Inheritance",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Polymorphism",
              "Abstraction",
              "Interfaces",
              "Packages",
              "Access control",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Exception handling",
              "Threads",
              "File handling",
              "Collections",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Generics",
              "GUI/event concepts",
              "Database connectivity",
              "Java application development",
            ],
          },
        ],
      },

      {
        code: "PC-207",
        name: "Design and Analysis of Algorithms",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Algorithm design paradigms and complexity analysis.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Algorithm analysis",
              "Asymptotic notation",
              "Recurrences",
              "Divide and conquer",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Greedy algorithms",
              "Dynamic programming",
              "Backtracking",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Graph algorithms",
              "Minimum spanning trees",
              "Shortest paths",
              "Graph traversal",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Branch and bound",
              "Complexity classes",
              "NP completeness",
              "Approximation concepts",
            ],
          },
        ],
      },

      {
        code: "PC-209",
        name: "Operating Systems",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Operating system concepts including processes, memory and file systems.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Operating system concepts",
              "Processes",
              "Process states",
              "Process scheduling",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Threads",
              "Synchronization",
              "Critical section",
              "Deadlocks",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Memory management",
              "Paging",
              "Segmentation",
              "Virtual memory",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "File systems",
              "Disk management",
              "I/O systems",
              "Protection and security",
            ],
          },
        ],
      },

      {
        code: "AEC-211 / AEC-213",
        name: "Principles of Management / Engineering Economics",
        credits: 2,
        type: "Elective",
        category: "Theory",
        description:
          "One of the two papers is offered according to the batch scheme.",
        units: [],
      },

      {
        code: "PC-251",
        name: "Database Management Systems Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Practical implementation of database concepts.",
        units: [
          {
            title: "Laboratory",
            topics: [
              "SQL",
              "DDL and DML",
              "Queries",
              "Joins",
              "Views",
              "Constraints",
              "Normalization",
            ],
          },
        ],
      },

      {
        code: "PC-253",
        name: "Object Oriented Programming using Java Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Java programming laboratory.",
        units: [
          {
            title: "Laboratory",
            topics: [
              "Classes and objects",
              "Inheritance",
              "Polymorphism",
              "Interfaces",
              "Exception handling",
              "Collections",
              "Threads",
            ],
          },
        ],
      },

      {
        code: "PC-255",
        name: "Design and Analysis of Algorithms Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Implementation of algorithmic techniques.",
        units: [
          {
            title: "Laboratory",
            topics: [
              "Sorting",
              "Searching",
              "Divide and conquer",
              "Greedy algorithms",
              "Dynamic programming",
              "Graph algorithms",
              "Backtracking",
            ],
          },
        ],
      },

      {
        code: "PC-257",
        name: "Operating Systems Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Practical exercises based on operating systems.",
        units: [
          {
            title: "Laboratory",
            topics: [
              "Process management",
              "Scheduling",
              "Synchronization",
              "Deadlocks",
              "Memory management",
              "File systems",
            ],
          },
        ],
      },

      {
        code: "PC-259",
        name: "Term Paper – I",
        credits: 2,
        type: "Term Paper",
        category: "Practical",
        description:
          "Term paper component; the handbook marks this paper as NUES.",
        units: [],
      },
    ],
  },

  {
    semester: 4,
    title: "Application Layer",
    subtitle: "Networks, AI/ML, Software & Web",
    color: "pink",
    subjects: [
      {
        code: "PC-202",
        name: "Theory of Computation",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Formal languages, automata, grammars and computational models.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Finite automata",
              "Regular languages",
              "Regular expressions",
              "Finite automata minimization",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Context-free grammars",
              "Pushdown automata",
              "Context-free languages",
              "Normal forms",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Turing machines",
              "Variants of Turing machines",
              "Decidability",
              "Recursive and recursively enumerable languages",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Computability",
              "Reducibility",
              "Complexity concepts",
              "Undecidable problems",
            ],
          },
        ],
      },

      {
        code: "PC-204",
        name: "Software Engineering",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Software development processes, requirements, design, testing and maintenance.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Software engineering fundamentals",
              "Software process models",
              "Agile development",
              "Requirements engineering",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "System modeling",
              "Architectural design",
              "Detailed design",
              "Design principles",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Software testing",
              "Verification and validation",
              "Test strategies",
              "Debugging",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Project management",
              "Software metrics",
              "Configuration management",
              "Maintenance",
            ],
          },
        ],
      },

      {
        code: "PC-206",
        name: "Computer Networks",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Computer communication, protocols, network layers and applications.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Network models",
              "OSI and TCP/IP",
              "Physical layer",
              "Data communication",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Data link layer",
              "Error detection",
              "Error correction",
              "MAC protocols",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Network layer",
              "Routing",
              "IPv4",
              "IPv6",
              "Congestion control",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Transport layer",
              "TCP",
              "UDP",
              "Application layer protocols",
              "Network security basics",
            ],
          },
        ],
      },

      {
        code: "PC-208",
        name: "Artificial Intelligence & Machine Learning",
        credits: 4,
        type: "Core",
        category: "Theory",
        description:
          "Artificial intelligence fundamentals and machine learning techniques.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Introduction to Artificial Intelligence",
              "Intelligent agents",
              "Problem solving",
              "Search techniques",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Knowledge representation",
              "Logic",
              "Inference",
              "Reasoning",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Machine learning fundamentals",
              "Supervised learning",
              "Unsupervised learning",
              "Model evaluation",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Classification",
              "Regression",
              "Clustering",
              "Applications of machine learning",
            ],
          },
        ],
      },

      {
        code: "PC-210",
        name: "Web Technologies",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Web architecture, client-side and server-side technologies.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Internet and Web fundamentals",
              "HTML",
              "CSS",
              "Web page structure",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "JavaScript",
              "DOM",
              "Events",
              "Client-side programming",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Server-side programming",
              "HTTP",
              "Sessions",
              "Cookies",
              "Web application architecture",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Databases and web applications",
              "Web security",
              "REST concepts",
              "Deployment concepts",
            ],
          },
        ],
      },

      {
        code: "PC-252",
        name: "Software Engineering Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Software engineering practical work.",
        units: [],
      },

      {
        code: "PC-254",
        name: "Computer Networks Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Networking experiments and protocol analysis.",
        units: [],
      },

      {
        code: "PC-256",
        name: "Artificial Intelligence & Machine Learning Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Practical AI and machine learning exercises.",
        units: [],
      },

      {
        code: "PC-258",
        name: "Web Technologies Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Practical web development exercises.",
        units: [],
      },

      {
        code: "PC-260",
        name: "Term Paper – II",
        credits: 2,
        type: "Term Paper",
        category: "Practical",
        description:
          "Term paper component associated with the fourth semester.",
        units: [],
      },
    ],
  },

  {
    semester: 5,
    title: "Advanced CSE",
    subtitle: "Compilers, C++, Statistics & Machine Learning",
    color: "orange",
    subjects: [
      {
        code: "PC-303",
        name: "Compiler Design",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Compiler phases, parsing, intermediate representation, optimization and code generation.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Introduction to compilers",
              "Phases of compiler",
              "Lexical analysis",
              "Regular expressions",
              "Finite automata",
              "Lexical analyzer",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Syntax analysis",
              "Context-free grammars",
              "Top-down parsing",
              "Bottom-up parsing",
              "LL parsing",
              "LR parsing",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Syntax directed translation",
              "Intermediate code generation",
              "Three-address code",
              "Symbol tables",
              "Type checking",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Code generation",
              "Code optimization",
              "Runtime environments",
              "Basic blocks",
              "Control-flow graphs",
            ],
          },
        ],
      },

      {
        code: "PC-305",
        name: "Programming in C++",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "C++ programming, object-oriented concepts and advanced language features.",
        units: [
          {
            title: "Unit I",
            topics: [
              "C++ fundamentals",
              "Classes and objects",
              "Constructors",
              "Destructors",
              "Functions",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Inheritance",
              "Polymorphism",
              "Virtual functions",
              "Abstract classes",
              "Operator overloading",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Templates",
              "Exception handling",
              "STL",
              "Containers",
              "Iterators",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "File handling",
              "Streams",
              "Advanced C++ concepts",
              "Generic programming",
            ],
          },
        ],
      },

      {
        code: "PE-1",
        name: "Elective – 1",
        credits: 4,
        type: "Elective",
        category: "Theory",
        description:
          "Program elective selected according to the approved CSE elective structure.",
        units: [],
      },

      {
        code: "PC-307",
        name: "Statistics and Statistical Modelling",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Statistical concepts and modelling techniques.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Descriptive statistics",
              "Measures of central tendency",
              "Measures of dispersion",
              "Probability fundamentals",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Random variables",
              "Probability distributions",
              "Expectation",
              "Variance",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Sampling",
              "Estimation",
              "Confidence intervals",
              "Hypothesis testing",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Correlation",
              "Regression",
              "Statistical modelling",
              "Model evaluation",
            ],
          },
        ],
      },

      {
        code: "PC-309",
        name: "Advanced Machine Learning",
        credits: 3,
        type: "Core",
        category: "Theory",
        description:
          "Advanced machine learning concepts and modelling approaches.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Advanced supervised learning",
              "Model selection",
              "Feature engineering",
              "Regularization",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Ensemble methods",
              "Decision trees",
              "Random forests",
              "Boosting",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Unsupervised learning",
              "Clustering",
              "Dimensionality reduction",
              "Feature extraction",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Model evaluation",
              "Hyperparameter tuning",
              "Advanced applications",
              "Practical ML workflows",
            ],
          },
        ],
      },

      {
        code: "PC-301",
        name: "Technical and Scientific Writing",
        credits: 2,
        type: "VAC",
        category: "Theory",
        description:
          "Technical communication, scientific writing and research presentation.",
        units: [
          {
            title: "Unit I",
            topics: [
              "Technical communication",
              "Technical reports",
              "Scientific writing",
            ],
          },
          {
            title: "Unit II",
            topics: [
              "Research papers",
              "Literature review",
              "Citation and referencing",
            ],
          },
          {
            title: "Unit III",
            topics: [
              "Data presentation",
              "Tables and figures",
              "Technical documentation",
            ],
          },
          {
            title: "Unit IV",
            topics: [
              "Research presentation",
              "Abstract writing",
              "Project documentation",
            ],
          },
        ],
      },

      {
        code: "PC-397",
        name: "Summer Training Report",
        credits: 2,
        type: "Training",
        category: "Practical",
        description:
          "Report component associated with summer training after the fourth semester.",
        units: [],
      },

      {
        code: "PC-399",
        name: "Term Paper – III",
        credits: 2,
        type: "Term Paper",
        category: "Practical",
        description: "Third term paper component.",
        units: [],
      },

      {
        code: "PC-321",
        name: "Compiler Design Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Compiler design laboratory.",
        units: [],
      },

      {
        code: "PC-323",
        name: "Programming in C++ Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "C++ programming laboratory.",
        units: [],
      },

      {
        code: "PC-395P",
        name: "Statistics and Statistical Modelling Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Statistics and modelling laboratory.",
        units: [],
      },

      {
        code: "PC-393P",
        name: "Advanced Machine Learning Lab",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description: "Advanced machine learning laboratory.",
        units: [],
      },
    ],
  },

  /* =========================================================
     SEMESTER 6
     ========================================================= */

  {
    semester: 6,
    title: "Specialization",
    subtitle: "CSE Core Electives & Advanced Areas",
    color: "emerald",
    subjects: [
      {
        code: "PE",
        name: "Programme Core Electives",
        credits: 3,
        type: "Elective Group",
        category: "Theory",
        description:
          "Programme Core Elective group. The CSE handbook provides elective groups and choices for this stage.",
        units: [
          {
            title: "Elective Group 1",
            topics: [
              "Computational Optimization",
              "Mobile Ad hoc Networks",
              "Digital Image Processing",
              "Fuzzy Sets and Fuzzy Logic",
              "Information Theory and Coding",
              "Cloud Computing",
              "Quantum Computing",
            ],
          },
          {
            title: "Elective Group 2",
            topics: [
              "Semantic Web",
              "Software Project Management",
              "Cyber Security and Forensics",
              "Mobile Computing",
              "E-Commerce",
              "Introduction to IoT",
            ],
          },
        ],
      },

      {
        code: "PCE",
        name: "Core Area Elective",
        credits: 4,
        type: "Elective",
        category: "Theory",
        description:
          "Core-area elective selected from the applicable CSE elective structure.",
        units: [],
      },

      {
        code: "LAB",
        name: "Elective Laboratory",
        credits: 1,
        type: "Lab",
        category: "Practical",
        description:
          "Laboratory component corresponding to the selected elective.",
        units: [],
      },
    ],
  },

  /* =========================================================
     SEMESTER 7
     ========================================================= */

  {
    semester: 7,
    title: "Professional",
    subtitle: "Electives, Minor Project & Training",
    color: "indigo",
    subjects: [
      {
        code: "PCE-4",
        name: "Core Area Elective – PCE 4 / MOOC",
        credits: 4,
        type: "Elective",
        category: "Theory",
        description:
          "Core area elective or approved MOOC option under the applicable route.",
        units: [],
      },

      {
        code: "PCE-5",
        name: "Core Area Elective – PCE 5 / MOOC",
        credits: 4,
        type: "Elective",
        category: "Theory",
        description:
          "Core area elective or approved MOOC option.",
        units: [],
      },

      {
        code: "EAE/OAE-4",
        name: "Emerging / Open Area Elective – 4",
        credits: 4,
        type: "Elective",
        category: "Theory",
        description:
          "Emerging-area or open-area elective offered under the applicable scheme.",
        units: [],
      },

      {
        code: "EAE/OAE-5",
        name: "Emerging / Open Area Elective – 5",
        credits: 4,
        type: "Elective",
        category: "Theory",
        description:
          "Emerging-area or open-area elective offered under the applicable scheme.",
        units: [],
      },

      {
        code: "PC-483",
        name: "Minor Project",
        credits: 8,
        type: "Project",
        category: "Practical",
        description:
          "Mandatory minor project. The project continues into the eighth semester.",
        units: [
          {
            title: "Project Structure",
            topics: [
              "Project conceptualization",
              "Background study",
              "Literature survey",
              "Problem identification",
              "Objectives",
              "Methodology",
              "Implementation",
              "Evaluation",
            ],
          },
        ],
      },

      {
        code: "PC-481",
        name: "Summer Training Report",
        credits: 2,
        type: "Training",
        category: "Practical",
        description:
          "Summer training report after the sixth semester.",
        units: [],
      },
    ],
  },

  /* =========================================================
     SEMESTER 8
     ========================================================= */

  {
    semester: 8,
    title: "Graduation",
    subtitle: "Major Project / Internship / Research",
    color: "rose",
    subjects: [
      {
        code: "PROJECT",
        name: "Major Project",
        credits: 12,
        type: "Project",
        category: "Practical",
        description:
          "Final major project component under the applicable degree route.",
        units: [
          {
            title: "Project",
            topics: [
              "Problem definition",
              "Literature review",
              "System design",
              "Implementation",
              "Testing and evaluation",
              "Documentation",
              "Final presentation",
              "Viva voce",
            ],
          },
        ],
      },

      {
        code: "INTERNSHIP",
        name: "Internship Route",
        credits: 10,
        type: "Internship",
        category: "Practical",
        description:
          "Students following the internship route complete the prescribed internship requirements.",
        units: [
          {
            title: "Internship",
            topics: [
              "Internship work",
              "Internship report",
              "Progress evaluation",
              "Viva voce",
            ],
          },
        ],
      },

      {
        code: "RESEARCH",
        name: "Research Route",
        credits: 18,
        type: "Research",
        category: "Practical",
        description:
          "Research route involving research work, report and evaluation.",
        units: [
          {
            title: "Research Work",
            topics: [
              "Research problem",
              "Literature review",
              "Research methodology",
              "Experimental / analytical work",
              "Research report",
              "Progress evaluation",
              "Viva voce",
            ],
          },
        ],
      },
    ],
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

const getTypeIcon = (type) => {
  if (type === "Lab") return <FlaskConical size={16} />;
  if (type === "Project") return <Layers3 size={16} />;
  if (type === "Research") return <Sparkles size={16} />;
  if (type === "Internship") return <Award size={16} />;
  if (type === "Training") return <FileText size={16} />;

  return <BookOpen size={16} />;
};

/* =========================================================
   SUBJECT MODAL
   ========================================================= */

function SubjectModal({ subject, onClose }) {
  const [openUnit, setOpenUnit] = useState(0);

  if (!subject) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="syllabus-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="syllabus-modal"
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 35,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.94,
            y: 35,
          }}
          transition={{
            duration: 0.28,
            ease: "easeOut",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-top">
            <div>
              <div className="modal-code">{subject.code}</div>

              <h2>{subject.name}</h2>

              <p className="modal-description">
                {subject.description}
              </p>
            </div>

            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={21} />
            </button>
          </div>

          <div className="modal-meta">
            <span>
              <Award size={15} />
              {subject.credits} Credit
              {subject.credits !== 1 ? "s" : ""}
            </span>

            <span>
              {getTypeIcon(subject.type)}
              {subject.type}
            </span>

            <span>
              <BookOpen size={15} />
              {subject.category}
            </span>
          </div>

          <div className="modal-divider" />

          <div className="modal-heading">
            <div>
              <span className="mini-label">COURSE CONTENT</span>
              <h3>Full Syllabus</h3>
            </div>

            <span className="unit-count">
              {subject.units?.length || 0} Sections
            </span>
          </div>

          {subject.units && subject.units.length > 0 ? (
            <div className="unit-list">
              {subject.units.map((unit, index) => {
                const isOpen = openUnit === index;

                return (
                  <div
                    className={`unit-item ${
                      isOpen ? "unit-open" : ""
                    }`}
                    key={unit.title}
                  >
                    <button
                      className="unit-header"
                      onClick={() =>
                        setOpenUnit(isOpen ? -1 : index)
                      }
                    >
                      <div className="unit-title">
                        <span className="unit-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span>{unit.title}</span>
                      </div>

                      {isOpen ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="unit-content"
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                        >
                          <ul>
                            {unit.topics.map((topic, i) => (
                              <li key={i}>{topic}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-syllabus">
              <FileText size={30} />

              <h4>Course structure available</h4>

              <p>
                The supplied handbook identifies this paper/course
                in the CSE scheme. Detailed unit-wise syllabus text
                is not present in the extracted source for this
                course.
              </p>
            </div>
          )}

          <div className="modal-footer">
            <span>
              <Sparkles size={14} />
              B.Tech CSE · USICT
            </span>

            <button
              className="modal-done"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   SUBJECT CARD
   ========================================================= */

function SubjectCard({ subject, index, onClick }) {
  return (
    <motion.button
      className="subject-card"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.035,
      }}
      whileHover={{
        y: -5,
      }}
      whileTap={{
        scale: 0.985,
      }}
    >
      <div className="subject-card-top">
        <div className="subject-icon">
          {getTypeIcon(subject.type)}
        </div>

        <span
          className={`subject-badge ${subject.type
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {subject.type}
        </span>
      </div>

      <div className="subject-code">
        {subject.code}
      </div>

      <h3>{subject.name}</h3>

      <p>{subject.description}</p>

      <div className="subject-bottom">
        <span>
          <Clock3 size={14} />
          {subject.credits} Credits
        </span>

        <span className="view-syllabus">
          View
          <ChevronRight size={16} />
        </span>
      </div>
    </motion.button>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function Syllabus() {
  const [activeSemester, setActiveSemester] = useState(1);
  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const currentSemester = semesterData.find(
    (item) => item.semester === activeSemester
  );

  const filteredSubjects = useMemo(() => {
    if (!currentSemester) return [];

    return currentSemester.subjects.filter((subject) => {
      const matchesSearch =
        subject.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        subject.code
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        subject.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [currentSemester, search, filter]);

  const totalCredits = currentSemester?.subjects.reduce(
    (sum, subject) => sum + (subject.credits || 0),
    0
  );

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <div className="syllabus-page">
      {/* BACKGROUND */}
      <div className="syllabus-bg">
        <div className="syllabus-orb orb-one" />
        <div className="syllabus-orb orb-two" />
        <div className="syllabus-orb orb-three" />

        <div className="grid-overlay" />
      </div>

      {/* TOP NAV */}
      <header className="syllabus-nav">
        <button
          className="back-button"
          onClick={goBack}
        >
          <ArrowLeft size={18} />
          <span>Section 2</span>
        </button>

        <div className="nav-center">
          <div className="nav-logo">
            <GraduationCap size={20} />
          </div>

          <div>
            <strong>Academic Hub</strong>
            <span>B.Tech CSE</span>
          </div>
        </div>

        <div className="nav-status">
          <span className="status-dot" />
          USICT
        </div>
      </header>

      {/* MAIN */}
      <main className="syllabus-main">
        {/* HERO */}
        <motion.section
          className="syllabus-hero"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="hero-left">
            <div className="hero-kicker">
              <Sparkles size={15} />
              ACADEMICS · B.TECH CSE
            </div>

            <h1>
              Your complete
              <span> CSE journey.</span>
            </h1>

            <p>
              Explore every semester, subject, lab and
              project. Click any subject to open its syllabus.
            </p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span>SEMESTERS</span>
              <strong>08</strong>
            </div>

            <div className="hero-stat">
              <span>PROGRAM</span>
              <strong>CSE</strong>
            </div>

            <div className="hero-stat">
              <span>UNIVERSITY</span>
              <strong>USICT</strong>
            </div>
          </div>
        </motion.section>

        {/* SEMESTER SELECTOR */}
        <section className="semester-section">
          <div className="section-heading">
            <div>
              <span className="mini-label">
                ACADEMIC TIMELINE
              </span>

              <h2>Choose Semester</h2>
            </div>

            <div className="semester-progress">
              <span>01</span>

              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  animate={{
                    width: `${
                      (activeSemester / 8) * 100
                    }%`,
                  }}
                />
              </div>

              <span>08</span>
            </div>
          </div>

          <div className="semester-tabs">
            {semesterData.map((semester) => {
              const active =
                activeSemester === semester.semester;

              return (
                <motion.button
                  key={semester.semester}
                  className={`semester-tab ${
                    active ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveSemester(
                      semester.semester
                    );
                    setSearch("");
                    setFilter("All");
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="semester-number">
                    {String(semester.semester).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="semester-tab-title">
                    Semester {semester.semester}
                  </span>

                  {active && (
                    <motion.div
                      className="active-indicator"
                      layoutId="semester-indicator"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* SEMESTER HEADER */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeSemester}
            className="current-semester"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
          >
            <div>
              <div className="semester-label">
                SEMESTER{" "}
                {String(activeSemester).padStart(2, "0")}
              </div>

              <h2>
                {currentSemester?.title}
              </h2>

              <p>
                {currentSemester?.subtitle}
              </p>
            </div>

            <div className="semester-credit">
              <span>Total listed credits</span>
              <strong>{totalCredits}</strong>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* CONTROLS */}
        <section className="subject-controls">
          <div className="search-box">
            <Search size={18} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search subject or course code..."
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="clear-search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="filter-buttons">
            {[
              "All",
              "Core",
              "Lab",
              "Elective",
              "Project",
              "Training",
              "Internship",
              "Research",
              "VAC",
              "Term Paper",
            ].map((item) => (
              <button
                key={item}
                className={
                  filter === item ? "selected" : ""
                }
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* SUBJECTS */}
        <section className="subjects-section">
          <div className="subject-section-header">
            <div>
              <span className="mini-label">
                COURSE CATALOG
              </span>

              <h2>
                Semester {activeSemester} Subjects
              </h2>
            </div>

            <span className="subject-count">
              {filteredSubjects.length} courses
            </span>
          </div>

          {filteredSubjects.length > 0 ? (
            <div className="subject-grid">
              {filteredSubjects.map(
                (subject, index) => (
                  <SubjectCard
                    key={`${subject.code}-${subject.name}`}
                    subject={subject}
                    index={index}
                    onClick={() =>
                      setSelectedSubject(subject)
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={35} />

              <h3>No subjects found</h3>

              <p>
                Try another subject name or remove the
                selected filter.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* FOOTER INFO */}
        <section className="syllabus-info">
          <div className="info-icon">
            <BookOpen size={20} />
          </div>

          <div>
            <h3>How to use this page</h3>

            <p>
              Select a semester and click any subject card
              to open its syllabus. Core, laboratory,
              elective and project components are separated
              using course badges.
            </p>
          </div>

          <div className="info-tag">
            <Code2 size={15} />
            CSE Major Discipline
          </div>
        </section>
      </main>

      {/* SUBJECT MODAL */}
      {selectedSubject && (
        <SubjectModal
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
}