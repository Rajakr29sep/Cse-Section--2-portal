import react from 'react';
import { motion } from "framer-motion";
export default function Particles() {
  const dots = Array.from({length: 28}, (_,i)=>i);
  return <div className="particles" aria-hidden="true">
    {dots.map(i => <motion.i key={i}
      initial={{opacity:0, y:20}}
      animate={{opacity:[0,.65,0], y:[20,-180], x:[0,(i%2?1:-1)*(15+(i*7)%50)]}}
      transition={{duration:5+(i%5), delay:i*.17, repeat:Infinity, ease:"easeOut"}}
      style={{left:`${(i*37)%100}%`, bottom:`${(i*19)%35}%`}}
    />)}
  </div>
}