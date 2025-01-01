import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        loading="lazy"
        src={project.image}
        alt={project.title}
        width={250}
        height={150}
        className="w-full object-cover h-[150px]"
      />
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm">{project.description}</p>
      </CardContent>
      <CardFooter className="bg-muted p-4">
        <Button variant="outline" size="sm" className="w-full">
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
}
