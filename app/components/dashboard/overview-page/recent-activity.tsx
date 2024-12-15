import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    user: {
      name: "John Doe",
      image: "/avatars/01.png",
      initials: "JD",
    },
    action: "submitted a portfolio for review",
    time: "2 hours ago",
  },
  {
    user: {
      name: "Jane Smith",
      image: "/avatars/02.png",
      initials: "JS",
    },
    action: "provided new feedback",
    time: "4 hours ago",
  },
  {
    user: {
      name: "Zuno",
      image: "/avatars/03.png",
      initials: "ZN",
    },
    action: "updated admin settings",
    time: "1 day ago",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="size-9">
                <AvatarImage src={activity.user.image} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
