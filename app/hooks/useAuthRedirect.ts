import { useUser } from "@auth0/nextjs-auth0/client"; // Or the auth library you're using
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthRedirect = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!user) {
      console.log("User is not logged in, redirecting to home...");
      router.push("/");
      return;
    }

    const validUserIds = process.env.NEXT_PUBLIC_ALLOWED_USERS?.split(",") || [];
    if (user.sub && !validUserIds.includes(user.sub)) {
      console.log("Invalid sub, redirecting to home...");
      router.push("/");
    }
  }, [user, isLoading, mounted, router]);

  return { user, isLoading, mounted };
};
