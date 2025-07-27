"use client";
import { motion, Variants } from "framer-motion";

const variants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20,
    rotateX: -10,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
      staggerChildren: 0.1,
    },
  },
};


export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="transform-gpu"
      style={{ transformPerspective: 1000 }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.3 }
          }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
