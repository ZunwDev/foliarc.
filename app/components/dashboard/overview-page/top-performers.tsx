import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const performers = [
  {
    name: "John Doe",
    image: "/avatars/01.png",
    initials: "JD",
    reviewed: 10,
  },
  {
    name: "Jane Smith",
    image: "/avatars/02.png",
    initials: "JS",
    reviewed: 8,
  },
];

export function TopPerformers() {
  return (
    <div className="h-full">
      <Card className="col-span-3 h-full">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Most active reviewers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {performers.map((performer, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="size-9">
                  <AvatarImage src={performer.image} alt={performer.name} />
                  <AvatarFallback>{performer.initials}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{performer.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{performer.reviewed} Portfolios Reviewed</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
