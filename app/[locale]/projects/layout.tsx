"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Folder, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const flipOptions = [
    '',
    'scaleX(-1)',
    'scaleY(-1)',
    'scaleX(-1) scaleY(-1)',
  ];
  const [randomFlip] = React.useState(() => flipOptions[Math.floor(Math.random() * flipOptions.length)]);

  const parallaxStyle = `
    @keyframes parallaxMove {
      0% { transform: ${randomFlip} translateY(0px) scale(1); }
      25% { transform: ${randomFlip} translateY(-20px) scale(1.03); }
      50% { transform: ${randomFlip} translateY(0px) scale(1.06); }
      75% { transform: ${randomFlip} translateY(20px) scale(1.03); }
      100% { transform: ${randomFlip} translateY(0px) scale(1); }
    }
    .parallax-bg {
      animation: parallaxMove 30s ease-in-out infinite;
    }
  `;
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const filteredSegments = segments.length > 0 && segments[0].length === 2 ? segments.slice(1) : segments;

  const breadcrumbItems = [
    { name: "Home", href: "/", isHome: true },
    ...filteredSegments.map((segment, idx) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + filteredSegments.slice(0, idx + 1).join("/"),
      isHome: false
    }))
  ];

  const [open, setOpen] = useState(false);

  function renderFileTree(items: typeof breadcrumbItems) {
    return (
      <ul className="flex flex-col items-start px-2 w-full space-y-4 contain-content mt-2" suppressHydrationWarning>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const Icon = isLast ? FileText : Folder;
          return (
            <div key={item.href} className="w-full" style={{ paddingLeft: `${idx * 0.5}rem` }}>
              <li
                className={`flex items-center hover:bg-accent cursor-pointer transition-all w-full px-4 py-2 rounded-md`}
                onClick={() => { window.location.href = item.href; setOpen(false); }}
              >
                {item.isHome ? <HomeIcon className="size-4 mr-2 shrink-0" /> : <Icon className="size-4 mr-2 text-muted-foreground shrink-0" />}
                <span
                  className={`truncate inline-block w-full ${isLast ? "font-semibold text-primary" : ""}`}
                >
                  {item.name}
                </span >
              </li >
            </div>
          );
        })}
      </ul >
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <style>{parallaxStyle}</style>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, width: "100vw", height: "100vh", pointerEvents: "none" }}>
        <Image
          src="/localhost_3000_en.png"
          alt="Background"
          fill
          className="parallax-bg"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={true}
        />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="flex flex-col items-center w-full min-h-screen px-4">
          <div className="flex w-[12rem] justify-center mt-16 mb-6">
            <div className="relative justify-center">
              <Button variant="outline" size="sm" className="px-2 justify-start" onClick={() => setOpen((v) => !v)}>
                <HomeIcon className="size-4 mr-2" />
                {breadcrumbItems[breadcrumbItems.length - 1].name}
                <span className="ml-2">▾</span>
              </Button>
              {open && (
                <div
                  className="absolute left-0 bg-popover/30 backdrop-blur-sm border border-border rounded-md shadow-lg z-10 px-2 py-2 mt-2"
                  style={{ minWidth: '12rem', width: 'max-content', maxWidth: '100%' }}
                >
                  {renderFileTree(breadcrumbItems)}
                </div>
              )}
            </div>
          </div>
          <main className="w-full max-w-7xl px-4 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
