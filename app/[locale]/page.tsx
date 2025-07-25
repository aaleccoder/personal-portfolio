"use client";
import { Hero } from "@/components/hero";
import { ProyectsLandPage } from "@/components/ProyectsLandPage";
import { SkillsComponent } from "@/components/Skills";
import { Story } from "@/components/Story";
import TypewriterText from "@/components/typewriter";
import { easeOut, motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Hero");
  return (
    <div className="flex flex-col lg:flex-row font-sans transition-all duration-300 ease-in-out mt-14">
      {/* Left column - 5/12 width */}
      <div className="lg:w-5/12 lg:fixed lg:left-0 lg:top-0 lg:h-full lg:overflow-hidden lg:mb-48 transition-all duration-300 ease-in-out md:px-12 mt-14">
        <Hero />
      </div>

      {/* Middle column - 2/3 width */}
      <main className="lg:w-2/3 lg:ml-[41.666667%] p-4 md:px-12 justify-center grid grid-cols-1 mt-4 sm:mt-6 md:mt-8 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 min-h-screen scroll-smooth transition-all duration-300 ease-in-out">
        <div id="about" className="flex flex-col space-y-4 sm:space-y-6">
          <TypewriterText
            text="About"
            duration={0.05}
            className="text-2xl sm:text-3xl md:text-4xl text-primary text-center transition-all duration-300 ease-in-out"
          />
          <TypewriterText
            duration={0.02}
            text={t("aboutMe")}
            className="font-sans text-sm text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="skills"
        >
          <SkillsComponent />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="pastexperiences"
          className="transition-all duration-300 ease-in-out"
        >
          <Story />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="projects"
          className="transition-all duration-300 ease-in-out"
        >
          <ProyectsLandPage />
        </motion.div>
        <footer className="text-xs sm:text-sm md:text-base text-muted-foreground transition-all duration-300 ease-in-out">
          <p className="leading-relaxed">
            Took heavy inspiration from{" "}
            <a
              href="https://brittanychiang.com/#about"
              className="text-primary hover:underline transition-colors duration-200 ease-in-out"
            >
              Brittany Chiang
            </a>
            . Made with love from Cuba, and to the world, a dreamer with its
            feet in the ground
          </p>
        </footer>
      </main>

      {/* Right column - will be hidden since we have 1/3 + 2/3 = 100% */}
      <aside className="lg:w-0 lg:hidden">
        {/* Right column content - keeping it as it was (empty for now) */}
      </aside>
    </div>
  );
}
