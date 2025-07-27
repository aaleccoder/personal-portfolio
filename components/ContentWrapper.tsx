"use client";
import { motion, Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.17, 0.67, 0.83, 0.67], // a custom bezier curve
    },
  },
};


export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
