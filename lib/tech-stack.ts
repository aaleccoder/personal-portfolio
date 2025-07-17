export interface TechStack {
  name: string;
  icon: string;
  url: string;
}

export const techStackMap: Record<string, TechStack> = {
  // React
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg": {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "https://react.dev"
  },
  // TypeScript
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg": {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org"
  },
  // Tailwind CSS
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg": {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    url: "https://tailwindcss.com"
  },
  // Next.js
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg": {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    url: "https://nextjs.org"
  },
  // JavaScript
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg": {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  // CSS3
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg": {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  // Node.js
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg": {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    url: "https://nodejs.org"
  },
  // Express.js
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg": {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    url: "https://expressjs.com"
  },
  // MongoDB
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg": {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    url: "https://www.mongodb.com"
  }
};

export const getTechStack = (iconUrl: string): TechStack | null => {
  return techStackMap[iconUrl] || null;
};
