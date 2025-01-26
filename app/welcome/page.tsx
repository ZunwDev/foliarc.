"use client";
import { NewProfileForm } from "@/components/forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/util";
import { useFetchUser } from "@/lib/api/hooks";
import { useMount } from "@/lib/hooks";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WelcomePage() {
  const { user, isLoading } = useUser();
  const { data: fetchedUsers, isLoading: isLoadingDbUser } = useFetchUser(user?.sub || "", "id");
  const router = useRouter();
  const mounted = useMount();

  useEffect(() => {
    if (!isLoading && (!user || fetchedUsers)) router.push("/");
  }, [isLoading, user, fetchedUsers, router]);

  if (isLoading || isLoadingDbUser || !user || fetchedUsers) return <Loading mounted={mounted} />;

  return (
    <div className="flex items-center justify-center min-h-screen pt-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome 👋</CardTitle>
          <CardDescription>
            Finish your profile to get started, showcase your creations, and connect with others in the community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-8">
          <NewProfileForm user={user} mounted={mounted} />
        </CardContent>
      </Card>
    </div>
  );
}
