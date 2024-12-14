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
    <div className="grid gap-4 md:grid-cols-3">
      {quickActions.map((action) => (
        <Link key={action.name} href={action.link}>
          <Card className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle className="flex flex-row gap-2">
                <action.icon className="size-5" />
                {action.name}
              </CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-blue-500">Go to {action.name} →</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
