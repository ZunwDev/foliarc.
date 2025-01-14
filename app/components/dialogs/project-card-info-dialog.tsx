import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Project } from "@/lib/types";
import { formatISODate } from "@/lib/utils";
import { Info, Trash2 } from "lucide-react";

export function ProjectCardInfoDialog({
  data,
  isOpen,
  setDialogOpen,
  onSubmit,
}: {
  data: Project;
  isOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full hover:text-muted-foreground">
          <Info className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-xl font-semibold text-center">
          {data.status === "denied" ? "Denial Details" : "Submission Details"}
        </DialogTitle>
        <div className="text-sm text-muted-foreground space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Type:</span>
            <span className="font-bold">{data.type === "project" ? "Project" : "Portfolio"}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Technologies:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.technologies && data.technologies.map((item, index) => <Badge key={index}>{item}</Badge>)}
            </div>
          </div>

          {data.type === "project" && (
            <div className="flex justify-between items-center">
              <span className="font-medium">Title:</span>
              <span className="font-bold">{data.title}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="font-medium">Submitted On:</span>
            <span className="font-bold">{formatISODate(data.createdAt) || "Unknown"}</span>
          </div>

          {data.status === "denied" && (
            <div>
              <span className="font-medium">Deny Reason:</span>
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                {data.reason || "No specific reason provided."}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6">
          <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
            Close
          </Button>
          {data.status === "denied" && (
            <Button
              variant="destructive"
              onClick={onSubmit} //delete submission
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2">
              <Trash2 size={20} />
              Delete Submission
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
