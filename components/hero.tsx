"use client";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import {
  Briefcase,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Github,
} from "lucide-react";
import TypewriterText from "./typewriter";
import { motion } from "motion/react";
import { div } from "motion/react-client";
import Link from "next/link";

export const Hero = () => {
  const menu = [
    {
      href: "#about",
      label: "About",
    },
    {
      href: "#skills",
      label: "Skills",
    },
    {
      href: "#pastexperiences",
      label: "Past experiences",
    },
    {
      href: "#projects",
      label: "Projects",
    },
  ];

  const t = useTranslations("Hero");

  const MotionButton = motion(Button);

  return (
    <section className="flex flex-col justify-center mx-auto space-y-4 md:h-[80vh] md:min-h-[70vh] transition-all duration-300 ease-in-out">
      <div className="space-y-2 flex flex-col max-w-xl mx-auto">
        <TypewriterText
          duration={0.1}
          text={t("greeting")}
          className="font-sans text-3xl sm:text-4xl md:text-4xl uppercase text-primary"
        />
        <TypewriterText
          delay={2}
          text={t("description")}
          className="font-sans text-lg sm:text-xl md:text-2xl uppercase text-muted-foreground"
        />
      </div>

      {/* Text */}

      <div className="hidden md:block max-w-xl">
        <nav className="flex flex-col">
          {menu.map((item) => (
            <div
              key={item.href}
              className="flex flex-row items-center cursor-pointer"
            >
              <a
                href={item.href}
                className="py-2 px-4 text-lg text-foreground hover:text-primary hover:underline hover:underline-offset-4 transition-all duration-300 hover:scale-110"
              >
                <p>{item.label}</p>
              </a>
            </div>
          ))}
        </nav>
      </div>

      <div className="max-w-xl px-4">
        <div className="space-x-4 font-mono flex">
          <MotionButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 3 }}
            className="p-6 text-xl uppercase hover:scale-110 md:hidden"
          >
            <Briefcase /> {t("projects")}
          </MotionButton>
          <MotionButton
            variant="outline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 3 }}
            className="p-6 text-xl uppercase hover:scale-110"
          >
            <Mail /> {t("contact")}
          </MotionButton>
        </div>

        {/* Social media icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 4 }}
          className="flex space-x-4 mt-2"
        >
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 bg-muted rounded-md"
          >
            <Instagram className="w-5 h-5 hover:text-pink-500" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="p-2 bg-muted rounded-md"
          >
            <Twitter className="w-5 h-5 hover:text-blue-400" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 bg-muted rounded-md"
          >
            <Facebook className="w-5 h-5 hover:text-blue-600" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 bg-muted rounded-md"
          >
            <Github className="w-5 h-5 hover:text-gray-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
