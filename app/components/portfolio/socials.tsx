import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Socials() {
  return (
    <Card className="bg-secondary/50 p-4 rounded-lg flex flex-wrap justify-start gap-2.5">
      <Link href={"https://github.com/JohnDoe"} target="_blank">
        <Button variant="outline" size="icon">
          <Github className="size-4" />
        </Button>
      </Link>
      <Link href={"https://x.com/JohnDoe"} target="_blank">
        <Button variant="outline" size="icon">
          <Twitter className="size-4" />
        </Button>
      </Link>
      <Link href={"https://linkedin.com/JohnDoe"} target="_blank">
        <Button variant="outline" size="icon">
          <Linkedin className="size-4" />
        </Button>
      </Link>
    </Card>
  );
}
