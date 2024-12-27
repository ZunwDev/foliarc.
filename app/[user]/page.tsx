"use client";
import { PortfolioCard } from "@/components/homepage";
import { UserInfo } from "@/components/profile";

const userData = {
  username: "jane_doe",
  name: "Jane Doe",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "Full-stack developer passionate about creating innovative web solutions.",
  location: "San Francisco, CA",
  website: "https://janedoe.com",
  projects: [
    { id: 1, title: "Project 1", description: "A cool project", image: "/placeholder.svg?height=150&width=250" },
    { id: 2, title: "Project 2", description: "Another awesome project", image: "/placeholder.svg?height=150&width=250" },
    { id: 3, title: "Project 3", description: "Yet another great project", image: "/placeholder.svg?height=150&width=250" },
    { id: 4, title: "Project 4", description: "A fantastic project", image: "/placeholder.svg?height=150&width=250" },
    { id: 5, title: "Project 5", description: "An amazing project", image: "/placeholder.svg?height=150&width=250" },
    { id: 6, title: "Project 6", description: "A brilliant project", image: "/placeholder.svg?height=150&width=250" },
  ],
  communityStats: {
    projectsCount: 23,
    commentsCount: 150,
    viewsCount: 10500,
  },
};

export default function UserProfile() {
  const likeAmount = 1;
  const items = [1, 2, 3, 4];

  return (
    <section className="relative flex flex-col min-w-[360px] min-h-[100dvh] py-16 bg-background overflow-hidden pt-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto container px-4 max-w-[1600px]">
        <div className="md:col-span-1">
          <UserInfo user={userData} />
        </div>
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-4">Jane Doe&apos;s Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {items.map((item, index) => (
              <PortfolioCard key={index} likeAmount={likeAmount} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
