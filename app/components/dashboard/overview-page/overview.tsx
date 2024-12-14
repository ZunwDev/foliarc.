import { Card } from "@/components/ui/card";
import { Activity, MessageSquareText, User } from "lucide-react";

export function Overview() {
  const overviewData = [
    {
      name: "Portfolios Pending",
      value: 12,
      icon: <Activity className="text-blue-500 size-16" />,
    },
    {
      name: "New Feedback",
      value: 4,
      icon: <MessageSquareText className="text-green-500 size-16" />,
    },
    {
      name: "New Users",
      value: 6,
      icon: <User className="text-yellow-500 size-16" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {overviewData.map((item) => (
        <Card
          key={item.name}
          className="flex items-center justify-between p-6 shadow-md rounded-lg border hover:shadow-2xl transition-all">
          <div className="flex items-center space-x-6">
            {item.icon}
            <div className="text-left">
              <p className="text-lg font-semibold text-muted-foreground">{item.name}</p>
              <p className="text-4xl font-extrabold text-foreground">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
