"use client";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Proyects } from "@/components/Proyects";
import { ProyectsLandPage } from "@/components/ProyectsLandPage";
import { Story } from "@/components/Story";
import TypewriterText from "@/components/typewriter";
import { easeOut, motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations("Hero");
  return (
    <div className="flex flex-col md:flex-row md:h-screen font-sans md:px-24">
      <div className="md:w-1/2 md:fixed md:left-0 md:top-0 md:h-full md:overflow-hidden md:px-24">
        <Hero />
      </div>
      <main className="md:w-1/2 md:ml-[50%] p-4 justify-center grid grid-cols-1 mt-16 space-y-20 overflow-y-auto h-screen scroll-smooth">
        <div id="about">
          <TypewriterText text="About" delay={3} duration={0.01} className="text-xl text-muted-foreground text-center md:hidden" />
          <TypewriterText duration={0.01} text={t("aboutMe")} className="font-sans text-md text-muted-foreground" />
        </div>
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }} id="pastexperiences">
          <Story />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ duration: 0.8, ease: easeOut }} id="projects">
          <ProyectsLandPage />
        </motion.div>
        <footer className="mt-24 mb-24 text-sm text-muted-foreground">
          <p>Took heavy inspiration from <a href="https://brittanychiang.com/#about" className="text-primary hover:underline">Brittany Chiang</a>. Made with love from Cuba, and to the world, a dreamer with its feet in the ground</p>
        </footer>
      </main>
    </div>
  );
}