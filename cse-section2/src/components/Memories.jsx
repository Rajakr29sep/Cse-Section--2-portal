import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { memories } from "../data/section";
import { useNavigate } from "react-router-dom";


export default function Memories() {
  const navigate = useNavigate();


  return (
    <section id="memories" className="section memories-section">

      <div className="section-heading">
        <div>
          <div className="section-kicker">
            THE LITTLE THINGS
          </div>

          <h2>
            Someday, these will be <em>memories.</em>
          </h2>
        </div>

        <p>
          Not everything important gets written in a notebook.
          Some things stay with us because we lived them together.
        </p>
      </div>

      <div className="memory-grid">

        {memories.map((m, i) => (

          <motion.article
            key={m.number}
            className={`memory memory-${i + 1}`}

            initial={{
              opacity: 0,
              y: 50
            }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            viewport={{
              once: true,
              amount: 0.2
            }}

            transition={{
              duration: 0.7,
              delay: i * 0.1
            }}

            whileHover={{
              y: -10,
              rotate: i % 2 ? 0.5 : -0.5
            }}

            onClick={() => navigate(m.path)}
          >

            {/* transparent image */}
            <motion.img
              src={m.image}
              alt=""
              className="memory-image"

              initial={{
                scale: 0.9,
                opacity: 0
              }}

              whileInView={{
                scale: 1,
                opacity: 0.8
              }}

              whileHover={{
                scale: 1.08,
                rotate: 3
              }}

              transition={{
                duration: 0.6
              }}
            />

            <span className="memory-no">
              {m.number}
            </span>

            <ArrowUpRight className="memory-arrow" />

            <div className="memory-content">
              <h3>{m.title}</h3>

              <p>{m.text}</p>

              <span className="memory-enter">
                ENTER MEMORY →
              </span>
            </div>

          </motion.article>

        ))}

      </div>

    </section>
  );
}