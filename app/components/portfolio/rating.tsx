import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@auth0/nextjs-auth0/client";

interface RatingProps {
  ratings: { [key: string]: number | null };
  setRatings: React.Dispatch<React.SetStateAction<{ [key: string]: number | null }>>;
}

export function Rating({ ratings, setRatings }: RatingProps) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleRatingChange = (category: string, value: number) => {
    if (!user) return;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));
  };

  return (
    <div className="pt-24">
      <h2 className="text-2xl font-semibold">Your Rating</h2>
      <p className="text-muted-foreground">
        {user ? "Rate this portfolio across multiple categories" : "Log in to rate this portfolio across multiple categories."}
      </p>

      <Card className="bg-secondary/20 p-6 rounded-lg shadow-md mt-6">
        {["Hireability", "Creativity", "Aesthetic"].map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-center">{category}</h3>
            <div className="flex justify-center space-x-2 flex-wrap gap-2">
              {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => (
                <Button
                  variant="outline"
                  key={number}
                  className={`size-12 rounded-full p-3 transition-all duration-200 ease-in-out transform ${
                    ratings[category.toLowerCase()] === number
                      ? "bg-blue-500 hover:bg-blue-700 transform scale-110"
                      : "bg-background text-blue-500 hover:bg-blue-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500"
                  }`}
                  onClick={() => handleRatingChange(category.toLowerCase(), number)}
                  disabled={!user}>
                  {number}
                </Button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <Button disabled={!user}>Save Rating</Button>
        </div>
      </Card>
    </div>
  );
}
