"use client";

import { ProjectCard, UserInfo } from "@/components/profile";
import { Custom404, Loading } from "@/components/util";
import { useFetchUser } from "@/lib/api/hooks";
import { useMount } from "@/lib/hooks";
import { Project } from "@/lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const { user, isLoading: isUserLoading } = useUser();
  const params = useParams();
  const username = params?.user || "";
  const mounted = useMount();

  const data: Project[] = [
    {
      id: "1",
      type: "project",
      status: "pending",
      title: "Some random project",
      likeAmount: 120,
      createdAt: "2024-12-01T14:30:00Z",
      repliesCount: 15,
      technologies: ["React", "Next.js", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "2",
      type: "project",
      status: "denied",
      title: "E-commerce Website",
      likeAmount: 89,
      createdAt: "2024-11-20T10:00:00Z",
      repliesCount: 10,
      technologies: ["React", "Next.js", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "3",
      type: "portfolio",
      status: "approved",
      title: "Brand Logo Redesign",
      likeAmount: 55,
      createdAt: "2024-10-15T09:15:00Z",
      repliesCount: 5,
      technologies: ["React", "Next.js", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "4",
      type: "project",
      status: "approved",
      title: "Online Store Revamp",
      likeAmount: 200,
      createdAt: "2024-09-10T16:45:00Z",
      repliesCount: 25,
      technologies: ["React", "Next.js", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "5",
      type: "portfolio",
      status: "denied",
      likeAmount: 30,
      createdAt: "2024-08-05T12:00:00Z",
      repliesCount: 3,
      technologies: ["React", "Next.js", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  const { data: fetchedUsers, isLoading } = useFetchUser(username as string, "username");
  const currentUser = fetchedUsers?.[0] || null;

  const isCurrentUser = !!(user && currentUser && user.sub === currentUser.id);

  if (!mounted || isLoading || isUserLoading) return <Loading mounted={mounted} />;
  if (!currentUser) return <Custom404 />;

  return (
    <section className="relative min-h-[100dvh] py-16 bg-background overflow-hidden pt-32 max-w-[1600px] mx-auto px-4">
      <div className="flex flex-col xl:flex-row gap-8">
        <aside className="w-full xl:max-w-sm flex-shrink-0">
          <div className="h-full">
            <UserInfo user={currentUser} isCurrentUser={isCurrentUser} />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold mb-6">{isCurrentUser ? "Your Submissions" : `${currentUser.name}'s Work`}</h2>

          <section className="mb-12">
            {isCurrentUser && <h3 className="text-xl font-semibold mb-4">Live Work</h3>}
            {data.some((item) => item.status === "approved") ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {data
                  .filter((item) => item.status === "approved")
                  .map((item, index) => (
                    <ProjectCard key={index} isCurrentUser={isCurrentUser} data={item} />
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No published work yet.</p>
            )}
          </section>

          {isCurrentUser && (
            <section>
              <h3 className="text-xl font-semibold mb-4">Under Review</h3>
              {data.some((item) => item.status === "pending" || item.status === "denied") ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                  {data
                    .filter((item) => item.status === "pending" || item.status === "denied")
                    .map((item, index) => (
                      <ProjectCard key={index} isCurrentUser={isCurrentUser} data={item} />
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No work under review at the moment.</p>
              )}
            </section>
          )}
        </main>
      </div>
    </section>
  );
}
