import Image from "next/image";
import { Button } from "./button";

interface TechIconProps {
  icon: string;
  name: string;
  url: string;
  className?: string;
}

export const TechIcon = ({ icon, name, url, className = "w-7 h-7" }: TechIconProps) => {
  return (
    <Button variant="ghost" size="sm" className="p-1 hover:bg-muted/80 rounded-lg transition-colors">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Learn more about ${name}`}
        className="flex items-center justify-center"
      >
        <Image
          src={icon}
          alt={`${name} icon`}
          width={28}
          height={28}
          className={className}
        />
      </Link>
    </Button>
  );
};
