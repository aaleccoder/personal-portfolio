import { Instagram, Twitter, Facebook, Mail, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center mx-auto mt-12 py-6 border-t space-y-2">
      <p className="font-mono text-lg uppercase">© {new Date().getFullYear()} DaeralysDev</p>
      <nav className="space-x-4 font-mono text-sm uppercase">
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <a href="#about" className="hover:underline">About</a>
      </nav>
      <div className="flex space-x-4 mt-2">
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
    </footer>
  )
}