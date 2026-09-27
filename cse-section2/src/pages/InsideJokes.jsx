import React, { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Flame,
  Laugh,
  Search,
  Shuffle,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   INSIDE JOKES
   ---------------------------------------------------------
   These are playful fictional classroom-style roasts.
   Nothing here is intended as a factual statement about
   any student.
========================================================= */

const jokes = [
  {
    name: "Ankush Kumar",
    tag: "THE STARTER PACK",
    joke: "If Section 2 had a 'Start Meeting' button, Ankush would somehow be standing next to it before everyone else.",
    emoji: "🚀",
  },
  {
    name: "Umesh Prajapati",
    tag: "THE BUILDER",
    joke: "Give Umesh 5 minutes and a random problem. He'll return with a solution, a diagram and absolutely no explanation.",
    emoji: "🔧",
  },
  {
    name: "Anshul",
    tag: "THE WILDCARD",
    joke: "Nobody knows what Anshul is about to do. Including Anshul. That's what makes the plot interesting.",
    emoji: "🎲",
  },
  {
    name: "Akash",
    tag: "THE SKY WALKER",
    joke: "Teacher: 'Any doubts?' Akash: *looks towards the ceiling as if the answer is written somewhere up there.*",
    emoji: "☁️",
  },
  {
    name: "Gitanshu Goyal",
    tag: "THE STRATEGIST",
    joke: "While everyone is solving Question 1, Gitanshu is already calculating whether Question 5 is worth the emotional damage.",
    emoji: "♟️",
  },
  {
    name: "Prateek Singh",
    tag: "THE CODE RUNNER",
    joke: "Code works? Don't touch it. Prateek knows this ancient programmer law.",
    emoji: "💻",
  },
  {
    name: "Sanyam",
    tag: "THE CALM STORM",
    joke: "Entire class: PANIC. Sanyam: 'Relax.' Five minutes later: also PANIC.",
    emoji: "🌪️",
  },
  {
    name: "Sabir",
    tag: "THE STEADY ONE",
    joke: "While everyone changes their approach 17 times, Sabir is still on Step 1 like he made a legally binding commitment.",
    emoji: "🧘",
  },
  {
    name: "Sahil Verma",
    tag: "THE EXPLORER",
    joke: "One Google search somehow turns into 14 tabs, three tutorials and a completely different career path.",
    emoji: "🧭",
  },
  {
    name: "Shaurya Narain Singh",
    tag: "MAIN CHARACTER",
    joke: "Every classroom needs one person who enters like background music should automatically start playing.",
    emoji: "👑",
  },
  {
    name: "Riyansh",
    tag: "THE SPARK",
    joke: "Riyansh doesn't enter the conversation. Riyansh activates the conversation.",
    emoji: "⚡",
  },
  {
    name: "Yasir Sohail",
    tag: "THE CONNECTOR",
    joke: "Knows someone who knows someone who probably knows how to get the assignment submitted.",
    emoji: "🔗",
  },
  {
    name: "Kishlay Singh",
    tag: "PROBLEM SMASHER",
    joke: "Problem statement: 3 pages. Kishlay: 'Okay, but what if we just… solve it?'",
    emoji: "💥",
  },
  {
    name: "Samarth Gupta",
    tag: "IDEA FACTORY",
    joke: "Samarth has so many ideas that the real problem is deciding which idea to not turn into a project.",
    emoji: "💡",
  },
  {
    name: "Rohit Bisht",
    tag: "THE GRINDER",
    joke: "Rohit doesn't chase deadlines. Deadlines chase Rohit and occasionally catch him at 11:58 PM.",
    emoji: "🏃",
  },
  {
    name: "Devesh Kumar Singh",
    tag: "PLOT TWIST",
    joke: "You think you know the solution. Devesh: 'Interesting.' Suddenly there's a completely different solution.",
    emoji: "🌀",
  },
  {
    name: "Abhishek Bisht",
    tag: "THE SILENT FORCE",
    joke: "The room can be loud for 20 minutes. Abhishek says one sentence and somehow everyone suddenly understands the assignment.",
    emoji: "🗿",
  },
  {
    name: "Varun",
    tag: "THE PLOT TWIST",
    joke: "Expected behavior: normal. Actual behavior: Varun. Documentation unavailable.",
    emoji: "🎭",
  },
  {
    name: "Aarav",
    tag: "THE VISIONARY",
    joke: "Everyone: 'We need to finish this.' Aarav: 'Yes, but imagine if we made it unnecessarily futuristic.'",
    emoji: "🔭",
  },
  {
    name: "Jatin Kumar",
    tag: "THE HUSTLER",
    joke: "Jatin hears 'deadline' and treats it like a motivational speech.",
    emoji: "🔥",
  },
  {
    name: "Monu Kumar",
    tag: "THE VIBE",
    joke: "Some people bring notes to class. Monu brings atmosphere.",
    emoji: "😎",
  },
  {
    name: "Raja Kumar",
    tag: "THE CODE ARCHITECT",
    joke: "Raja: 'It's just a small project.' Also Raja: proceeds to create 14 folders, 7 components and somehow a backend.",
    emoji: "🏗️",
  },
  {
    name: "Ayush Gupta",
    tag: "THE ADAPTER",
    joke: "Give Ayush a new situation and exactly 30 seconds later he's acting like this was the plan all along.",
    emoji: "🦎",
  },
  {
    name: "Ayush Kumar Mishra",
    tag: "LOCKED IN",
    joke: "When Ayush gets focused, even the notification panel knows it shouldn't disturb him.",
    emoji: "🎯",
  },
  {
    name: "Athak Mukhija",
    tag: "THE UNSTOPPABLE",
    joke: "Everyone: 'Let's take a break.' Athak: 'From what?'",
    emoji: "⚡",
  },
  {
    name: "Arnesh Kumar Gupta",
    tag: "THE CALCULATOR",
    joke: "Some people guess. Arnesh somehow turns the guess into a mathematical operation.",
    emoji: "🧮",
  },
  {
    name: "Dhruv Seth",
    tag: "THE COMEBACK",
    joke: "Assignment forgotten. Confidence intact. Dhruv's comeback arc begins at 11:47 PM.",
    emoji: "🔄",
  },
  {
    name: "Anubhav Prakash",
    tag: "THE OBSERVER",
    joke: "Anubhav has already noticed the thing everyone else will understand approximately 12 minutes later.",
    emoji: "👀",
  },
  {
    name: "Suraj",
    tag: "THE SUNSHINE",
    joke: "If the classroom had brightness settings, Suraj would accidentally set it to maximum.",
    emoji: "☀️",
  },
  {
    name: "Vikram Singh",
    tag: "THE FORCE",
    joke: "Vikram doesn't need to say much. The entrance alone feels like a software update.",
    emoji: "⚔️",
  },
  {
    name: "Rupender Singh Rathore",
    tag: "THE LEGEND",
    joke: "The full name has enough syllables to sound like the final boss introduction.",
    emoji: "🏰",
  },
  {
    name: "Rajat",
    tag: "THE HIDDEN GEM",
    joke: "Rajat can stay quiet for half the conversation and then drop the sentence everyone remembers.",
    emoji: "💎",
  },
  {
    name: "Adarsh Singh",
    tag: "THE STANDARD",
    joke: "The word 'Adarsh' itself sounds like someone is about to ask us to behave properly.",
    emoji: "📏",
  },
  {
    name: "Ankit Kumar",
    tag: "THE DEBUGGER",
    joke: "Something broke. Nobody knows why. Ankit has already opened the console.",
    emoji: "🐛",
  },
  {
    name: "Garvit",
    tag: "THE ENERGY",
    joke: "Phone at 3%. Laptop at 4%. Garvit somehow operating at 137%.",
    emoji: "⚡",
  },
  {
    name: "Krish Raj Aryan",
    tag: "RISING STAR",
    joke: "Krish has the confidence of someone who already watched the tutorial before the tutorial even started.",
    emoji: "🌟",
  },
  {
    name: "Keshav Chaudhary",
    tag: "THE TACTICIAN",
    joke: "Keshav doesn't randomly choose an option. He chooses an option with lore.",
    emoji: "♟️",
  },
  {
    name: "Vansh Kumar",
    tag: "THE ADVENTURER",
    joke: "Normal plan: A. Vansh: 'What if we start from Q?'",
    emoji: "🗺️",
  },
  {
    name: "Tanish Gahlot",
    tag: "MOMENT MAKER",
    joke: "Tanish can turn a completely normal Tuesday into something the group chat will mention for six months.",
    emoji: "🎬",
  },
  {
    name: "Shubh Gupta",
    tag: "THE GOOD VIBE",
    joke: "Every section needs someone whose presence makes the group chat 14% more chaotic and 38% more fun.",
    emoji: "✨",
  },
  {
    name: "Ashutosh Chaubey",
    tag: "THE THINKER",
    joke: "Ashutosh asks one question and suddenly the entire class is questioning the existence of the syllabus.",
    emoji: "🧠",
  },
  {
    name: "Shivam Kumar Singh",
    tag: "THE GRAVITY",
    joke: "Somehow the conversation naturally ends up wherever Shivam is sitting.",
    emoji: "🪐",
  },
  {
    name: "Mehak",
    tag: "THE SPARKLE",
    joke: "Mehak's energy comes with a mysterious feature called 'unexpected update'.",
    emoji: "✨",
  },
  {
    name: "Angad Singh",
    tag: "THE WARRIOR",
    joke: "Assignment deadline: tomorrow. Angad: 'Good. We have time.'",
    emoji: "🛡️",
  },
  {
    name: "Chinmay Kapila",
    tag: "THE CURIOUS MIND",
    joke: "Chinmay asks the question that makes the teacher pause, the class pause and Google open.",
    emoji: "🔍",
  },
  {
    name: "Anubhav Tiwari",
    tag: "NEXT MOVE",
    joke: "Before everyone decides what to do, Anubhav has already thought about what happens after that.",
    emoji: "♟️",
  },
  {
    name: "Sarthak Narula",
    tag: "THE CREATOR",
    joke: "Sarthak sees an empty page and somehow interprets it as 'time to build something'.",
    emoji: "🎨",
  },
  {
    name: "Vikas Bhardwaj",
    tag: "THE EVOLVER",
    joke: "Version 1 was good. Vikas: 'But what if version 2 was unnecessarily better?'",
    emoji: "📈",
  },
  {
    name: "Zandu",
    tag: "THE CHAOS ENGINE",
    joke: "No explanation. No documentation. Just Zandu.",
    emoji: "💀",
  },
  {
    name: "Aaryan Garg",
    tag: "THE DREAMER",
    joke: "Aaryan doesn't see a deadline. He sees a future success story that starts approximately 8 hours before submission.",
    emoji: "🌌",
  },
  {
    name: "Tushar Kashyap",
    tag: "THE DEADLINE WARRIOR",
    joke: "11:59 PM isn't a deadline. It's Tushar's official working-hours announcement.",
    emoji: "⏰",
  },
  {
    name: "Arjun Meena",
    tag: "THE SHARPSHOOTER",
    joke: "Arjun approaches questions like a sniper: quiet, focused and waiting for the exact right moment.",
    emoji: "🎯",
  },
  {
    name: "Krish Ahuja",
    tag: "THE RISING FORCE",
    joke: "Krish has the suspicious confidence of someone who knows the answer but is waiting for everyone else to struggle first.",
    emoji: "🚀",
  },
  {
    name: "Vanshdi Singla",
    tag: "THE ORIGINAL",
    joke: "Vanshdi doesn't need a nickname. The name already has main-character credits.",
    emoji: "🎬",
  },
  {
    name: "Aryan Ghai",
    tag: "THE MOMENTUM",
    joke: "Once Aryan starts something, the only question is whether everyone else can keep up.",
    emoji: "🏎️",
  },
  {
    name: "Yash Gupta",
    tag: "THE CHALLENGER",
    joke: "Yash sees a normal solution and immediately asks the dangerous question: 'Can we make this cooler?'",
    emoji: "🥊",
  },
  {
    name: "Anant Sharma",
    tag: "THE DEEP THINKER",
    joke: "Question asked at 10:00. Anant is still thinking about the philosophical implications at 10:07.",
    emoji: "🧠",
  },
  {
    name: "Dheeraj Singh",
    tag: "THE STEADFAST",
    joke: "Everyone changed tabs 19 times. Dheeraj remained on the same page like a monk protecting ancient knowledge.",
    emoji: "🧘",
  },
  {
    name: "Devanshu Malik",
    tag: "ADVENTURE MODE",
    joke: "Devanshu's definition of 'let's try something different' is apparently 'let's see what happens.'",
    emoji: "🧭",
  },
  {
    name: "Harpreet",
    tag: "THE WARM HEART",
    joke: "Every group has the person who somehow makes a random Tuesday feel like a team event.",
    emoji: "❤️",
  },
  {
    name: "Ishant Sharma",
    tag: "THE NIGHT OWL",
    joke: "2 AM: everyone sleeping. Ishant: 'Actually, this is when the brain works best.'",
    emoji: "🌙",
  },
  {
    name: "Piyush Mishra",
    tag: "THE UNEXPECTED",
    joke: "If there were a spoiler warning for classroom conversations, Piyush would probably trigger it.",
    emoji: "🎲",
  },
  {
    name: "Guneet Singh",
    tag: "THE GAME PLAYER",
    joke: "Guneet reads the rules, understands the rules and then somehow finds the secret third option.",
    emoji: "🎮",
  },
  {
    name: "Yash Malhotra",
    tag: "THE FUTURE BUILDER",
    joke: "Yash doesn't just ask 'does it work?' The next question is already 'what can we build with it?'",
    emoji: "🏗️",
  },
  {
    name: "Vidhit Gill",
    tag: "THE DISCOVERER",
    joke: "One innocent question from Vidhit and suddenly everyone has discovered a new rabbit hole.",
    emoji: "🔎",
  },
  {
    name: "Vigyat",
    tag: "THE UNKNOWN VARIABLE",
    joke: "Every equation needs one variable nobody fully understands. Section 2 found Vigyat.",
    emoji: "❓",
  },
  {
    name: "Rahul Solanki",
    tag: "THE RELIABLE ONE",
    joke: "Group project crisis: 'Rahul?' — Somehow the name itself sounds like a backup plan.",
    emoji: "🛟",
  },
  {
    name: "Tushar Dahiya",
    tag: "FINAL BOSS",
    joke: "Every class has a final boss. The syllabus just forgot to mention where Tushar spawns.",
    emoji: "👾",
  },
  {
    name: "Anant Tehlan",
    tag: "THE LAST CHAPTER",
    joke: "Anant sounds like the final chapter, but somehow the story keeps adding new episodes.",
    emoji: "📖",
  },
];

/* =========================================================
   FLOATING BACKGROUND
========================================================= */

const floatingItems = [
  "😂",
  "🔥",
  "💀",
  "😭",
  "⚡",
  "👀",
  "🤝",
  "✨",
  "🗿",
  "🎭",
  "🚀",
  "💻",
];

/* =========================================================
   3D CARD
========================================================= */

function JokeCard({ person, index, onOpen }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-100, 100], [8, -8]),
    {
      stiffness: 180,
      damping: 18,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-100, 100], [-8, 8]),
    {
      stiffness: 180,
      damping: 18,
    }
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      className="inside-joke-card"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.75,
        delay: Math.min(index * 0.035, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.025,
        zIndex: 10,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(person)}
    >
      {/* CARD GLOW */}
      <div className="joke-card-glow" />

      {/* GIANT NUMBER */}
      <motion.div
        className="joke-card-number"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 0.055, x: 0 }}
        transition={{
          duration: 1,
          delay: Math.min(index * 0.03, 0.3),
        }}
      >
        {(index + 1).toString().padStart(2, "0")}
      </motion.div>

      {/* TOP */}
      <div className="joke-card-top">
        <span className="joke-index">
          #{String(index + 1).padStart(2, "0")}
        </span>

        <motion.span
          className="joke-emoji"
          whileHover={{
            scale: 1.3,
            rotate: 12,
          }}
        >
          {person.emoji}
        </motion.span>
      </div>

      {/* CONTENT */}
      <div className="joke-card-content">
        <motion.div
          className="joke-tag"
          whileHover={{
            x: 5,
          }}
        >
          {person.tag}
        </motion.div>

        <h3>{person.name}</h3>

        <p>{person.joke}</p>
      </div>

      {/* BOTTOM */}
      <div className="joke-card-bottom">
        <span>SECTION 02</span>

        <motion.div
          className="joke-arrow"
          whileHover={{
            rotate: 45,
            scale: 1.2,
          }}
        >
          <ArrowUpRight size={17} />
        </motion.div>
      </div>

      {/* SHINE */}
      <motion.div
        className="card-shine"
        initial={{ x: "-120%" }}
        whileHover={{
          x: "120%",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
    </motion.article>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function InsideJokes() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedJoke, setSelectedJoke] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);

  const filters = [
    "ALL",
    "CHAOS",
    "CODE",
    "VIBES",
    "LEGENDS",
  ];

  /* -----------------------------------------------
     FILTER LOGIC
  ------------------------------------------------ */

  const filteredJokes = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = jokes.filter((person) => {
      const matchesSearch =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.tag.toLowerCase().includes(query) ||
        person.joke.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      if (activeFilter === "ALL") return true;

      if (activeFilter === "CHAOS") {
        return (
          person.tag.includes("CHAOS") ||
          person.tag.includes("WILDCARD") ||
          person.tag.includes("PLOT") ||
          person.tag.includes("UNEXPECTED") ||
          person.tag.includes("DEADLINE")
        );
      }

      if (activeFilter === "CODE") {
        return (
          person.tag.includes("CODE") ||
          person.tag.includes("DEBUG") ||
          person.tag.includes("BUILDER") ||
          person.tag.includes("CREATOR") ||
          person.tag.includes("ARCHITECT")
        );
      }

      if (activeFilter === "VIBES") {
        return (
          person.tag.includes("VIBE") ||
          person.tag.includes("SPARK") ||
          person.tag.includes("SUNSHINE") ||
          person.tag.includes("ENERGY") ||
          person.tag.includes("WARM") ||
          person.tag.includes("SPARKLE")
        );
      }

      if (activeFilter === "LEGENDS") {
        return (
          person.tag.includes("LEGEND") ||
          person.tag.includes("MAIN") ||
          person.tag.includes("FINAL") ||
          person.tag.includes("ORIGINAL") ||
          person.tag.includes("FORCE")
        );
      }

      return true;
    });

    return result;
  }, [search, activeFilter]);

  /* -----------------------------------------------
     RANDOM JOKE
  ------------------------------------------------ */

  const randomJoke = () => {
    const index = Math.floor(Math.random() * jokes.length);

    setRandomIndex(index);
    setSelectedJoke(jokes[index]);
  };

  return (
    <main className="inside-jokes-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="inside-bg">
        <div className="inside-grid" />

        <motion.div
          className="inside-orb orb-one"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -70, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="inside-orb orb-two"
          animate={{
            x: [0, -100, 40, 0],
            y: [0, 60, -50, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="inside-orb orb-three"
          animate={{
            y: [0, -80, 0],
            x: [0, 50, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* FLOATING EMOJIS */}

        {floatingItems.map((emoji, index) => (
          <motion.span
            key={`${emoji}-${index}`}
            className="floating-joke-symbol"
            style={{
              left: `${5 + ((index * 17) % 90)}%`,
              top: `${8 + ((index * 23) % 82)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [-8, 8, -8],
              opacity: [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: 4 + (index % 4),
              repeat: Infinity,
              delay: index * 0.35,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <motion.button
        className="inside-back"
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
        whileHover={{
          x: -5,
        }}
      >
        <ArrowLeft size={17} />
        <span>BACK TO OUR STORY</span>
      </motion.button>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="inside-hero">

        <motion.div
          className="hero-mini-label"
          initial={{
            opacity: 0,
            letterSpacing: "0.8em",
          }}
          animate={{
            opacity: 1,
            letterSpacing: "0.35em",
          }}
          transition={{
            duration: 1.4,
            delay: 0.2,
          }}
        >
          CSE SECTION 02 • CLASSIFIED ARCHIVE
        </motion.div>

        <div className="hero-title-wrapper">

          <motion.div
            className="hero-ghost"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            LOL
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
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Inside
            <br />
            <span>Jokes.</span>
          </motion.h1>

          <motion.div
            className="hero-flame"
            initial={{
              opacity: 0,
              scale: 0,
              rotate: -30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.9,
              type: "spring",
              stiffness: 180,
            }}
          >
            <Flame size={38} />
          </motion.div>
        </div>

        <motion.p
          className="inside-intro"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
        >
          The things that were never written in the attendance sheet.
          <br />
          The jokes that somehow survived every semester.
          <br />
          <strong>And yes... everyone's getting roasted. Respectfully.</strong>
        </motion.p>

        {/* WARNING */}
        <motion.div
          className="roast-warning"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 1.1,
          }}
        >
          <Sparkles size={14} />
          <span>
            100% LOVE • 0% OFFENCE • 200% SECTION 2 CHAOS
          </span>
          <Sparkles size={14} />
        </motion.div>

      </section>

      {/* =================================================
          STATS
      ================================================= */}

      <section className="joke-stats">

        {[
          [jokes.length, "CHARACTERS"],
          ["∞", "INSIDE JOKES"],
          ["0", "SERIOUS ROASTS"],
          ["02", "THE SECTION"],
        ].map(([value, label], index) => (
          <motion.div
            className="joke-stat"
            key={label}
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
              delay: index * 0.1,
            }}
          >
            <strong>{value}</strong>
            <span>{label}</span>
          </motion.div>
        ))}

      </section>

      {/* =================================================
          RANDOM JOKE MACHINE
      ================================================= */}

      <section className="random-zone">

        <motion.div
          className="random-card"
          layout
        >
          <div className="random-card-bg">
            <Zap />
          </div>

          <div>
            <span className="random-label">
              <Laugh size={14} />
              ROAST RANDOMIZER
            </span>

            <h2>
              Don't know who to roast?
              <br />
              <span>Let fate decide.</span>
            </h2>
          </div>

          <motion.button
            className="random-button"
            onClick={randomJoke}
            whileHover={{
              scale: 1.05,
              rotate: -1,
            }}
            whileTap={{
              scale: 0.94,
            }}
          >
            <Shuffle size={18} />
            RANDOM ROAST
          </motion.button>
        </motion.div>

      </section>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <section className="joke-controls">

        <div className="joke-search">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a victim... respectfully 👀"
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="joke-filters">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={
                activeFilter === filter
                  ? "filter active"
                  : "filter"
              }
              onClick={() => setActiveFilter(filter)}
              whileTap={{
                scale: 0.9,
              }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

      </section>

      {/* =================================================
          GRID HEADER
      ================================================= */}

      <section className="joke-grid-header">

        <div>
          <span>THE ARCHIVE</span>

          <h2>
            Everyone has
            <br />
            <i>a moment.</i>
          </h2>
        </div>

        <div className="grid-counter">
          <strong>
            {String(filteredJokes.length).padStart(2, "0")}
          </strong>
          <span>MEMORIES FOUND</span>
        </div>

      </section>

      {/* =================================================
          CARDS
      ================================================= */}

      <section className="joke-grid">

        <AnimatePresence mode="popLayout">
          {filteredJokes.map((person) => {
            const originalIndex = jokes.indexOf(person);

            return (
              <JokeCard
                key={person.name}
                person={person}
                index={originalIndex}
                onOpen={setSelectedJoke}
              />
            );
          })}
        </AnimatePresence>

      </section>

      {/* EMPTY STATE */}

      {filteredJokes.length === 0 && (
        <motion.div
          className="joke-empty"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
        >
          <div>🕵️</div>
          <h3>Victim not found.</h3>
          <p>
            Maybe they escaped the Section 2 archive.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveFilter("ALL");
            }}
          >
            SHOW EVERYONE
          </button>
        </motion.div>
      )}

      {/* =================================================
          ENDING
      ================================================= */}

      <section className="inside-ending">

        <motion.div
          className="ending-symbol"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          😂
        </motion.div>

        <motion.span
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          THE REAL JOKE
        </motion.span>

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
          We came here
          <br />
          to study.
          <br />
          <i>Look what happened.</i>
        </motion.h2>

        <p>
          Years from now, nobody will remember every lecture.
          <br />
          But someone will remember that one stupid joke.
        </p>

        <motion.div
          className="ending-line"
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
        />

        <strong>
          NO STUDENTS WERE SERIOUSLY ROASTED IN THE MAKING OF THIS PAGE.
        </strong>

      </section>

      {/* =================================================
          JOKE MODAL
      ================================================= */}

      <AnimatePresence>
        {selectedJoke && (
          <motion.div
            className="joke-modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedJoke(null)}
          >

            <motion.div
              className="joke-modal"
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 80,
                rotateX: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 50,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="modal-close"
                onClick={() => setSelectedJoke(null)}
              >
                <X size={19} />
              </button>

              <div className="modal-top">
                <span>SECTION 02 / CLASSIFIED</span>
                <span>{selectedJoke.emoji}</span>
              </div>

              <div className="modal-big-emoji">
                {selectedJoke.emoji}
              </div>

              <div className="modal-tag">
                {selectedJoke.tag}
              </div>

              <h3>{selectedJoke.name}</h3>

              <div className="modal-divider" />

              <p>
                "{selectedJoke.joke}"
              </p>

              <div className="modal-bottom">
                <span>
                  <Star size={13} />
                  PURELY FOR THE MEMORIES
                </span>

                <span>
                  CSE • 02
                </span>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}