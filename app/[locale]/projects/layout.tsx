"use client";
import React from "react";
import { Home as HomeIcon, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <div style={{ position: "relative", minHeight: "100vh" }} suppressHydrationWarning>
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
          <div className="flex w-full justify-center mt-16 mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, idx) => {
                  const isLast = idx === breadcrumbItems.length - 1;
                  return (
                    <React.Fragment key={item.href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="flex items-center">
                            {item.isHome && <HomeIcon className="size-4 mr-2" />}
                            {item.name}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href} className="flex items-center hover:text-foreground">
                            {item.isHome && <HomeIcon className="size-4 mr-2" />}
                            {item.name}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <main className="w-full max-w-7xl px-4 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
