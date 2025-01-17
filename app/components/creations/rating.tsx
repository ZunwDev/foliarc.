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

  const categories = [
    {
      keyword: "hireability",
      label: "Does this creation demonstrate strong hireability?",
      labels: { low: "Not hireable", mid: "Potential hire", high: "Highly hireable" },
    },
    {
      keyword: "creativity",
      label: "How creative is this creation?",
      labels: { low: "Unoriginal", mid: "Moderately creative", high: "Extremely creative" },
    },
    {
      keyword: "aesthetic",
      label: "How aesthetically pleasing is this creation?",
      labels: { low: "Unappealing", mid: "Visually acceptable", high: "Highly aesthetic" },
    },
  ];

  return (
    <div className="pt-24">
      <h2 className="text-2xl font-semibold">Your Rating</h2>
      <p className="text-muted-foreground">
        {user ? "Rate this creation across multiple categories" : "Log in to rate this creation across multiple categories."}
      </p>

      <Card className="bg-secondary/50 p-6 rounded-lg shadow-md mt-6 flex flex-col gap-8 justify-center items-center">
        {categories.map(({ keyword, label, labels }) => (
          <div key={keyword} className="max-w-[550px] items-center justify-center">
            <h3 className="text-lg font-medium mb-2">{label}</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => (
                  <Button
                    variant="outline"
                    key={number}
                    className={`p-3 md:size-12 md:p-0 transition-all duration-200 ease-in-out transform text-xl font-semibold ${
                      ratings[keyword] === number
                        ? "bg-blue-500 hover:bg-blue-700 transform scale-110 text-white hover:text-white"
                        : "bg-background text-blue-500 hover:bg-blue-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500 hover:text-background"
                    }`}
                    onClick={() => handleRatingChange(keyword, number)}
                    disabled={!user}>
                    {number}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between w-full max-w-[320px] sm:max-w-[550px] mt-2 text-sm font-medium text-muted-foreground">
                <span className="flex-1 text-left px-2">{labels.low}</span>
                <span className="flex-1 text-center px-2">{labels.mid}</span>
                <span className="flex-1 text-right px-2">{labels.high}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end ml-auto">{user ? <Button>Save Rating</Button> : null}</div>
      </Card>
    </div>
  );
}
