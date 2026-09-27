import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PortalTeaser() {
  const navigate = useNavigate();

  return (
    <section id="portal" className="section portal-section">
      <div className="portal-card">
        <div className="portal-glow" />

        <motion.div
          className="portal-orbit"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
          <span />
          <span />
        </motion.div>

        <div className="section-kicker">
          <Sparkles size={13} />
          AND THEN, THERE IS THE OTHER SIDE
        </div>

        <h2>
          The memories are personal.
          <br />
          <span>The portal is for everyone.</span>
        </h2>

        <p>
          A dynamic academic space for CSE Section-2 — timetable,
          notices, faculty, academics and an AI-powered section
          assistant.
        </p>

        <div className="portal-actions">
          <motion.button
            className="portal-main"
            onClick={() => navigate("/section-portal")}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 45px rgba(145,105,255,0.35)",
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <Bot size={17} />
            Enter Section Portal
            <ArrowRight size={17} />
          </motion.button>

          <div className="portal-pills">
            <span>
              <Bot />
              Ask Section-2
            </span>

            <span>
              <CalendarDays />
              Timetable
            </span>

            <span>
              <LockKeyhole />
              CGPA Vault
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}