import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  GraduationCap,
  Sparkles,
  Star,
  Telescope,
  X,
  Rocket,
  Code2,
  Globe2,
  Lightbulb,
  Heart,
} from "lucide-react";

import { students } from "../data/students";

const dreams = [
  {
    title: "Build Something That Matters",
    text: "Not just another project. Something people actually remember.",
    icon: Code2,
  },
  {
    title: "See The World",
    text: "Different cities. Different cultures. A bigger world beyond campus.",
    icon: Globe2,
  },
  {
    title: "Create",
    text: "Turn imagination into products, companies, art, ideas and stories.",
    icon: Lightbulb,
  },
  {
    title: "Make A Difference",
    text: "Use whatever we learn here to make someone's life a little better.",
    icon: Heart,
  },
];

const futureLines = [
  "Some will become engineers.",
  "Some will build companies.",
  "Some will create things nobody has imagined yet.",
  "Some will travel far away.",
  "Some will stay close to home.",
  "Some will change completely.",
  "And some will surprise even themselves.",
];

const aspirationPool = [
  "Software Engineer",
  "AI Builder",
  "Entrepreneur",
  "Product Creator",
  "Cybersecurity Expert",
  "Researcher",
  "Startup Founder",
  "Game Developer",
  "Cloud Architect",
  "Data Scientist",
  "Tech Leader",
  "Creative Technologist",
  "Problem Solver",
  "Global Explorer",
  "Innovator",
  "Future Founder",
];

function FloatingStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="gt-stars">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="gt-star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.1, 0.9, 0.15],
            scale: [0.7, 1.4, 0.7],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function DreamCard({ dream, index }) {
  const Icon = dream.icon;

  return (
    <motion.div
      className="gt-dream-card"
      initial={{
        opacity: 0,
        y: 100,
        rotateX: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -12,
        rotateY: 5,
        scale: 1.02,
      }}
    >
      <div className="gt-dream-number">0{index + 1}</div>

      <motion.div
        className="gt-dream-icon"
        whileHover={{
          rotate: 360,
          scale: 1.15,
        }}
        transition={{ duration: 0.7 }}
      >
        <Icon size={25} />
      </motion.div>

      <h3>{dream.title}</h3>
      <p>{dream.text}</p>

      <motion.div
        className="gt-dream-line"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.5 + index * 0.1,
        }}
      />
    </motion.div>
  );
}

function StudentDream({ student, index, onOpen }) {
  const aspiration = aspirationPool[index % aspirationPool.length];

  return (
    <motion.article
      className="gt-student-card"
      initial={{
        opacity: 0,
        y: 90,
        rotateX: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.75,
        delay: (index % 5) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
        scale: 1.015,
      }}
      onClick={() => onOpen(student, aspiration)}
    >
      <div className="gt-student-glow" />

      <div className="gt-student-top">
        <span className="gt-student-index">
          {String(index + 1).padStart(2, "0")}
        </span>

        <ArrowUpRight size={18} className="gt-student-arrow" />
      </div>

      <div className="gt-student-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="gt-student-info">
        <span className="gt-student-tag">
          {student.tag || "SECTION 2"}
        </span>

        <h3>{student.name}</h3>

        <div className="gt-student-dream">
          <Sparkles size={14} />
          <span>Maybe someday: {aspiration}</span>
        </div>
      </div>
    </motion.article>
  );
}

