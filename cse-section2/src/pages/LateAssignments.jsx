import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowDown,
  Clock3,
  FileText,
  Upload,
  Check,
  AlertTriangle,
  Coffee,
  Moon,
  Send,
  Zap,
  Timer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   TIMELINE DATA
========================================================= */

const timeline = [
  {
    time: "DAY - 5",
    title: "WE HAVE PLENTY OF TIME.",
    text: "Assignment announced. Everyone nods confidently. Someone says, 'Bhai aaj hi kar lunga.' Nobody does it.",
    icon: Clock3,
  },
  {
    time: "DAY - 3",
    title: "I'LL START TOMORROW.",
    text: "Tomorrow has officially been promoted to Project Manager.",
    icon: Coffee,
  },
  {
    time: "DAY - 1",
    title: "WAIT... TOMORROW?",
    text: "Suddenly the deadline becomes real. The PDF folder gets opened. The brain starts negotiating.",
    icon: AlertTriangle,
  },
  {
    time: "10:47 PM",
    title: "THE GRIND BEGINS.",
    text: "Laptop brightness: 100%. Motivation: questionable. Spotify: extremely necessary.",
    icon: Zap,
  },
  {
    time: "11:21 PM",
    title: "BRO SEND YOURS.",
    text: "The legendary message appears. One person asks for the assignment. Another asks for the format. Chaos has entered the chat.",
    icon: Send,
  },
  {
    time: "11:48 PM",
    title: "PDF CONVERSION ARC.",
    text: "Word file → PDF → PDF corrupted → PDF again → rename_final_FINAL2.pdf.",
    icon: FileText,
  },
  {
    time: "11:58 PM",
    title: "THE FINAL BOSS.",
    text: "Upload button clicked. Internet connection suddenly decides to discover philosophy.",
    icon: Upload,
  },
  {
    time: "11:59 PM",
    title: "SUBMITTED.",
    text: "The most beautiful word in the English language.",
    icon: Check,
  },
];

/* =========================================================
   FLOATING TEXT
========================================================= */

const floatingWords = [
  "SUBMIT",
  "PDF",
  "DEADLINE",
  "FINAL.pdf",
  "11:59 PM",
  "BRO SEND",
  "URGENT",
  "UPLOAD",
  "DONE?",
  "WHERE IS THE LINK?",
  "SIR PLEASE",
  "ONE MINUTE",
];

/* =========================================================
   COUNTDOWN
========================================================= */

