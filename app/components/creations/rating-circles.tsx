import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RatingCircles() {
  return (
    <Card className="bg-secondary/50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        {["Hireability", "Creativity", "Aesthetic"].map((label, index) => {
          const score = [9, 4, 1];
          return (
            <div key={label} className="flex flex-col items-center space-y-2">
              <div className="relative size-16">
                <svg className="size-16">
                  <circle cx="32" cy="32" r="28" className="stroke-muted-foreground fill-none" strokeWidth="4" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-primary fill-none rotate-[-90deg] origin-center"
                    strokeWidth="4"
                    strokeDasharray="176"
                    strokeDashoffset={(176 - (176 * score[index]) / 10).toFixed(1)}
                  />
                </svg>
                <div
                  className={`absolute inset-0 flex items-center justify-center text-lg font-semibold ${cn(
                    isNaN(score[index])
                      ? "text-gray-500"
                      : score[index] <= 3
                      ? "text-red-500"
                      : score[index] <= 7
                      ? "text-yellow-500"
                      : "text-green-500"
                  )}`}>
                  {score[index]}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
