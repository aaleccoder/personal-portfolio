"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, duration = 0.05, className }: { text: string; delay?: number; duration?: number; className?: string }) => {
  // Split the text into an array of characters
  const characters = Array.from(text);


  // Create a MotionValue to track the progress of the typing
  const count = useMotionValue(0);

  // Transform the count to slice the text and reveal characters
  const displayedText = useTransform(count, latest => characters.slice(0, Math.round(latest)).join(""));

  useEffect(() => {
    const startAnimation = async () => {
      // Start the animation of the count MotionValue
      await animate(count, characters.length, {
        type: "tween",
        duration: characters.length * duration, // Adjust overall duration based on text length and character duration
        ease: "linear",
        delay: delay,
        onComplete: () => {
          // Optional: Do something when animation is complete
          // console.log("Typing animation complete!");
        },
      });
    };

    startAnimation();
  }, [characters.length, delay, duration, count]);

  return (
    <motion.span className={className}>
      {/* Render the transformed MotionValue directly as a child */}
      <motion.span>{displayedText}</motion.span>
      {/* Optional: Add a blinking cursor */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
          repeatType: "reverse",
        }}
        style={{ marginLeft: 2 }} // Small margin for the cursor
      >
      </motion.span>
    </motion.span>
  );
};

export default TypewriterText;