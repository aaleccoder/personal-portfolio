"use client";
import React from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  // Remove locale segment if present (assume first segment is locale)
  const filteredSegments = segments.length > 0 && segments[0].length === 2 ? segments.slice(1) : segments;

  // Build breadcrumb items from filtered path segments
  const breadcrumbItems = [
    { name: "Home", href: "/", isHome: true },
    ...filteredSegments.map((segment, idx) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + filteredSegments.slice(0, idx + 1).join("/"),
      isHome: false
    }))
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background">
      <div className="w-full flex justify-center mt-16 mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, idx) => (
              <React.Fragment key={item.href}>
                <BreadcrumbItem>
                  {idx < breadcrumbItems.length - 1 ? (
                    <BreadcrumbLink asChild href={item.href}>
                      <Button variant="outline" size="sm" className="px-2 py-1">
                        {item.isHome ? <HomeIcon className="size-4" /> : item.name}
                      </Button>
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-base px-2 py-1 rounded-md font-semibold text-primary">{item.name}</span>
                  )}
                </BreadcrumbItem>
                {idx < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main className="">
        {children}
      </main>
    </div>
  );
}
