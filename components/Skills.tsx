"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
export const Skills = () => {

  const t = useTranslations('Skills');
  const skills = [
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'Next.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Supabase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    },
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'Django',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    },
    {
      name: 'TailwindCSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    },
    {
      name: 'Appwrite',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/appwrite/appwrite-original.svg',
    },
    {
      name: 'Linux',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    }
  ]

  return (
    <section className="space-y-10">
      <h2 className="text-5xl font-sans font-bold text-center">{t('title')}</h2>
      <div className="space-y-4">

        {/* <div>
          <Image width={1024} height={1024} src="/erasebg-transformed(1).png" alt="Coding place" className="mx-auto grayscale" />
        </div> */}
        <div className="relative overflow-hidden  py-4 rounded-xl shadow-lg shadow-accent bg-muted/10 space-y-5 w-xs md:w-3xl">
          {Array.from({ length: Math.ceil(skills.length / 4) }).map((_, rowIndex) => {
            const rowSkills = skills.slice(rowIndex * 4, rowIndex * 4 + 4);
            const direction = rowIndex % 2 === 0 ? 'left' : 'right';
            return (
              <div key={rowIndex} className="relative overflow-hidden p-4">
                <div
                  className={`flex animate-marquee-${direction}`}
                  style={{
                    gap: '1rem',
                  }}
                >
                  {/* Create two identical sets for seamless loop */}
                  {[...rowSkills, ...rowSkills].map((skill, index) => (
                    <div
                      key={skill.name + index}
                      className="flex flex-row bg-gradient-to-b from-accent/80 to-accent/60 p-4 space-x-4 font-sans rounded shadow-md shadow-accent flex-shrink-0"
                      style={{ minWidth: 'fit-content' }}
                    >
                      <div className="flex flex-col items-center justify-center space-y-2 ">
                        <Image
                          width={64}
                          height={64}
                          src={skill.icon}
                          alt={skill.name}
                          className="w-4 h-4"
                        />
                      </div>
                      <div>
                        <p>{skill.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <style jsx>{`
    .animate-marquee-left {
      animation: marquee-left 20s linear infinite;
      width: fit-content;
      will-change: transform;
    }

    .animate-marquee-right {
      animation: marquee-right 20s linear infinite; 
      width: fit-content;
      will-change: transform;
    }

    @keyframes marquee-left {
      from {
        transform: translate3d(0, 0, 0);
      }
      to {
        transform: translate3d(-50%, 0, 0);
      }
    }

    @keyframes marquee-right {
      from {
        transform: translate3d(-50%, 0, 0);
      }
      to {
        transform: translate3d(0, 0, 0);
      }
    }
  `}</style>
        </div>




      </div>
    </section>
  );
}