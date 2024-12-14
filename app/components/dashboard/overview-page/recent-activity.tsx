import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function RecentActivity() {
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-muted-foreground">
            <li className="py-4">
              <div className="flex flex-col">
                <p className="text-foreground font-medium">John Doe submitted a portfolio for review.</p>
                <p className="text-muted-foreground text-sm">2 hours ago</p>
              </div>
            </li>
            <Separator />
            <li className="py-4">
              <div className="flex flex-col">
                <p className="text-foreground font-medium">New feedback received from Jane Smith.</p>
                <p className="text-muted-foreground text-sm">4 hours ago</p>
              </div>
            </li>
            <Separator />
            <li className="py-4">
              <div className="flex flex-col">
                <p className="text-foreground font-medium">Admin settings updated by Zuno.</p>
                <p className="text-muted-foreground text-sm">1 day ago</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
