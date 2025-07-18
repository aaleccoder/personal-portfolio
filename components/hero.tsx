"use client";
import { useTranslations } from "next-intl"
import { Button } from "./ui/button";
import { Briefcase, Mail, Instagram, Twitter, Facebook, Github } from "lucide-react";
import TypewriterText from "./typewriter";
import { motion } from "motion/react";



export const Hero = () => {
  const t = useTranslations("Hero");

  const MotionButton = motion(Button);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 }, // Starts invisible and slightly below
    visible: {
      opacity: 1,
      y: 0, // Ends at its natural position
      transition: {
        duration: 0.6, // How long the animation takes
        ease: 'easeOut', // Easing function for a smooth finish
        // Add a delay here if you want it to appear AFTER the typing text
        // delay: 0.5, // e.g., 0.5 seconds after component mounts
      },
    },
  };

  return (
    <section className="flex flex-col mx-auto space-y-3 min-h-[100vh] items-start">
      <TypewriterText duration={0.10} text={t("greeting")} className="font-mono text-7xl uppercase" />
      <TypewriterText delay={2} text={t("description")} className="font-mono text-lg uppercase" />
      <TypewriterText delay={3} duration={0.01} text={t("aboutMe")} className="font-sans text-sm" />
      <div className="space-x-4 font-mono">
        <MotionButton variants={buttonVariants} className="p-6 text-xl uppercase hover:scale-110"><Briefcase /> {t("projects")}</MotionButton>

        <MotionButton variants={buttonVariants} className="p-6 text-xl uppercase hover:scale-110"><Mail /> {t("contact")}</MotionButton>
      </div>
      <div className="flex space-x-4 mt-4">
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram className="w-5 h-5 hover:text-pink-500" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter className="w-5 h-5 hover:text-blue-400" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook className="w-5 h-5 hover:text-blue-600" />
        </a>
        <a href="mailto:your.email@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
          <Mail className="w-5 h-5 hover:text-red-500" />
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github className="w-5 h-5 hover:text-gray-800" />
        </a>
      </div>
    </section>
  )
}