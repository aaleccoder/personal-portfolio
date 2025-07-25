"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BriefcaseIcon,
  FolderKanbanIcon,
  Library,
  LogOutIcon,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/auth-js";

import { useRouter } from "next/navigation";

export const AppSidebar = () => {
  const pathname = usePathname();
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const items = [
    {
      title: "Skills",
      icon: BriefcaseIcon,
      url: `/admin/dashboard/skills`,
    },
    {
      title: "Past Experiences",
      icon: BriefcaseIcon,
      url: `/admin/dashboard/experiences`,
    },
    {
      title: "Projects",
      icon: FolderKanbanIcon,
      url: `/admin/dashboard/proyects`,
    },
  ];

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      router.push("/error");
      console.error("Error signing out:", error.message);
    }
    router.push("/admin");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title} className="px-4">
                <SidebarMenuButton asChild>
                  <a className="cursor-pointer" href={item.url}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-center justify-center">
        <div className="contain-content">
          <span className="text-center font-sans text-[1rem]">
            {user?.email}
          </span>
        </div>
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          <LogOutIcon></LogOutIcon>
          <p>Logout</p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
