import { Card } from "@/components/ui/card";

export function RatingCircles() {
  return (
    <Card className="bg-secondary/50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        {["Design", "Functionality", "Creativity"].map((label, index) => {
          const percentages = [92, 88, 95];
          return (
            <div key={label} className="flex flex-col items-center space-y-2">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16">
                  <circle cx="32" cy="32" r="28" className="stroke-muted-foreground fill-none" strokeWidth="4" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-primary fill-none rotate-[-90deg] origin-center"
                    strokeWidth="4"
                    strokeDasharray="176"
                    strokeDashoffset={(176 - (176 * percentages[index]) / 100).toFixed(1)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                  {percentages[index]}%
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
