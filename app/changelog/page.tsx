"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changelogData } from "@/lib/constants";
import { ArrowUpCircle, Bug, PlusCircle } from "lucide-react";

export default function ChangelogPage() {
  const getChangeIcon = (type: "new" | "improvement" | "fix") => {
    switch (type) {
      case "new":
        return <PlusCircle className="size-4 text-green-500" />;
      case "improvement":
        return <ArrowUpCircle className="size-4 text-blue-500" />;
      case "fix":
        return <Bug className="size-4 text-red-500" />;
    }
  };

  const daysAgo = (dateString: string) => {
    const today = new Date();
    const changeDate = new Date(dateString);
    const diffTime = today.getTime() - changeDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays <= 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

    return changeDate.toLocaleDateString();
  };

  const sortedChangelogData = [...changelogData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="relative flex flex-col min-h-[100dvh] pt-16 overflow-x-hidden">
      <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative">
        <h1 className="text-7xl font-semibold justify-center mx-auto mb-6 !specialtext">Changelog</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
          View the latest updates, features, and fixes in the changelog.
        </p>
      </div>
      <div className="min-[100dvh] bg-background p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-6">
            {sortedChangelogData.map((version, index) => (
              <Card key={index}>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Version {version.version}</CardTitle>
                      <p className="text-sm text-muted-foreground">Released {daysAgo(version.date)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    {version.changes.map((change, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {getChangeIcon(change.type)}
                        <span>{change.description}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
