import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TopPerformers() {
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="flex justify-between mb-4">
              <span className="font-medium">John Doe</span>
              <span className="text-muted-foreground">10 Portfolios Reviewed</span>
            </li>
            <li className="flex justify-between mb-4">
              <span className="font-medium">Jane Smith</span>
              <span className="text-muted-foreground">8 Portfolios Reviewed</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
