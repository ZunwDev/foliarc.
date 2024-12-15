"use client";
import { BarChart, FileText, MessageSquare, Settings, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarData = [
  {
    name: "Overview",
    icon: BarChart,
    link: "/dashboard",
  },
  {
    name: "Review Portfolios",
    icon: FileText,
    link: "/dashboard/review",
  },
  {
    name: "Feedback",
    icon: MessageSquare,
    link: "/dashboard/feedback",
  },
  {
    name: "Users",
    icon: Users,
    link: "/dashboard/users",
  },
  {
    name: "Settings",
    icon: Settings,
    link: "/dashboard/settings",
    children: [
      {
        name: "Theme",
        icon: Settings,
        link: "/dashboard/settings/theme",
      },
      {
        name: "Account",
        icon: Settings,
        link: "/dashboard/settings/account",
      },
    ],
  },
];

export function SidebarLinks() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleNavigation = (link: string) => {
    router.push(link);
  };

  useEffect(() => {
    if (pathname === "/dashboard/dashboard") {
      router.push("/dashboard");
    }
  }, [pathname, router]);

  return (
    <nav className="space-y-2">
      {sidebarData.map((item) => {
        const isActive = pathname === item.link;

        return (
          <div key={item.name}>
            <button
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault();
                  toggleExpand(item.name);
                } else {
                  handleNavigation(item.link);
                }
              }}
              className={`flex items-center justify-between px-3 py-2 rounded w-full ${
                isActive ? "bg-muted-foreground/10 text-muted-foreground font-bold" : "hover:bg-muted-foreground/10"
              }`}>
              <div className="flex items-center space-x-3">
                <item.icon className="size-5" />
                <span>{item.name}</span>
              </div>
              {item.children && <span className="text-muted-foreground">{expanded[item.name] ? "-" : "+"}</span>}
            </button>

            {item.children && expanded[item.name] && (
              <div className="ml-6 mt-2 space-y-1">
                {item.children.map((child) => {
                  const isChildActive = pathname === child.link;

                  return (
                    <button
                      key={child.name}
                      onClick={() => handleNavigation(child.link)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded w-full ${
                        isChildActive
                          ? "bg-muted-foreground/10 text-muted-foreground font-medium"
                          : "hover:bg-muted-foreground/10"
                      }`}>
                      <child.icon className="size-4" />
                      <span>{child.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
