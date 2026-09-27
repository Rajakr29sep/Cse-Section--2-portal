import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Heart, MousePointer2, Sparkles } from "lucide-react";
import SectionPortal from "./pages/SectionPortal";
import { Routes, Route } from "react-router-dom";
import Syllabus from "./pages/Syllabus";
import Loader from "./components/Loader";
import Particles from "./components/Particles";
import SectionNav from "./components/SectionNav";
import Letter from "./components/Letter";
import Memories from "./components/Memories";
import Thoughts from "./components/Thoughts";
import PortalTeaser from "./components/PortalTeaser";
import Timetable from "./pages/Timetable";
import Faculty from "./pages/Faculty";


import { section } from "./data/section";

import FirstHello from "./pages/FirstHello";
import InsideJokes from "./pages/InsideJokes";
import LateAssignments from "./pages/LateAssignments";
import GrowingTogether from "./pages/GrowingTogether";

function Hero() {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 0.3], [0, -130]);

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <section id="home" className="hero">
      <div className="hero-noise" />

      <Particles />

      <motion.div className="hero-photo" style={{ y, scale }}>
        <img src={section.teacher.photo} alt="Teacher" />
      </motion.div>

      <div className="hero-vignette" />

      <motion.div
        className="hero-copy"
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.9,
          duration: 1,
        }}
      >
        <div className="eyebrow">
          <span />
          <Sparkles size={13} />
          A DIGITAL MEMORY OF CSE — SECTION 2
          <span />
        </div>

        <h1>
          <span>meri</span> <strong>CSE</strong>
          <br />
          <i>section 2</i>
        </h1>

        <p className="hero-sub">{section.subtitle}</p>

        <div className="hero-cta">
          <button
            onClick={() =>
              document.getElementById("letter")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Read her words
            <ArrowDown size={16} />
          </button>

          <span>
            <Heart size={14} fill="currentColor" />
            made with memories
          </span>
        </div>
      </motion.div>

      <div className="hero-teacher">
        <span>WORDS BY</span>

        <b>{section.teacher.name}</b>

        <small>{section.teacher.role}</small>
      </div>

      <div className="scroll-cue">
        <MousePointer2 size={13} />
        scroll to remember
      </div>
    </section>
  );
}

function Home({ loaded }) {
  return (
    <>
      <Loader done={loaded} />

      <SectionNav />

      <main>
        <Hero />

        <Letter />

        <Thoughts />

        <Memories />

        <PortalTeaser />
      </main>

      <footer>
        <span>© CSE Section 2</span>

        <span>
          made with <Heart size={12} fill="currentColor" /> and memories
        </span>
      </footer>
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);

    return () => clearTimeout(t);
  }, []);

  return (

    <Routes>
      {/* HOME */}

      <Route path="/" element={<Home loaded={loaded} />} />
      <Route path="/section-portal" element={<SectionPortal />} />

      {/* MEMORY 01 */}

      <Route path="/memories/first-hello" element={<FirstHello />} />

      {/* MEMORY 02 */}

      <Route path="/memories/inside-jokes" element={<InsideJokes />} />

      {/* MEMORY 03 */}

      <Route path="/memories/late-assignments" element={<LateAssignments />} />

      {/* MEMORY 04 */}

      <Route path="/memories/growing-together" element={<GrowingTogether />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="/faculty" element={<Faculty />} />
    </Routes>
  );
}
