import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  BookOpen,
  FlaskConical,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Timetable.css";

/* =========================================================
   TIMETABLE DATA
   CSE_V_SEC2
   Odd Semester - Aug 2026
   Effective from 31st Aug 2026
========================================================= */

/* =========================================================
   HELPERS
========================================================= */
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const shortDays = {
  Monday: "MON",
  Tuesday: "TUE",
  Wednesday: "WED",
  Thursday: "THU",
  Friday: "FRI",
};
const getToday = () => {
  const day = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return days.includes(day) ? day : null;
};
const getTypeIcon = (type) => {
  if (type === "Lab" || type === "Practical") {
    return <FlaskConical size={17} />;
  }

  return <BookOpen size={17} />;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState(getToday() || "Monday");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = getToday();
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://my-cse-section-2.onrender.com/api/timetable?day=${selectedDay}`, //serverurl
        );

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setClasses(result.data);
      } catch (error) {
        console.error("Failed to fetch timetable:", error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [selectedDay]);

  return (
    <div className="timetable-page">
      {/* Ambient Background */}
      <div className="timetable-noise" />

      <div className="ambient-orb orb-one" />
      <div className="ambient-orb orb-two" />
      <div className="ambient-orb orb-three" />

      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <motion.header
        className="timetable-header"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Link to="/" className="back-button">
          <ArrowLeft size={17} />
          <span>Section 2</span>
        </Link>

        <div className="header-center">
          <div className="header-mini-icon">
            <CalendarDays size={18} />
          </div>

          <span>ACADEMIC SCHEDULE</span>
        </div>

        <div className="semester-pill">
          <span className="status-dot" />
          ODD SEM 2026
        </div>
      </motion.header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main className="timetable-container">
        <motion.section
          className="timetable-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>CSE · V · SECTION 2</span>
          </div>

          <h1>
            Class <span>Timetable</span>
          </h1>

          <p>
            Your complete academic schedule, organized for{" "}
            <strong>CSE_V_SEC2</strong>.
          </p>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <CalendarDays size={16} />
              <span>Effective from 31 Aug 2026</span>
            </div>

            <div className="hero-divider" />

            <div className="hero-meta-item">
              <GraduationCap size={16} />
              <span>USICT · GGSIPU</span>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            DAY SELECTOR
        ===================================================== */}

        <motion.section
          className="day-selector"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {days.map((day) => {
            const isActive = selectedDay === day;
            const isToday = today === day;

            return (
              <button
                key={day}
                className={`day-button ${isActive ? "active" : ""} ${
                  isToday ? "today" : ""
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="day-short">{shortDays[day]}</span>
                <span className="day-full">{day}</span>

                {isToday && <span className="today-label">TODAY</span>}

                {isActive && (
                  <motion.div
                    layoutId="activeDay"
                    className="active-day-background"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </motion.section>

        {/* =====================================================
            DAY TITLE
        ===================================================== */}

        <motion.div
          className="selected-day-heading"
          key={selectedDay}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
            <span className="heading-eyebrow">
              {selectedDay === today ? "TODAY'S SCHEDULE" : "DAILY SCHEDULE"}
            </span>

            <h2>{selectedDay}</h2>
          </div>

          <div className="class-count">
            <span>{classes.length}</span>
            <small>
              {classes.length === 1 ? "CLASS BLOCK" : "CLASS BLOCKS"}
            </small>
          </div>
        </motion.div>

        {/* =====================================================
            TIMETABLE
        ===================================================== */}
        {loading ? (
          <div className="timetable-loading">Loading schedule...</div>
        ) : (
          <AnimatePresence mode="wait">
            {/* your existing schedule-list */}
          </AnimatePresence>
        )}
        <AnimatePresence mode="wait">
          <motion.section
            className="schedule-list"
            key={selectedDay}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {classes.map((item, index) => (
              <motion.article
                className={`class-card ${
                  item.type === "Lab" || item.type === "Practical"
                    ? "practical-card"
                    : ""
                }`}
                key={`${item.subject}-${item.start}`}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Timeline */}
                <div className="class-time">
                  <span className="time-start">{item.start}</span>

                  <div className="time-line">
                    <span className="timeline-dot" />
                    <span className="timeline-line" />
                  </div>

                  <span className="time-end">{item.end}</span>
                </div>

                {/* Main Class Info */}
                <div className="class-main">
                  <div className="class-top">
                    <div className="subject-wrapper">
                      <div className="subject-icon">
                        {getTypeIcon(item.type)}
                      </div>

                      <div>
                        <div className="subject-code">{item.subject}</div>

                        <div className="subject-type">{item.type}</div>
                      </div>
                    </div>

                    <div
                      className={`type-badge ${
                        item.type === "Theory" ? "theory" : "practical"
                      }`}
                    >
                      {item.type}
                    </div>
                  </div>

                  <div className="class-details">
                    <div className="detail-item">
                      <UserRound size={15} />
                      <span>{item.faculty}</span>
                    </div>

                    <div className="detail-item">
                      <MapPin size={15} />
                      <span>{item.room}</span>
                    </div>

                    <div className="detail-item">
                      <Clock3 size={15} />
                      <span>
                        {item.start} — {item.end}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="class-arrow">
                  <ChevronRight size={18} />
                </div>
              </motion.article>
            ))}
          </motion.section>
        </AnimatePresence>

        {/* =====================================================
            FOOTER NOTE
        ===================================================== */}

        <motion.div
          className="timetable-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="footer-icon">
            <Sparkles size={15} />
          </div>

          <p>CSE_V_SEC2 · Odd Semester · Aug 2026</p>

          <span className="footer-line" />

          <p>
            Powered by <strong>Section 2 AI</strong>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
