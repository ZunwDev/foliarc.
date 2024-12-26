import { Card, CardContent } from "@/components/ui/card";
import { Eye, FolderGit2, MessageSquare } from "lucide-react";

interface CommunityStatsProps {
  stats: {
    projectsCount: number;
    commentsCount: number;
    viewsCount: number;
  };
}

export function CommunityStats({ stats }: CommunityStatsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <FolderGit2 className="w-5 h-5 mr-2 text-muted-foreground" />
            <span className="font-medium">{stats.projectsCount} Projects</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-muted-foreground" />
            <span className="font-medium">{stats.commentsCount} Comments</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-muted-foreground" />
            <span className="font-medium">{stats.viewsCount} Views</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
