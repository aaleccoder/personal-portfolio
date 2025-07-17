import { useTranslations } from "next-intl"
import { Button } from "./ui/button";
import { Briefcase, Mail, Instagram, Twitter, Facebook, Github } from "lucide-react";



export const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section className="flex flex-col justify-center mx-auto space-y-3">
      <p className="font-mono font-bold text-6xl uppercase">{t("greeting")}</p>
      <p className="font-mono text-lg uppercase">{t("description")}</p>
      <p className="font-sans text-sm">{t("aboutMe")}</p>
      <div className="space-x-4 font-mono">
        <Button variant="secondary" className="p-6 text-xl uppercase"><Briefcase /> {t("projects")}</Button>
        <Button className="p-6 text-xl uppercase"><Mail /> {t("contact")}</Button>
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