import { Card } from "@/components/ui/card";
import { Activity, CheckCircle, List, MessageSquareText, User } from "lucide-react";

export function Metrics() {
  const metricsData = [
    {
      name: "Portfolios Pending",
      value: 12,
      icon: <Activity className="text-blue-500 size-12" />,
    },
    {
      name: "New Feedback",
      value: 4,
      icon: <MessageSquareText className="text-green-500 size-12" />,
    },
    {
      name: "New Users",
      value: 6,
      icon: <User className="text-yellow-500 size-12" />,
    },
    {
      name: "Total Portfolios",
      value: 42,
      icon: <List className="text-purple-500 size-12" />,
    },
    {
      name: "Approved Portfolios",
      value: 30,
      icon: <CheckCircle className="text-teal-500 size-12" />,
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {metricsData.map((item) => (
        <Card
          key={item.name}
          className="flex items-center justify-between p-6 shadow-md rounded-lg border hover:shadow-2xl transition-all">
          <div className="flex items-center space-x-6">
            {item.icon}
            <div className="text-left">
              <p className="text-sm font-semibold text-muted-foreground">{item.name}</p>
              <p className="lg:text-2xl xl:text-4xl font-extrabold text-foreground">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
