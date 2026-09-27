import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, GraduationCap, Users, CalendarDays, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { nav } from "../data/section";

export default function SectionNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll to section on the current page
  const go = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }

    setOpen(false);
  };

  // Navigate to another page
  const goToPage = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <motion.header
      className="nav-wrap"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="nav">
        {/* BRAND */}
        <button className="brand" onClick={() => go("home")}>
          <span>CSE</span>
          <b>02</b>
        </button>

        {/* NAV LINKS */}
        <div className={`nav-links ${open ? "open" : ""}`}>
          {/* Existing Home Page Sections */}
          {nav.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}

          {/* SEPARATOR */}
          <div className="nav-divider" />

          {/* SEPARATE PAGES */}

          <button
            onClick={() => goToPage("/syllabus")}
            className="page-link font-family: Poppins, sans-serif"
          >
            Syllabus
          </button>

          <button
            onClick={() => goToPage("/faculty")}
            className="page-link font-family: Poppins, sans-serif"
          >
            Faculty
          </button>

          <button
            onClick={() => goToPage("/timetable")}
            className="page-link font-family: Poppins, sans-serif"
          >
            Timetable
          </button>

          <button
            onClick={() => goToPage("/section-portal")}
            className="page-link font-family: Poppins, sans-serif"
          >
            Section AI
          </button>
        </div>

        {/* MOBILE MENU */}
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* STATUS */}
        <div className="nav-status">
          <span />
          Section 2 • 2026
        </div>
      </div>
    </motion.header>
  );
}
