import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SectionPortal.css";
import ReactMarkdown from "react-markdown";

import {
  ArrowUp,
  Users,
  Bot,
  CalendarDays,
  ChevronRight,
  Clock3,
  Copy,
  GraduationCap,
  Menu,
  Mic,
  Paperclip,
  Search,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

const API_URL = "https://my-cse-section-2.onrender.com/";

const starterQuestions = [
  "What is our timetable for tomorrow?",
  "Tell me about CSE Section 2.",
  "Who are our faculty members?",
  "What is the Syllabus of compiler Design",
  "Who Created You?",
];

function PortalBoot({ onComplete }) {
  return (
    <motion.div
      className="portal-boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="boot-core mt-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Bot size={38} />
      </motion.div>

      <motion.div
        className="boot-ring boot-ring-one"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="boot-ring boot-ring-two"
        animate={{ rotate: -360 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        INITIALIZING SECTION-2
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading academic memory...
      </motion.span>

      <motion.div
        className="boot-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 2.3,
          ease: "easeInOut",
        }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  );
}

function ThinkingAnimation() {
  return (
    <div className="thinking-message">
      <div className="thinking-avatar">
        <Bot size={17} />
      </div>

      <div className="thinking-box">
        <span>Searching Section-2 memory</span>

        <div className="thinking-dots">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MESSAGE COMPONENT
   ========================================================= */

function Message({ message, onSpeak }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`portal-message-row ${
        isUser ? "user-message-row" : "ai-message-row"
      }`}
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      {!isUser && (
        <div className="message-avatar">
          <Bot size={17} />
        </div>
      )}

      <div className={`portal-message ${isUser ? "user" : "ai"}`}>
        <div className="message-text">
          {isUser ? (
            /* User messages remain normal text */
            message.content
          ) : (
            /* AI messages are parsed as Markdown */
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {!isUser && (
          <div className="message-tools">
            <button
              onClick={() => navigator.clipboard?.writeText(message.content)}
              title="Copy"
              type="button"
            >
              <Copy size={13} />
            </button>

            <button
              onClick={() => onSpeak(message.content)}
              title="Speak"
              type="button"
            >
              <Volume2 size={13} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   ORB
   ========================================================= */

function Orb() {
  return (
    <div className="section-ai-orb">
      <motion.div
        className="orb-halo halo-one"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="orb-halo halo-two"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="orb-core"
        animate={{
          scale: [1, 1.06, 1],
          boxShadow: [
            "0 0 35px rgba(145,105,255,0.2)",
            "0 0 80px rgba(145,105,255,0.45)",
            "0 0 35px rgba(145,105,255,0.2)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <Bot size={40} />
      </motion.div>

      <span className="orb-particle particle-one" />
      <span className="orb-particle particle-two" />
      <span className="orb-particle particle-three" />
      <span className="orb-particle particle-four" />
    </div>
  );
}

/* =========================================================
   MAIN SECTION PORTAL
   ========================================================= */

export default function SectionPortal() {
  const [booting, setBooting] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  const textareaRef = useRef(null);
  const chatAreaRef = useRef(null);

  /* =========================================================
     AUTO SCROLL
     ========================================================= */

  useEffect(() => {
    const chat = chatAreaRef.current;

    if (!chat) return;

    requestAnimationFrame(() => {
      chat.scrollTop = chat.scrollHeight;
    });
  }, [messages, thinking]);

  /* =========================================================
     TEXT TO SPEECH
     ========================================================= */
  const speak = (text) => {
    if (!voiceEnabled) return;

    if (!("speechSynthesis" in window)) {
      console.log("Speech synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find((voice) => voice.lang.toLowerCase().includes("en-in")) ||
      voices.find((voice) => voice.lang.toLowerCase().includes("en-us")) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.lang = preferredVoice?.lang || "en-IN";

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      console.log("Speaking...");
    };

    utterance.onend = () => {
      console.log("Speech finished");
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event);
    };

    window.speechSynthesis.speak(utterance);
  };
  /* =========================================================
     SEND MESSAGE
     ========================================================= */

  const sendMessage = async (customMessage) => {
    const question = (customMessage ?? input).trim();

    if (!question || thinking) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setThinking(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: question,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to get AI response");
      }

      const answer =
        data.answer || "I couldn't find that in the Section-2 knowledge base.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
          sources: data.sources || [],
        },
      ]);

      speak(answer);
    } catch (error) {
      console.error("Section AI error:", error);

      const fallback =
        "I couldn't connect to the Section-2 AI right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallback,
        },
      ]);

      speak(fallback);
    } finally {
      setThinking(false);
    }
  };

  /* =========================================================
     ENTER KEY
     ========================================================= */

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* =========================================================
     BOOT SCREEN
     ========================================================= */

  if (booting) {
    return (
      <AnimatePresence>
        <PortalBoot onComplete={() => setBooting(false)} />
      </AnimatePresence>
    );
  }

  /* =========================================================
     MAIN UI
     ========================================================= */

  return (
    <div className="section-portal-page">
      {/* BACKGROUND */}

      <div className="portal-background-grid" />

      <div className="portal-background-glow glow-a" />
      <div className="portal-background-glow glow-b" />
      <div className="portal-background-glow glow-c" />

      {/* SIDEBAR */}

      <aside className={`portal-sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="portal-brand">
          <div className="brand-symbol">
            <Bot size={20} />
          </div>

          <div>
            <strong>SECTION-2</strong>

            <span>ACADEMIC OS</span>
          </div>
        </div>

        <button
          className="sidebar-close"
          onClick={() => setMobileMenu(false)}
          type="button"
        >
          <X size={20} />
        </button>

        <div className="sidebar-section">
          <span className="sidebar-label">INTELLIGENCE</span>

          <button className="sidebar-link active" type="button">
            <Bot size={17} />
            Section AI
          </button>

          <Link to="/timetable" className="sidebar-link">
            <CalendarDays size={18} />
            <span>Timetable</span>
          </Link>

          <Link to="/syllabus" className="sidebar-link">
            <GraduationCap size={17} />
            Academics
          </Link>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">INFORMATION</span>

          <Link to="/faculty" className="sidebar-link">
            <Users size={18} />

            <span>Faculty</span>
          </Link>
        </div>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot" />

            <div>
              <strong>SECTION MEMORY</strong>

              <small>RAG SYSTEM ONLINE</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <main className="portal-main-area">
        <header className="portal-header">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
            type="button"
          >
            <Menu />
          </button>

          <div>
            <span>SECTION-2 / AI ASSISTANT</span>

            <h1>Ask anything.</h1>
          </div>
          <button
            className={`voice-toggle ${voiceEnabled ? "enabled" : ""}`}
            onClick={() => {
              setVoiceEnabled((value) => {
                const newValue = !value;

                if (!newValue) {
                  window.speechSynthesis.cancel();
                }

                return newValue;
              });
            }}
            type="button"
          >
            {voiceEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}

            <span>{voiceEnabled ? "VOICE ON" : "VOICE OFF"}</span>
          </button>
        </header>

        {/* CHAT */}

        <section className="portal-chat-area" ref={chatAreaRef}>
          {messages.length === 0 ? (
            <motion.div
              className="portal-welcome"
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <Orb />

              <motion.div
                className="welcome-kicker"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                }}
              >
                <Sparkles size={13} />
                SECTION-2 INTELLIGENCE
              </motion.div>

              <h2>
                What do you want
                <br />
                <span>to know?</span>
              </h2>

              <p>
                Ask about your timetable, faculty, academics, subjects, section
                information or anything stored in the Section-2 knowledge base.
              </p>

              <div className="starter-grid">
                {starterQuestions.map((question, index) => (
                  <motion.button
                    key={question}
                    onClick={() => sendMessage(question)}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.5 + index * 0.08,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    type="button"
                  >
                    <span>{question}</span>

                    <ChevronRight size={15} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="messages-container">
              {messages.map((message, index) => (
                <Message key={index} message={message} onSpeak={speak} />
              ))}

              {thinking && <ThinkingAnimation />}
            </div>
          )}
        </section>

        {/* INPUT */}

        <div className="portal-input-wrapper">
          <div className="portal-input">
            <button className="input-icon" type="button">
              <Paperclip size={18} />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Section-2 anything..."
              rows={1}
            />

            <button className="input-icon" type="button">
              <Mic size={18} />
            </button>

            <motion.button
              className="send-button"
              onClick={() => sendMessage()}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              disabled={!input.trim() || thinking}
              type="button"
            >
              <Send size={17} />
            </motion.button>
          </div>

          <div className="input-disclaimer">
            <span>
              SECTION-2 AI CAN MAKE MISTAKES. VERIFY IMPORTANT ACADEMIC
              INFORMATION.
            </span>

            <span>RAG • SECTION MEMORY • AI ASSISTANT</span>
          </div>
        </div>
      </main>
    </div>
  );
}
