import react from 'react';
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { thoughts } from "../data/section";

export default function Thoughts(){
 return <section className="thought-section">
  <div className="thought-orb"/>
  <div className="section-kicker">A THOUGHT FOR THE SECTION</div>
  <Quote className="quote-icon"/>
  <motion.h2 key={thoughts[0]} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.8}}>{thoughts[0]}</motion.h2>
  <div className="thought-dots">{thoughts.map((_,i)=><span key={i} className={i===0?"active":""}/>)}</div>
 </section>
}