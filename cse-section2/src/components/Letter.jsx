import react from 'react';
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { section } from "../data/section";

export default function Letter(){
 return <section id="letter" className="section letter-section">
  <div className="section-kicker"><Sparkles size={14}/> HER WORDS • FROM THE HEART</div>
  <div className="letter-grid">
   <motion.div className="portrait-card" initial={{opacity:0,x:-60}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:1}}>
    <div className="portrait-frame"><img src={section.teacher.photo} alt="Teacher placeholder"/></div>
    <div className="portrait-caption"><span>With warmth,</span><strong>{section.teacher.name}</strong><small>{section.teacher.role}</small></div>
    <div className="heart heart-a">♥</div><div className="heart heart-b">♥</div>
   </motion.div>
   <motion.div className="letter-card" initial={{opacity:0,x:60}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:1,delay:.15}}>
    <div className="letter-top"><span>♡</span><small>A NOTE FOR MY SECTION</small><span>♡</span></div>
    <h2>Words of <em>heart</em></h2>
    <div className="letter-copy">{section.letter.map((p,i)=><p key={i} className={i===0?"salutation":""}>{p}</p>)}</div>
    <div className="signature">Ankita Ma'am <Heart size={15} fill="currentColor"/></div>
   </motion.div>
  </div>
 </section>
}