function FakeCountdown() {
  const [time, setTime] = useState(67);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) return 67;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <div className="deadline-countdown">
      <span>TIME REMAINING</span>

      <strong>
        00:{minutes}:{seconds}
      </strong>

      <div className="countdown-bar">
        <motion.div
          animate={{
            width: `${(time / 67) * 100}%`,
          }}
          transition={{
            duration: 0.8,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   TIMELINE CARD
========================================================= */

function AssignmentStage({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      className={`assignment-stage ${
        index % 2 === 0 ? "stage-left" : "stage-right"
      }`}
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.8,
        delay: 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="stage-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="stage-line-dot" />

      <motion.div
        className="stage-card"
        whileHover={{
          y: -8,
          rotateZ: index % 2 === 0 ? -1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
      >
        <div className="stage-top">
          <span>{item.time}</span>

          <motion.div
            className="stage-icon"
            whileHover={{
              rotate: 360,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <Icon size={18} />
          </motion.div>
        </div>

        <h3>{item.title}</h3>

        <p>{item.text}</p>

        <div className="stage-progress">
          <span />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function LateAssignments() {
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "35%"]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 18]
  );

  const [submitted, setSubmitted] = useState(false);

  const triggerSubmission = () => {
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <main className="late-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <motion.div
        className="late-background"
        style={{
          y: backgroundY,
        }}
      >
        <div className="late-grid" />

        <motion.div
          className="late-orb late-orb-one"
          animate={{
            x: [0, 100, -60, 0],
            y: [0, -70, 60, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="late-orb late-orb-two"
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 70, -40, 0],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* =====================================================
          FLOATING WORDS
      ===================================================== */}

      <div className="floating-assignment-words">
        {floatingWords.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            style={{
              left: `${4 + ((index * 19) % 90)}%`,
              top: `${5 + ((index * 27) % 88)}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.03, 0.1, 0.03],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 5 + (index % 4),
              repeat: Infinity,
              delay: index * 0.3,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <motion.button
        className="late-back"
        onClick={() => navigate("/")}
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
      >
        <ArrowLeft size={17} />
        <span>BACK TO OUR STORY</span>
      </motion.button>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="late-hero">

        <motion.div
          className="late-small-label"
          initial={{
            opacity: 0,
            letterSpacing: "0.8em",
          }}
          animate={{
            opacity: 1,
            letterSpacing: "0.3em",
          }}
          transition={{
            duration: 1.3,
          }}
        >
          CSE SECTION 02 • DEADLINE ARCHIVES
        </motion.div>

        <div className="late-title-wrap">

          <motion.div
            className="late-ghost-text"
            initial={{
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.3,
            }}
          >
            11:59
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 100,
              rotateX: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Late.
            <br />

            <span>Again.</span>
          </motion.h1>

          <motion.div
            className="late-clock"
            initial={{
              opacity: 0,
              scale: 0,
              rotate: -45,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 180,
            }}
          >
            <Clock3 size={34} />
          </motion.div>
        </div>

        <motion.p
          className="late-subtitle"
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
          A completely unnecessary documentary about how
          <br />
          <strong>
            "I'll do it tomorrow"
          </strong>
          became a lifestyle.
        </motion.p>

        <motion.div
          className="late-quote"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 1.15,
          }}
        >
          <span>THE GOLDEN RULE</span>

          <p>
            "It wasn't late.
            <br />
            It was submitted in a different timezone."
          </p>
        </motion.div>

      </section>

      {/* =====================================================
          COUNTDOWN
      ===================================================== */}

      <section className="deadline-zone">

        <motion.div
          className="deadline-panel"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="deadline-left">

            <div className="deadline-status">
              <span className="live-dot" />
              DEADLINE SIMULATION
            </div>

            <h2>
              THE CLOCK
              <br />
              <span>IS TICKING.</span>
            </h2>

            <p>
              Every assignment begins with confidence.
              Every assignment ends with Ctrl + S.
            </p>

          </div>

          <FakeCountdown />

        </motion.div>

      </section>

      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section className="late-philosophy">

        <motion.span
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          ANCIENT CSE WISDOM
        </motion.span>

        <motion.h2
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          Nobody starts
          <br />
          <i>on time.</i>
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.2,
          }}
        >
          They start when the deadline becomes emotionally
          significant.
        </motion.p>

      </section>

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section className="assignment-timeline">

        <div className="timeline-heading">

          <span>THE COMPLETE JOURNEY</span>

          <h2>
            From
            <br />
            <i>"easy"</i>
            <br />
            to
            <br />
            <strong>"BRO SEND PDF"</strong>
          </h2>

        </div>

        <div className="timeline-line">

          <motion.div
            className="timeline-progress"
            style={{
              scaleY: scrollYProgress,
            }}
          />

        </div>

        <div className="stages">

          {timeline.map((item, index) => (
            <AssignmentStage
              key={item.time}
              item={item}
              index={index}
            />
          ))}

        </div>

      </section>

      {/* =====================================================
          PDF FILE
      ===================================================== */}

      <section className="pdf-section">

        <motion.div
          className="pdf-floating"
          style={{
            rotate,
          }}
        >
          <FileText size={55} />
        </motion.div>

        <motion.div
          className="pdf-content"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >

          <span>THE FINAL FORM</span>

          <h2>
            FINAL
            <br />
            <i>FINAL2</i>
            <br />
            <strong>FINAL.pdf</strong>
          </h2>

          <p>
            Because apparently naming a file
            <br />
            "final.pdf" is never enough.
          </p>

        </motion.div>

        <div className="fake-file-list">

          {[
            "assignment.docx",
            "assignment_final.docx",
            "assignment_final2.docx",
            "assignment_final_REAL.docx",
            "assignment_final_REAL2.pdf",
          ].map((file, index) => (
            <motion.div
              key={file}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -80 : 80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.12,
              }}
            >
              <FileText size={15} />
              <span>{file}</span>

              {index === 4 && (
                <Check size={15} />
              )}
            </motion.div>
          ))}

        </div>

      </section>

      {/* =====================================================
          SUBMISSION BUTTON
      ===================================================== */}

      <section className="submission-section">

        <motion.div
          className="submission-glow"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.span
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          THE MOMENT OF TRUTH
        </motion.span>

        <motion.h2
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
        >
          READY?
        </motion.h2>

        <motion.button
          className="submit-button"
          onClick={triggerSubmission}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
        >
          <Upload size={18} />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.span
                key="submitted"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                SUBMITTED.
              </motion.span>
            ) : (
              <motion.span
                key="submit"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                SUBMIT ASSIGNMENT
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {submitted && (
            <motion.div
              className="submission-success"
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
            >
              <Check size={17} />
              <span>
                Submission successful. Somehow.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* =====================================================
          FINAL
      ===================================================== */}

      <section className="late-ending">

        <motion.div
          className="moon"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          🌙
        </motion.div>

        <span>AND THEN...</span>

        <motion.h2
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          We promised
          <br />
          <i>we'd start earlier</i>
          <br />
          next time.
        </motion.h2>

        <p>
          We didn't.
          <br />
          And honestly...
          <br />
          that's part of the story.
        </p>

        <div className="late-ending-line" />

        <strong>
          CSE SECTION 02 • DEADLINE SURVIVORS
        </strong>

      </section>

    </main>
  );
}