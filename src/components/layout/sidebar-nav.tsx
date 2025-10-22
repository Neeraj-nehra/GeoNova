"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Map,
  FilePlus,
  Siren,
  Settings,
  LogOut,
  Mountain,
  UserCircle,
  BarChart,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/susceptibility-map", icon: Map, label: "Susceptibility Map" },
  { href: "/dashboard/submit-report", icon: FilePlus, label: "Submit Report" },
  { href: "/dashboard/early-warning", icon: Siren, label: "Early Warning" },
  { href: "/dashboard/real-time-risk", icon: BarChart, label: "Real-time Risk" },
  { href: "/dashboard/news", icon: Newspaper, label: "News" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user } = useUser();

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push("/");
    });
  };

  return (
    <Sidebar>
      <div className="flex h-full w-full flex-col bg-gradient-to-b from-emerald-800 to-teal-900 text-sidebar-foreground">
        <SidebarHeader className="border-b border-sidebar-border/50">
          <div className="flex items-center gap-2 p-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold font-headline text-white">
              GeoNova
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    as="a"
                    isActive={pathname === item.href}
                    className={cn(
                        "data-[active=true]:bg-white/10 data-[active=true]:text-white hover:bg-white/5",
                        "text-sidebar-foreground hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator className="my-0 bg-sidebar-border/50" />
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL ?? `https://picsum.photos/seed/avatar/100/100`} />
              <AvatarFallback>
                <UserCircle />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-emerald-200 truncate">{user?.email || 'No email'}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-emerald-200 hover:text-white hover:bg-white/10"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
