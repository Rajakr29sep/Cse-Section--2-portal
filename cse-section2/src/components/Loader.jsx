import react from 'react';
import { motion } from "framer-motion";
export default function Loader({ done }) {
  return <motion.div className="loader" animate={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }} transition={{ duration: .7 }}>
    <div className="loader-mark"><span>CSE</span><b>02</b></div>
    <div className="loader-line"><motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.5,ease:"easeInOut"}}/></div>
    <p>opening a little memory...</p>
  </motion.div>
}