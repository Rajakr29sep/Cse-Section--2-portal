import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Users,
  GraduationCap,
  ExternalLink,
  Mail,
  X,
  Sparkles,
  Linkedin,
  Building2,
  ChevronRight,
  Filter,
  Network,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Faculty.css";

/*
|--------------------------------------------------------------------------
| OFFICIAL USICT FACULTY
|--------------------------------------------------------------------------
| Source:
| https://www.ipu.ac.in/usict/usictsfacultymain.php
|
| The official page currently lists 37 faculty members.
|--------------------------------------------------------------------------
*/
const usictFaculty = [
  {
    id: 1,
    name: "Dr. Yogesh Singh",
    designation: "Professor",
    email: null,
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
    note: "On Deputation at DU w.e.f 08.10.21",
  },
  {
    id: 2,
    name: "Dr. B. V. R. Reddy",
    designation: "Professor",
    email: "bvrreddy@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 3,
    name: "Dr. Navin Rajpal",
    designation: "Professor",
    email: "navin.rajpal@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 4,
    name: "Dr. Chandra Shekhar Rai",
    designation: "Professor",
    email: "csrai@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 5,
    name: "Dr. (Mrs.) Arvinder Kaur",
    designation: "Professor",
    email: "arvinder@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 6,
    name: "Dr. Pravin Chandra",
    designation: "Professor",
    email: "pchandra@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 7,
    name: "Dr. (Ms.) Anjana Gosain",
    designation: "Professor",
    email: "anjana_gosain@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 8,
    name: "Dr. Udayan Ghose",
    designation: "Professor",
    email: "udayan@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 9,
    name: "Dr. Bharti Suri",
    designation: "Professor",
    email: "bhartisuri@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 10,
    name: "Dr. Amit Prakash Singh",
    designation: "Professor",
    email: "amit@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 11,
    name: "Dr. Pushpendra Singh Bharti",
    designation: "Professor",
    email: "psbharti@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 12,
    name: "Dr. R. Rama Kishore",
    designation: "Professor",
    email: "rama.kishore@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 13,
    name: "Dr. Anju Saha",
    designation: "Professor",
    email: "anju@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 14,
    name: "Dr. Ravindra Kr. Purwar",
    designation: "Professor",
    email: "ravindra@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 15,
    name: "Dr. Virendra Prasad Vishwakarma",
    designation: "Professor",
    email: "vpv@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 16,
    name: "Dr. Anurag Jain",
    designation: "Professor",
    email: "anurag@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 17,
    name: "Dr. Sanjay Kr. Malik",
    designation: "Professor",
    email: "skmalik@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 18,
    name: "Dr. Vandana Nath",
    designation: "Professor",
    email: "vandana.nath@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 19,
    name: "Dr. Sartaj Singh Sodhi",
    designation: "Professor",
    email: "sartaj@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 20,
    name: "Dr. Rinkaj Goyal",
    designation: "Professor",
    email: "rinkaj@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 21,
    name: "Dr. Ashish Payal",
    designation: "Professor",
    email: "ashish@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 22,
    name: "Dr. Jyotsna Yadav",
    designation: "Professor",
    email: "jyotsnayadav@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 23,
    name: "Dr. Rameshwar Lal Ujjwal",
    designation: "Professor",
    email: "ujjwal@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 24,
    name: "Dr. Maddali Bala Krishna",
    designation: "Professor",
    email: "mbalakrishna@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 25,
    name: "Dr. Anuradha Chug",
    designation: "Professor",
    email: "anuradha@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 26,
    name: "Dr. Kamaldeep Kaur",
    designation: "Professor",
    email: "Kdkaur99@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 27,
    name: "Dr. Reena Gupta",
    designation: "Associate Professor",
    email: "reena@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 28,
    name: "Dr. Mansi Jhamb",
    designation: "Associate Professor",
    email: "mansi.jhamb@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 29,
    name: "Dr. Jaspreeti Singh",
    designation: "Associate Professor",
    email: "jaspreeti_singh@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 30,
    name: "Dr. Ruchi Sehrawat",
    designation: "Associate Professor",
    email: "ruchi.sehrawat@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 31,
    name: "Dr. Priyanka Bhutani",
    designation: "Assistant Professor",
    email: "priyankachoudhary@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 32,
    name: "Dr. Manoj Kumar Satyarthi",
    designation: "Assistant Professor",
    email: "mksssrewa@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 33,
    name: "Dr. Shiv Ram Meena",
    designation: "Assistant Professor",
    email: "srm@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 34,
    name: "Dr. Shweta Dabas",
    designation: "Assistant Professor",
    email: "shwetadbs@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 35,
    name: "Dr. Chakresh Kumar",
    designation: "Assistant Professor",
    email: "chakreshk@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 36,
    name: "Ms. Priyanka Chaudhary",
    designation: "Assistant Professor",
    email: "priyanka.b@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
  {
    id: 37,
    name: "Sh. Parijat Mathur",
    designation: "Assistant Professor",
    email: "Parijat.mathur@ipu.ac.in",
    profile: "https://www.ipu.ac.in/usict/usictsfacultymain.php",
  },
];
/*
|--------------------------------------------------------------------------
| ADDITIONAL PEOPLE PROVIDED BY YOU
|--------------------------------------------------------------------------
| These are intentionally separated from the official USICT list.
| We should not claim an institutional affiliation unless verified.
|--------------------------------------------------------------------------
*/

const additionalFaculty = [
  {
    id: "a1",
    name: "Dr. Ankita Sharma",
    designation: "Academic / Research Professional",
    institution: "University School of Information, Communication & Technology",
    linkedin: "https://www.linkedin.com/in/dr-ankita-sharma-95276297/",
    tags: ["AI", "Research", "Technology"],
  },
  {
    id: "a2",
    name: "Neda Ahmed",
    designation: "Research / Academic Professional",
    institution: "JIMS Engineering Management Technical Campus",
    linkedin: "https://www.linkedin.com/in/neda-ahmed-888440114/",
    tags: ["AI", "Research", "Cyber Defense"],
  },
  {
    id: "a3",
    name: "Anjana Bagga",
    designation: "Academic Professional",
    institution: "Academic Network",
    linkedin: "https://www.linkedin.com/in/anjana-bagga-a8280b173/",
    tags: ["Academics", "Technology"],
  },
  {
    id: "a4",
    name: "Dr. Arshi H",
    designation: "Academic / Research Professional",
    institution: "Academic Network",
    linkedin: "https://www.linkedin.com/in/dr-arshi-h-281523280/",
    tags: ["Research", "Technology"],
  },
  {
    id: "a5",
    name: "Yashima Hooda",
    designation: "Academic Professional",
    institution: "Academic Network",
    linkedin: "https://www.linkedin.com/in/yashima-hooda-2b3a10131/",
    tags: ["Academics", "Technology"],
  },
  {
    id: "a6",
    name: "Dr. Sonam Mathur",
    designation: "Academic / Research Professional",
    institution: "University School of Information, Communication & Technology",
    linkedin: "https://www.linkedin.com/in/dr-sonam-mathur-24098661/",
    tags: ["Generative AI", "Agentic AI", "Cybersecurity"],
  },
];

const getInitials = (name) => {
  const clean = name
    .replace("Dr. (Mrs.)", "")
    .replace("Dr. (Ms.)", "")
    .replace("Dr.", "")
    .replace("Ms.", "")
    .replace("Sh.", "")
    .trim();

  const parts = clean.split(" ");

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getDesignationClass = (designation) => {
  if (designation.toLowerCase().includes("professor")) {
    if (designation.toLowerCase().includes("associate")) {
      return "associate";
    }

    if (designation.toLowerCase().includes("assistant")) {
      return "assistant";
    }

    return "professor";
  }

  return "research";
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: Math.min(index * 0.045, 0.8),
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const floatingVariants = {
  animate: {
    y: [0, -14, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function FacultyCard({ faculty, index, onOpen, additional = false }) {
  const initials = getInitials(faculty.name);

  return (
    <motion.article
      className={`faculty-card ${additional ? "additional-card" : ""}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      custom={index}
      whileHover={{
        y: -12,
        scale: 1.015,
      }}
      onClick={() => onOpen(faculty)}
    >
      <div className="card-glow" />

      <div className="faculty-card-top">
        <div className="profile-orbit">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />

          <motion.div
            className="faculty-avatar"
            whileHover={{
              rotate: 360,
              transition: {
                duration: 0.8,
                ease: "easeInOut",
              },
            }}
          >
            {initials}
          </motion.div>
        </div>

        <div className="faculty-index">
          {additional ? "NET" : String(faculty.id).padStart(2, "0")}
        </div>
      </div>

      <div className="faculty-info">
        <h3>{faculty.name}</h3>

        <span
          className={`designation ${
            additional ? "research" : getDesignationClass(faculty.designation)
          }`}
        >
          {faculty.designation}
        </span>

        {faculty.note && <p className="faculty-note">{faculty.note}</p>}

        {faculty.institution && (
          <div className="faculty-institution">
            <Building2 size={14} />
            <span>{faculty.institution}</span>
          </div>
        )}

        {faculty.email && (
          <div className="faculty-email">
            <Mail size={14} />
            <span>{faculty.email}</span>
          </div>
        )}

        {faculty.tags && (
          <div className="faculty-tags">
            {faculty.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="faculty-card-footer">
        <span>View profile</span>

        <motion.div
          className="arrow-circle"
          whileHover={{
            x: 5,
          }}
        >
          <ChevronRight size={17} />
        </motion.div>
      </div>
    </motion.article>
  );
}

function FacultyModal({ faculty, onClose }) {
  if (!faculty) return null;

  const isAdditional = faculty.id?.toString().startsWith("a");

  return (
    <AnimatePresence>
      <motion.div
        className="faculty-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="faculty-modal"
          initial={{
            opacity: 0,
            y: 70,
            scale: 0.92,
            rotateX: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
          }}
          exit={{
            opacity: 0,
            y: 50,
            scale: 0.94,
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-noise" />

          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          <div className="modal-hero">
            <div className="modal-orbit">
              <div className="modal-ring" />

              <div className="modal-avatar">{getInitials(faculty.name)}</div>
            </div>

            <div className="modal-heading">
              <div className="modal-eyebrow">
                <Sparkles size={14} />

                {isAdditional ? "ACADEMIC NETWORK" : "USICT FACULTY"}
              </div>

              <h2>{faculty.name}</h2>

              <p>{faculty.designation}</p>
            </div>
          </div>

          <div className="modal-divider" />

          <div className="modal-content">
            <div className="modal-stat">
              <div className="stat-icon">
                <GraduationCap size={18} />
              </div>

              <div>
                <span>Designation</span>
                <strong>{faculty.designation}</strong>
              </div>
            </div>

            {faculty.email && (
              <div className="modal-stat">
                <div className="stat-icon">
                  <Mail size={18} />
                </div>

                <div>
                  <span>Official Email</span>
                  <strong>{faculty.email}</strong>
                </div>
              </div>
            )}

            {faculty.institution && (
              <div className="modal-stat">
                <div className="stat-icon">
                  <Building2 size={18} />
                </div>

                <div>
                  <span>Institution</span>
                  <strong>{faculty.institution}</strong>
                </div>
              </div>
            )}

            {faculty.note && (
              <div className="modal-stat">
                <div className="stat-icon">
                  <Award size={18} />
                </div>

                <div>
                  <span>Additional Information</span>
                  <strong>{faculty.note}</strong>
                </div>
              </div>
            )}
          </div>

          {faculty.tags && (
            <div className="modal-tags">
              {faculty.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className="modal-actions">
            {!isAdditional && faculty.profile && (
              <a
                href={faculty.profile}
                target="_blank"
                rel="noreferrer"
                className="modal-primary-btn"
              >
                <ExternalLink size={17} />
                Official Profile
              </a>
            )}

            {faculty.linkedin && (
              <a
                href={faculty.linkedin}
                target="_blank"
                rel="noreferrer"
                className="modal-secondary-btn"
              >
                <Linkedin size={17} />
                LinkedIn
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Faculty() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filters = [
    "All",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Academic Network",
  ];

  const filteredUSICT = useMemo(() => {
    const query = search.toLowerCase().trim();

    return usictFaculty.filter((faculty) => {
      const matchesSearch =
        !query ||
        faculty.name.toLowerCase().includes(query) ||
        faculty.designation.toLowerCase().includes(query) ||
        faculty.email?.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" ||
        faculty.designation.toLowerCase().includes(filter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const filteredAdditional = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (filter !== "All" && filter !== "Academic Network") {
      return [];
    }

    return additionalFaculty.filter((faculty) => {
      return (
        !query ||
        faculty.name.toLowerCase().includes(query) ||
        faculty.designation.toLowerCase().includes(query) ||
        faculty.institution.toLowerCase().includes(query) ||
        faculty.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [search, filter]);

  return (
    <div className="faculty-page">
      {/* BACKGROUND SYSTEM */}

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <div className="grid-background" />

      <div className="particle-field">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="particle"
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 === 0 ? 25 : -25, 0],
              opacity: [0.15, 0.7, 0.15],
            }}
            transition={{
              duration: 5 + (i % 5),
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}

      <motion.header
        className="faculty-navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Link to="/" className="faculty-back">
          <ArrowLeft size={18} />
          <span>Section 2</span>
        </Link>

        <div className="faculty-brand">
          <div className="brand-mark">
            <Users size={18} />
          </div>

          <span>
            CSE <b>·</b> FACULTY
          </span>
        </div>

        <div className="navbar-status">
          <span className="status-dot" />
          <span>Academic Directory</span>
        </div>
      </motion.header>

      {/* HERO */}

      <main className="faculty-main">
        <section className="faculty-hero">
          <motion.div
            className="hero-orb"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="hero-orb-inner">
              <Users size={42} />
            </div>
          </motion.div>

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
              duration: 0.8,
              delay: 0.15,
            }}
          >
            <div className="hero-kicker">
              <Sparkles size={15} />
              UNIVERSITY SCHOOL OF INFORMATION, COMMUNICATION & TECHNOLOGY
            </div>

            <h1>
              Meet the
              <span> Faculty.</span>
            </h1>

            <p>
              Explore the academic minds, researchers and educators connected
              with the CSE ecosystem.
            </p>
          </motion.div>

          {/* STATS */}

          <motion.div
            className="faculty-stats"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
          >
            <div className="hero-stat">
              <strong>37</strong>
              <span>Official Faculty</span>
            </div>

            <div className="stat-separator" />

            <div className="hero-stat">
              <strong>26</strong>
              <span>Professors</span>
            </div>

            <div className="stat-separator" />

            <div className="hero-stat">
              <strong>6</strong>
              <span>Additional Profiles</span>
            </div>
          </motion.div>
        </section>

        {/* SEARCH / FILTER */}

        <section className="faculty-controls">
          <div className="search-box">
            <Search size={19} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty, designation or email..."
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="filter-row">
            <div className="filter-label">
              <Filter size={15} />
              FILTER
            </div>

            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* OFFICIAL USICT */}

        <section className="faculty-section">
          <div className="section-heading">
            <div>
              <div className="section-eyebrow">
                <span />
                OFFICIAL DIRECTORY
              </div>

              <h2>USICT Faculty</h2>

              <p>Faculty listed on the official GGSIPU USICT directory.</p>
            </div>

            <div className="section-count">
              <span>{filteredUSICT.length}</span>
              profiles
            </div>
          </div>

          <div className="faculty-grid">
            {filteredUSICT.map((faculty, index) => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
                index={index}
                onOpen={setSelectedFaculty}
              />
            ))}
          </div>

          {filteredUSICT.length === 0 && (
            <div className="empty-state">
              <Search size={30} />
              <h3>No faculty found</h3>
              <p>Try another name, designation or search term.</p>
            </div>
          )}
        </section>

        {/* ADDITIONAL */}

        <section className="faculty-section additional-section">
          <div className="network-banner">
            <div className="network-icon">
              <Network size={24} />
            </div>

            <div>
              <div className="section-eyebrow">
                <span />
                EXTENDED NETWORK
              </div>

              <h2>Additional Academic Profiles</h2>

              <p>
                Additional profiles supplied for this portal. These are kept
                separate from the official USICT directory.
              </p>
            </div>
          </div>

          <div className="faculty-grid">
            {filteredAdditional.map((faculty, index) => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
                index={index}
                onOpen={setSelectedFaculty}
                additional
              />
            ))}
          </div>
        </section>

        {/* SOURCE FOOTER */}

        <footer className="faculty-footer">
          <div className="footer-line" />

          <div className="footer-content">
            <div>
              <strong>Faculty Directory</strong>
              <span>CSE Section 2 Academic Portal</span>
            </div>

            <a
              href="https://www.ipu.ac.in/usict/usictsfacultymain.php"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={15} />
              Official USICT Directory
            </a>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedFaculty && (
          <FacultyModal
            faculty={selectedFaculty}
            onClose={() => setSelectedFaculty(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
