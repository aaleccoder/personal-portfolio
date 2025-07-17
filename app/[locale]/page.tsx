import { Hero } from "@/components/hero";
import { Proyects } from "@/components/Proyects";
import { Story } from "@/components/Story";

export default function Home() {
  return (
    <div className="flex flex-col font-sans container justify-center mx-auto">
      <div className="bg-gradient-to-b from-primary to-transparent p-4">
        <Hero />
      </div>
      <main className="p-4 flex justify-center grid grid-cols-1">
        <Story />
        <Proyects />
      </main>
    </div>
  );
}