function DreamModal({ selected, onClose }) {
  if (!selected) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="gt-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="gt-modal"
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 50,
            rotateX: 15,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.85,
            y: 30,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 16,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="gt-modal-close" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="gt-modal-orbit">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Star size={24} />
            </motion.div>
          </div>

          <span className="gt-modal-label">ONE POSSIBLE FUTURE</span>

          <h2>{selected.student.name}</h2>

          <div className="gt-modal-dream">
            <Rocket size={18} />
            <span>{selected.aspiration}</span>
          </div>

          <p>
            Maybe this is where the road leads.
            <br />
            Maybe somewhere completely different.
            <br />
            <strong>That's the beautiful part.</strong>
          </p>

          <div className="gt-modal-footer">
            <span>THE FUTURE IS UNWRITTEN</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GrowingTogether() {
  const [selected, setSelected] = useState(null);

  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.25]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.22],
    [1, 0]
  );

  const giantTextX = useTransform(
    scrollYProgress,
    [0.15, 0.5],
    ["20%", "-35%"]
  );

  const rocketY = useTransform(
    scrollYProgress,
    [0.2, 0.75],
    [0, -500]
  );

  return (
    <main className="growing-together-page">
      <FloatingStars />

      {/* BACKGROUND ORBS */}

      <div className="gt-orb gt-orb-one" />
      <div className="gt-orb gt-orb-two" />
      <div className="gt-orb gt-orb-three" />

      {/* HERO */}

      <section className="gt-hero">
        <motion.div
          className="gt-hero-inner"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
          }}
        >
          <div className="gt-hero-eyebrow">
            <span />
            CHAPTER 04 / THE FUTURE
            <span />
          </div>

          <motion.div
            className="gt-hero-small"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ONE DAY...
          </motion.div>

          <motion.h1
            className="gt-hero-title"
            initial={{
              opacity: 0,
              y: 120,
              letterSpacing: "0.3em",
            }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "-0.05em",
            }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            WE&apos;LL
            <br />
            <span>GROW.</span>
          </motion.h1>

          <motion.p
            className="gt-hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 0.9,
            }}
          >
            Not all of us will walk the same road.
            <br />
            And that's exactly what makes this story beautiful.
          </motion.p>

          <motion.div
            className="gt-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <span>SCROLL INTO THE FUTURE</span>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* GIANT MOVING TEXT */}

      <section className="gt-marquee-section">
        <motion.div
          className="gt-marquee"
          style={{
            x: giantTextX,
          }}
        >
          <span>WE WERE HERE</span>
          <span>WE LEARNED</span>
          <span>WE LAUGHED</span>
          <span>WE GREW</span>
          <span>WE DREAMED</span>
        </motion.div>

        <div className="gt-marquee-overlay">
          <p>
            Somewhere between the first attendance
            <br />
            and the last goodbye...
          </p>
        </div>
      </section>

      {/* FUTURE LINES */}

      <section className="gt-future-section">
        <div className="gt-section-label">
          <span>01</span>
          THE PEOPLE WE'LL BECOME
        </div>

        <div className="gt-future-content">
          <div className="gt-future-sticky">
            <motion.div
              className="gt-future-icon"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Telescope size={48} />
            </motion.div>

            <h2>
              We don't know
              <br />
              <em>where</em> we'll end up.
            </h2>

            <p>
              And maybe that's the most exciting part.
            </p>
          </div>

          <div className="gt-future-lines">
            {futureLines.map((line, index) => (
              <motion.div
                key={line}
                className="gt-future-line"
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                }}
              >
                <span>0{index + 1}</span>
                <h3>{line}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DREAMS */}

      <section className="gt-dreams-section">
        <div className="gt-section-label">
          <span>02</span>
          THE THINGS WE DREAM ABOUT
        </div>

        <div className="gt-dreams-header">
          <motion.h2
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
          >
            BIG DREAMS.
            <br />
            <span>SMALL BEGINNINGS.</span>
          </motion.h2>

          <p>
            Every ambitious future begins with a very ordinary
            moment where someone decides:
            <strong> "I'm going to try."</strong>
          </p>
        </div>

        <div className="gt-dream-grid">
          {dreams.map((dream, index) => (
            <DreamCard
              key={dream.title}
              dream={dream}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ROCKET TRANSITION */}

      <section className="gt-launch-section">
        <motion.div
          className="gt-rocket"
          style={{
            y: rocketY,
          }}
        >
          <Rocket size={34} />
        </motion.div>

        <motion.div
          className="gt-launch-ring ring-one"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="gt-launch-ring ring-two"
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
          }}
        />

        <motion.h2
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          READY?
        </motion.h2>

        <p>
          Then let's see where everyone dreams of going.
        </p>
      </section>

      {/* EVERYONE'S FUTURE */}

      <section className="gt-students-section">
        <div className="gt-section-label">
          <span>03</span>
          69 STORIES / 69 POSSIBILITIES
        </div>

        <div className="gt-students-heading">
          <motion.h2
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            YOUR FUTURE
            <br />
            <span>IS YOURS.</span>
          </motion.h2>

          <p>
            These aren't predictions.
            <br />
            They're tiny fictional glimpses of the infinite
            possibilities waiting ahead.
          </p>
        </div>

        <div className="gt-students-grid">
          {students.map((student, index) => (
            <StudentDream
              key={`${student.name}-${index}`}
              student={student}
              index={index}
              onOpen={(studentData, aspiration) =>
                setSelected({
                  student: studentData,
                  aspiration,
                })
              }
            />
          ))}
        </div>
      </section>

      {/* CONSTELLATION */}

      <section className="gt-constellation">
        <FloatingStars />

        <div className="gt-constellation-content">
          <motion.div
            className="gt-constellation-icon"
            animate={{
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          >
            <Compass size={50} />
          </motion.div>

          <motion.span
            className="gt-constellation-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            DIFFERENT DIRECTIONS
          </motion.span>

          <motion.h2
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
          >
            Same sky.
            <br />
            <span>Different stars.</span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
          >
            Maybe years from now we'll be scattered
            across cities, companies, countries and dreams.
          </motion.p>

          <div className="gt-constellation-dots">
            {Array.from({ length: 35 }).map((_, index) => (
              <motion.span
                key={index}
                className="gt-constellation-dot"
                animate={{
                  opacity: [0.15, 1, 0.15],
                  scale: [0.8, 1.4, 0.8],
                }}
                transition={{
                  duration: 2 + (index % 4),
                  delay: index * 0.08,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}

      <section className="gt-closing">
        <motion.div
          className="gt-closing-number"
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 0.08,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          2024
        </motion.div>

        <div className="gt-closing-content">
          <span className="gt-closing-label">
            AND WHEN WE LOOK BACK...
          </span>

          <motion.h2
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
          >
            We won't remember
            <br />
            <em>every assignment.</em>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 0.9,
            }}
          >
            We won't remember every lecture.
            <br />
            We won't remember every deadline.
            <br />
            We probably won't even remember every exam.
          </motion.p>

          <motion.div
            className="gt-closing-divider"
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.4,
            }}
          />

          <motion.h3
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
              delay: 0.5,
            }}
          >
            We'll remember
            <br />
            <span>who was there.</span>
          </motion.h3>

          <motion.div
            className="gt-final-message"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.8,
              duration: 1,
            }}
          >
            <Sparkles size={18} />
            <span>
              Whatever happens next, Section 2 will always be one
              of the chapters that got us there.
            </span>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="gt-footer">
        <div className="gt-footer-top">
          <span>CSE SECTION 2</span>
          <span>2024 — ∞</span>
        </div>

        <div className="gt-footer-main">
          <motion.h2
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            TO BE
            <br />
            <span>CONTINUED...</span>
          </motion.h2>

          <div className="gt-footer-orbit">
            <GraduationCap size={35} />

            <motion.div
              className="gt-orbit-ring"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span />
            </motion.div>
          </div>
        </div>

        <div className="gt-footer-bottom">
          <span>WE CAME AS STUDENTS.</span>
          <span>WE LEAVE WITH STORIES.</span>
        </div>
      </footer>

      <DreamModal
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}