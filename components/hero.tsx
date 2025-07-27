"use client";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { ContactModal } from "@/components/ContactModal";
import {
  Briefcase,
  Mail,
  Instagram,
  Twitter,
  Github,
  Phone,
} from "lucide-react";
import TypewriterText from "./typewriter";
import { PortfolioProfile } from "@/app/api/configuration/route";
import Link from "next/link";

export const Hero = ({ configuration }: { configuration: PortfolioProfile }) => {
  const t = useTranslations("Hero");

  const menu = [
    {
      href: "#about",
      label: t("menuAbout"),
    },
    {
      href: "#skills",
      label: t("menuSkills"),
    },
    {
      href: "#pastexperiences",
      label: t("menuPastExperiences"),
    },
    {
      href: "#projects",
      label: t("menuProjects"),
    },
    {
      href: "/blog",
      label: t("menuBlog"),
    }
  ];



  return (
    <section className="flex flex-col justify-center mx-auto space-y-4 md:h-[100vh] md:min-h-[70vh] transition-all duration-300 ease-in-out ">
      <div className="space-y-2 flex flex-col max-w-xl mx-auto px-4">
        <TypewriterText
          duration={0.1}
          text={t("greeting")}
          className="font-titles font-black text-5xl uppercase text-primary"
        />
        <TypewriterText
          delay={2}
          text={t("description")}
          className="font-titles font-black text-md sm:text-xl uppercase text-foreground/90"
        />
      </div>


      <div className="max-w-xl">
        <nav className="flex flex-col">
          {menu.map((item) => (
            <div
              key={item.href}
              className="flex flex-row items-center cursor-pointer"
            >
              <Link
                href={item.href}
                className="py-2 px-4 text-muted-foreground hover:text-primary hover:underline hover:underline-offset-4 transition-all duration-300 hover:scale-110"
              >
                <p>{item.label}</p>
              </Link>
            </div>
          ))}
        </nav>
      </div>

      <div className="max-w-xl px-4">
        <div className="space-x-4 font-mono flex">
          <Button
            className="p-6 text-xl uppercase hover:scale-110 md:hidden"
          >
            <Link href="/projects" className="flex items-center gap-2">
              <Briefcase /> {t("projects")}
            </Link>
          </Button>
          <div className="transition-all duration-300 ease-in-out">
            <ContactModal />
          </div>
        </div>


        {/* Contact info */}
        {configuration?.contact && (
          <div className="flex flex-col gap-2 mt-4 mb-2">
            {configuration.contact.email && (
              <Link href={`mailto:${configuration.contact.email}`} className="flex items-center gap-2 text-base text-muted-foreground hover:scale-105 hover:text-primary transition-all duration-300 ease-in-out">
                <Mail className="w-5 h-5 text-primary" />
                <span>{configuration.contact.email}</span>
              </Link>
            )}
            {configuration.contact.phoneNumber && (
              <Link href={`tel:${configuration.contact.phoneNumber}`} className="flex items-center gap-2 text-base text-muted-foreground hover:scale-105 hover:text-primary transition-all duration-300 ease-in-out">
                <Phone className="w-5 h-5 text-primary" />
                <span>{configuration.contact.phoneNumber}</span>
              </Link>
            )}
          </div>
        )}

        {/* Social media icons */}
        <div
          className="flex space-x-4 mt-2"
        >
          {configuration && (
            <>
              {configuration.socialLinks?.github && (
                <Link
                  href={configuration.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 bg-muted rounded-md transition-all duration-300 hover:bg-muted/80 hover:text-primary hover:scale-105"
                >
                  <Github className="w-5 h-5 hover:text-gray-400" />
                </Link>
              )}
              {configuration.socialLinks?.twitter && (
                <Link
                  href={configuration.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2 bg-muted rounded-md transition-all duration-300 hover:bg-muted/80 hover:text-primary hover:scale-105"
                >
                  <Twitter className="w-5 h-5 hover:text-blue-400" />
                </Link>
              )}
              {configuration.socialLinks?.instagram && (
                <Link
                  href={configuration.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 bg-muted rounded-md transition-all duration-300 hover:bg-muted/80 hover:text-primary hover:scale-105"
                >
                  <Instagram className="w-5 h-5 hover:text-pink-500" />
                </Link>
              )}
              {configuration.socialLinks?.linkedin && (
                <Link
                  href={configuration.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 bg-muted rounded-md transition-all duration-300 hover:bg-muted/80 hover:text-primary hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 hover:text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              )}
              {configuration.socialLinks?.website && (
                <Link
                  href={configuration.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  className="p-2 bg-muted rounded-md transition-all duration-300 hover:bg-muted/80 hover:text-primary hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 hover:text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </section >
  );
};
