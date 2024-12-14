import { BarChart, FileText, MessageSquare, Settings, Users } from "lucide-react";
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
    name: "Manage Feedback",
    icon: MessageSquare,
    link: "/dashboard/feedback",
  },
  {
    name: "Manage Users",
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
  const [activePath, setActivePath] = useState<string>("");

  // Set the current path on component mount
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <>
      {sidebarData.map((item) => {
        const isActive = activePath === item.link || (activePath.startsWith(item.link) && item.link !== "/dashboard");

        return (
          <a
            key={item.name}
            href={item.link}
            className={`flex items-center space-x-3 px-3 py-2 rounded ${
              isActive ? "bg-muted-foreground/10 text-muted-foreground font-bold" : "hover:bg-muted-foreground/10"
            }`}>
            <item.icon className="size-5" />
            <span>{item.name}</span>
          </a>
        );
      })}
    </>
  );
}
