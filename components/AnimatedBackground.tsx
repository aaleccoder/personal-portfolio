"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function AnimatedBackground() {
  const PARTICLE_COUNT = 6;
  const PARTICLE_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--primary)",
    "var(--secondary)",
    "var(--accent)",
  ];

  function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        id: i,
        size: randomBetween(80, 180),
        x: randomBetween(0, 100),
        y: randomBetween(0, 100),
        blur: randomBetween(16, 48),
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        delay: randomBetween(0, 2),
        duration: randomBetween(6, 12),
      });
    }
    return arr;
  }, []);

  // Memoize SVG circles for performance
  const memoizedCircles = useMemo(() => (
    particles.map((p) => (
      <motion.circle
        suppressHydrationWarning
        key={p.id}
        cx={p.x}
        cy={p.y}
        r={p.size / 20}
        fill={p.color}
        style={{
          filter: `blur(${p.blur}px)`,
          opacity: 0.5,
          mixBlendMode: "lighten",
          willChange: "transform, opacity, filter",
          transform: "translateZ(0)", // triggers GPU acceleration
        }}
        initial={{
          r: p.size / 30,
          opacity: 0.3,
        }}
        animate={{
          r: p.size / 20,
          opacity: 0.5,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: p.duration,
          delay: p.delay,
          ease: "easeInOut",
        }}
      />
    ))
  ), [particles]);

  // Memoize blurred divs for performance
  const memoizedBlurDivs = useMemo(() => (
    particles.slice(0, 4).map((p) => (
      <motion.div
        suppressHydrationWarning
        key={"blurred-" + p.id}
        style={{
          position: "absolute",
          left: `calc(${p.x}% - ${p.size / 2}px)`,
          top: `calc(${p.y}% - ${p.size / 2}px)`,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: p.color,
          filter: `blur(${p.blur * 1.5}px)`,
          opacity: 0.25,
          mixBlendMode: "lighten",
          willChange: "transform, opacity, filter",
          transform: "translateZ(0)", // triggers GPU acceleration
        }}
        initial={{ scale: 0.9, opacity: 0.15 }}
        animate={{ scale: 1.1, opacity: 0.25 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: p.duration * 1.5,
          delay: p.delay,
          ease: "easeInOut",
        }}
      />
    ))
  ), [particles]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
        background: "none",
        willChange: "opacity, transform",
        transform: "translateZ(0)", // triggers GPU acceleration
      }}
      suppressHydrationWarning
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100vw", height: "100vh" }}
      >
        {memoizedCircles}
      </svg>
      {/* Extra floating blurred shapes */}
      {memoizedBlurDivs}
    </motion.div>
  );
}
