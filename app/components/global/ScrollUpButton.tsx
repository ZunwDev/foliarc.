import { scrollToTop } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export default function ScrollUpButton() {
  return (
    <Button variant="outline" className="fixed bottom-4 right-4 rounded-full shadow size-12 z-50" onClick={scrollToTop}>
      <ArrowUp />
    </Button>
  );
}
