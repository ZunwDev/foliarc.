import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Settings, Users } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const quickActions = [
    {
      name: "Review Portfolios",
      description: "Review and approve user-submitted portfolios for publishing",
      icon: FileText,
      link: "/dashboard/portfolios",
    },
    {
      name: "Manage Feedback",
      description: "View and respond to feedback from your users",
      icon: MessageSquare,
      link: "/dashboard/feedback",
    },
    {
      name: "Manage Users",
      description: "Manage user accounts and permissions",
      icon: Users,
      link: "/dashboard/users",
    },
    {
      name: "Settings",
      description: "Configure the dashboard and manage admin settings",
      icon: Settings,
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {quickActions.map((action) => (
        <Link key={action.name} href={action.link}>
          <Card className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer h-40 sm:h-44 md:h-40 lg:h-44 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex flex-row gap-2 items-center">
                <action.icon className="size-5 shrink-0" />
                <span className="text-base lg:text-lg font-semibold">{action.name}</span>
              </CardTitle>
              <CardDescription className="text-sm lg:text-base text-muted-foreground">{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm lg:text-base text-blue-500">Go to {action.name} →</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
