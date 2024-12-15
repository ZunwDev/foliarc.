"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, Bug, PlusCircle } from "lucide-react";

interface ChangelogItem {
  id: string;
  version: string;
  date: string;
  changes: {
    type: "new" | "improvement" | "fix";
    description: string;
  }[];
}

const changelogData: ChangelogItem[] = [
  /*   {
    version: "2.1.0",
    date: "2024-12-15",
    changes: [
      { type: "new", description: "Added dark mode support" },
      { type: "improvement", description: "Enhanced performance of data loading" },
      { type: "fix", description: "Fixed a bug causing occasional crashes on startup" },
    ],
  }, */
];

export function ChangelogList() {
  const getChangeIcon = (type: "new" | "improvement" | "fix") => {
    switch (type) {
      case "new":
        return <PlusCircle className="h-4 w-4 text-green-500" />;
      case "improvement":
        return <ArrowUpCircle className="h-4 w-4 text-blue-500" />;
      case "fix":
        return <Bug className="h-4 w-4 text-red-500" />;
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
  );
}
