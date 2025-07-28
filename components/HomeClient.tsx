"use client";
import { Hero } from "@/components/hero";
import { ProjectsLandPage } from "@/components/ProjectsLandPage";
import { SkillsComponent } from "@/components/Skills";
import { Story } from "@/components/Story";
import TypewriterText from "@/components/typewriter";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

import { BlogsStarred } from "./BlogsStarred";
import { BlogSummary, Experience, PortfolioProfile, Project, Skills } from "@/lib/data";

export default function HomeClient({ skills, experiences, projects, configuration, blogs }: { skills: Skills[]; experiences: Experience[]; projects: Project[]; configuration: PortfolioProfile | null, blogs: BlogSummary[] }) {
  const t = useTranslations("Hero");
  const locale = useLocale();

  const getAboutMeText = () => {
    if (!configuration?.translations) return "";
    return (
      configuration.translations[locale]?.aboutMe ||
      configuration.translations["en"]?.aboutMe
    );
  };

  if (!configuration) {
    return <div>Loading...</div>; // Or a more sophisticated skeleton loader
  }
  return (
    <div className="flex flex-col lg:flex-row font-sans transition-all duration-300 ease-in-out">
      <div className="lg:w-5/12 lg:fixed lg:left-0 lg:top-0 lg:h-full lg:mb-48 transition-all duration-300 ease-in-out md:px-12">
        <Hero configuration={configuration} />
      </div>

      <main className="lg:w-2/3 lg:ml-[41.666667%] px-2 md:px-12 justify-center grid grid-cols-1 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 min-h-screen scroll-smooth transition-all duration-300 ease-in-out">
        <div id="about" className="flex flex-col space-y-4 sm:space-y-6 mt-12 px-4">
          <TypewriterText
            text={t("about")}
            duration={0.01}
            className="text-2xl md:text-3xl text-primary text-center transition-all duration-300 ease-in-out font-titles font-black uppercase"
          />
          <p className="font-sans text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out">
            {getAboutMeText()}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="skills"
        >
          <SkillsComponent skills={skills} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="pastexperiences"
          className="transition-all duration-300 ease-in-out"
        >
          <Story experiences={experiences} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="projects"
          className="transition-all duration-300 ease-in-out"
        >
          <ProjectsLandPage projects={projects} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="blogs"
          className="transition-all duration-300 ease-in-out"
        >
          <BlogsStarred blogs={blogs} />
        </motion.div>
        <footer className="text-xs sm:text-sm md:text-base text-muted-foreground transition-all duration-300 ease-in-out hover:text-xl cursor-zoom-in mb-12">
          <p className="leading-relaxed">
            {locale === 'es' ? (
              <>Tomé gran inspiración de <a
                href="https://brittanychiang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:text-primary/80 transition-all duration-200 hover:scale-105 inline-block"
              >
                Brittany Chiang
              </a>. Hecho con amor desde Cuba, y para el mundo, un soñador con los pies en la tierra.</>
            ) : (
              <>Took heavy inspiration from <a
                href="https://brittanychiang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:text-primary/80 transition-all duration-200 hover:scale-105 inline-block"
              >
                Brittany Chiang
              </a>. Made with love from Cuba, and to the world, a dreamer with its feet in the ground.</>
            )}
          </p>
        </footer>
      </main>

      <aside className="lg:w-0 lg:hidden">
      </aside>
    </div>
  )
}
