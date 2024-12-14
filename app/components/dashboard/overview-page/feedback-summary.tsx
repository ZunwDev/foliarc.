import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function FeedbackSummary() {
  return (
    <Link href="/dashboard/feedback">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Feedback Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-medium">Total Feedback</p>
              <p className="text-4xl font-bold">34</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium">Positive Feedback</p>
              <p className="text-4xl font-bold text-green-500">24</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium">Negative Feedback</p>
              <p className="text-4xl font-bold text-red-500">10</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
