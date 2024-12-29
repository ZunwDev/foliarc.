"use client";

import { PortfolioCard } from "@/components/homepage";
import { UserInfo } from "@/components/profile";
import { Custom404, Loading } from "@/components/util";
import { useFetchUser } from "@/lib/api/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const params = useParams();
  const username = params?.user || "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const likeAmount = 1;
  const items = [1, 2, 3, 4];

  const { data: fetchedUsers, isLoading } = useFetchUser(username as string, "username");
  const currentUser = fetchedUsers?.[0] || null;

  if (!mounted || isLoading) {
    return <Loading mounted={mounted} />;
  }
  if (!currentUser) return <Custom404 />;

  return (
    <section className="relative flex flex-col min-h-[100dvh] py-16 bg-background overflow-hidden pt-32 max-w-[1600px] mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* User Info Section */}
        <div className="md:w-1/3 lg:w-1/4 w-full shrink-0">
          <UserInfo user={currentUser} />
        </div>

        {/* Submissions Section */}
        <div className="md:w-3/4">
          <h2 className="text-2xl font-bold mb-4">{currentUser.name}&apos;s Submissions</h2>

          {/* Portfolio Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 lg:gap-6">
            {items.map((item, index) => (
              <PortfolioCard key={index} likeAmount={likeAmount} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
