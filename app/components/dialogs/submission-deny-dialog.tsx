import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface PendingItem {
  id: string;
  userName: string;
  email: string;
  portfolioUrl: string;
  avatarUrl: string;
  submitDate: string;
  status: "pending" | "approved" | "denied";
  denyReason?: string;
}

export function SubmissionDenyDialog({
  item,
  setIsDialogOpen,
  isOpen,
  onSubmit,
  denyReason,
  setDenyReason,
  handleOpenDenyDialog,
}: {
  item: PendingItem;
  setIsDialogOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onSubmit: () => void;
  denyReason: string;
  setDenyReason: (value: string) => void;
  handleOpenDenyDialog: (id: string) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
          onClick={() => handleOpenDenyDialog(item.id)}>
          <X className="h-4 w-4 mr-1" />
          Deny
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deny Submission</DialogTitle>
          <DialogDescription>You are about to deny {item.userName}&apos;s submission.</DialogDescription>
        </DialogHeader>

        <Input placeholder="Enter the reason for denial" value={denyReason} onChange={(e) => setDenyReason(e.target.value)} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onSubmit} disabled={!denyReason.trim()}>
            Deny
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
