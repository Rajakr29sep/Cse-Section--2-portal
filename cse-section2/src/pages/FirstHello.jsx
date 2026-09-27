import React, { useMemo, useState } from "react";
import "./FirstHello.css";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { students } from "../data/students";

// --------------------------------------------------
// Individual student card
// --------------------------------------------------

function StudentCard({ student, index }) {
  const [randomThought, setRandomThought] = useState(null);
  const [showThought, setShowThought] = useState(false);
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [6, -6]), {
    stiffness: 250,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-6, 6]), {
    stiffness: 250,
    damping: 20,
  });
  const randomMessages = [
    {
      type: "😂 PROGRAMMER WISDOM",
      text: "It works on my machine. Therefore, the machine is the problem.",
    },
    {
      type: "🔥 MOTIVATION",
      text: "You don't need to be the best today. Just be better than yesterday.",
    },
    {
      type: "🧠 RANDOM THOUGHT",
      text: "Somewhere, someone is debugging code that you haven't even written yet.",
    },
    {
      type: "💀 REALITY CHECK",
      text: "You opened this card instead of solving that DSA problem.",
    },
    {
      type: "🚀 MOTIVATION",
      text: "Future you is built by what you do when nobody is watching.",
    },
    {
      type: "☕ DEVELOPER LIFE",
      text: "Coffee: because apparently sleep is not a dependency.",
    },
    {
      type: "🐛 PROGRAMMER WISDOM",
      text: "Every bug has a story. Most of them start with 'I only changed one thing.'",
    },
    {
      type: "💡 RANDOM THOUGHT",
      text: "Your first implementation doesn't have to be beautiful. It just has to exist.",
    },
    {
      type: "😂 DEBUGGING",
      text: "Have you tried turning it off and pretending the bug never existed?",
    },
    {
      type: "🎯 FOCUS",
      text: "One problem. One concept. One hour. That's how skill compounds.",
    },
    {
      type: "💀 DEVELOPER LIFE",
      text: "The code was working perfectly until I decided to improve it.",
    },
    {
      type: "🔥 MOTIVATION",
      text: "Consistency beats motivation. Motivation disappears. Habits don't.",
    },
    {
      type: "🧑‍💻 RANDOM THOUGHT",
      text: "Somewhere in your codebase, there is a variable called temp that survived production.",
    },
    {
      type: "😂 PROGRAMMER WISDOM",
      text: "There are two kinds of developers: those who make bugs and those who haven't coded yet.",
    },
    {
      type: "🚀 FUTURE SDE",
      text: "Today's struggle is tomorrow's interview answer.",
    },
    {
      type: "🧠 DEEP THOUGHT",
      text: "You don't actually understand something until you can explain it without code.",
    },
    {
      type: "⚡ CHALLENGE",
      text: "Close this message and solve one problem. I'll never know.",
    },
    {
      type: "😂 COLLEGE LIFE",
      text: "Assignment deadline: tomorrow. Motivation: still loading...",
    },
    {
      type: "🎓 STUDENT WISDOM",
      text: "Attendance may be temporary. The screenshots from college are forever.",
    },
    {
      type: "💻 CODE LIFE",
      text: "Ctrl + S is basically a developer's heartbeat.",
    },
    {
      type: "🔥 MOTIVATION",
      text: "The gap between you and your goal is mostly a collection of small daily actions.",
    },
    {
      type: "🐛 BUG DETECTED",
      text: "Congratulations. You found a bug that didn't exist five minutes ago.",
    },
    {
      type: "💡 RANDOM THOUGHT",
      text: "What if the real Stack Overflow was the friends we made along the way?",
    },
    {
      type: "😎 SECRET MESSAGE",
      text: "You weren't supposed to click this. But since you're here... keep going.",
    },
    {
      type: "🚨 SYSTEM MESSAGE",
      text: "Productivity.exe has started successfully. Please do not close it.",
    },
    {
      type: "💀 DSA REALITY",
      text: "You understand the solution perfectly... until the interviewer asks you to code it.",
    },
    {
      type: "🧠 DSA WISDOM",
      text: "If brute force works, congratulations. Now ask yourself why it works.",
    },
    {
      type: "🚀 RANDOM THOUGHT",
      text: "Today's 'hard' problem becomes tomorrow's easy problem if you don't give up.",
    },
  ];
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;

    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      className="student-card"
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay: (index % 8) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -12,
      }}
     onClick={() => {
  const random =
    randomMessages[
      Math.floor(Math.random() * randomMessages.length)
    ];

  setRandomThought(random);
  setShowThought(true);

  setTimeout(() => {
    setShowThought(false);
  }, 3500);
}}
    >


      <AnimatePresence>
  {showThought && randomThought && (
    <motion.div
      className="thought-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowThought(false)}
    >
      <motion.div
        className="thought-modal"
        initial={{
          opacity: 0,
          scale: 0.65,
          y: 40,
          rotateX: 15,
          filter: "blur(12px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          y: -30,
          filter: "blur(10px)",
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="thought-glow"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="thought-icon"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 300,
          }}
        >
          ✨
        </motion.div>

        <motion.div
          className="thought-type"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {randomThought.type}
        </motion.div>

        <motion.div
          className="thought-text"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {randomThought.text}
        </motion.div>

        <motion.div
          className="thought-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.7 }}
        >
          ✦ Random thought unlocked ✦
        </motion.div>

        <motion.div
          className="thought-timer"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{
            duration: 3.5,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      {/* animated glow */}
      <div className="student-card-glow" />

      {/* giant background number */}

      <motion.div
        className="student-bg-number"
        initial={{
          opacity: 0,
          x: 30,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* top row */}

      <div className="student-top">
        <span className="student-index">
          {String(index + 1).padStart(2, "0")}
        </span>

        <motion.div
          className="student-arrow"
          whileHover={{
            rotate: 45,
            scale: 1.2,
          }}
        >
          <ArrowUpRight size={19} />
        </motion.div>
      </div>

      {/* name */}

      <div className="student-name-wrapper">
        <motion.h2
          whileHover={{
            x: 6,
          }}
        >
          {student.name}
        </motion.h2>

        <div className="student-line" />
      </div>

      {/* tag */}

      <div className="student-tag">
        <Sparkles size={12} />

        <span>{student.tag}</span>
      </div>

      {/* description */}

      <p className="student-description">{student.line}</p>

      {/* bottom */}

      <div className="student-bottom">
        <span>CSE — SECTION 02</span>

        <span className="student-discover">DISCOVER</span>
      </div>
    </motion.article>
  );
}

// --------------------------------------------------
// Main page
// --------------------------------------------------

export default function FirstHello() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [activeTag, setActiveTag] = useState("ALL");

  // Unique tags

  const tags = useMemo(() => {
    return ["ALL", ...students.map((student) => student.tag).slice(0, 7)];
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTag = activeTag === "ALL" || student.tag === activeTag;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="students-page">
      {/* =========================================
          BACKGROUND
      ========================================== */}

      <div className="students-noise" />

      <div className="students-orb students-orb-1" />
      <div className="students-orb students-orb-2" />
      <div className="students-orb students-orb-3" />

      {/* =========================================
          NAVIGATION
      ========================================== */}

      <motion.button
        className="students-back"
        initial={{
          opacity: 0,
          x: -30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />

        <span>BACK TO MEMORIES</span>
      </motion.button>

      {/* =========================================
          HERO
      ========================================== */}

      <section className="students-hero">
        <motion.div
          className="students-hero-kicker"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
        >
          <Sparkles size={14} />
          MEMORY 01
          <span />
          THE PEOPLE
        </motion.div>

        <div className="students-title-wrapper">
          <motion.div
            className="students-title-number"
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            01
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 70,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            THE PEOPLE
            <br />
            <em>behind</em>
            <br />
            the story.
          </motion.h1>
        </div>

        <motion.div
          className="students-intro"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
        >
          <p>
            We arrived as names on a sheet. Somewhere along the way, those names
            became personalities, inside jokes, late-night messages and
            memories.
          </p>

          <div className="student-count">
            <Users size={17} />

            <strong>{students.length}</strong>

            <span>STORIES</span>
          </div>
        </motion.div>
      </section>

      {/* =========================================
          SEARCH
      ========================================== */}

      <section className="students-controls">
        <div className="student-search">
          <Search size={17} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find someone..."
          />

          <AnimatePresence>
            {search && (
              <motion.button
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                onClick={() => setSearch("")}
              >
                <X size={15} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="student-filter">
          {tags.map((tag) => (
            <button
              key={tag}
              className={activeTag === tag ? "active" : ""}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================
          STUDENT GRID
      ========================================== */}

      <section className="students-grid-section">
        <div className="students-grid-heading">
          <div>
            <span>SECTION ARCHIVE</span>

            <h2>
              Meet the <em>characters.</em>
            </h2>
          </div>

          <div className="grid-counter">
            <Zap size={14} />
            {filteredStudents.length} visible
          </div>
        </div>

        <div className="students-grid">
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student) => {
              const originalIndex = students.indexOf(student);

              return (
                <StudentCard
                  key={student.name}
                  student={student}
                  index={originalIndex}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {filteredStudents.length === 0 && (
          <motion.div
            className="no-student"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <span>404</span>

            <h3>Character not found.</h3>

            <p>Maybe they're hiding in another classroom.</p>
          </motion.div>
        )}
      </section>

      {/* =========================================
          ENDING
      ========================================== */}

      <section className="students-ending">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
        >
          <span>AND THIS...</span>

          <h2>
            was only
            <br />
            <em>the beginning.</em>
          </h2>

          <p>The names may be written down. The memories aren't.</p>
        </motion.div>
      </section>
    </div>
  );
}
