"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { InputFormItem, Loading, LoadingSpinner, MultiSelectFormItem, TextareaFormItem } from "@/components/util";
import { useCreateUser, useFetchUser } from "@/lib/api/hooks";
import { roles } from "@/lib/constants";
import { useMount } from "@/lib/hooks";
import { NewProfileSchema } from "@/lib/schemas";
import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function WelcomePage() {
  const { user, isLoading } = useUser();
  const { mutate: createUser, isPending: isSubmitting } = useCreateUser();
  const { data: fetchedUsers, isLoading: isLoadingDbUser } = useFetchUser(user?.sub || "", "id");
  const router = useRouter();
  const mounted = useMount();

  useEffect(() => {
    if (!isLoading && (!user || fetchedUsers)) router.push("/");
  }, [isLoading, user, fetchedUsers, router]);

  const form = useForm<z.infer<typeof NewProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewProfileSchema),
    defaultValues: {
      username: user?.nickname || user?.name || user?.email || "",
      name: "",
      bio: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (user) form.setValue("username", user.nickname || user.name || user.email || "");
  }, [user, form]);

  if (isLoading || isLoadingDbUser || !user || fetchedUsers) return <Loading mounted={mounted} />;

  const onSubmit = async (values: z.infer<typeof NewProfileSchema>) => {
    try {
      await NewProfileSchema.parseAsync(values);
      const extendedValues = {
        ...values,
        id: user?.sub as string,
        email: user?.email || null,
        bio: values.bio || null,
      };

      createUser(extendedValues, {
        onSuccess: () => setTimeout(() => router.push("/"), 500),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => form.setError("username", { message: error.toString() }),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome 👋</CardTitle>
          <CardDescription>
            Finish your profile to get started, showcase your work, and connect with others in the community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputFormItem
                label="Username"
                id="username"
                placeholder="hasnan_patel"
                form={form}
                prefix="@"
                required
                description="Enter a unique username. This will be used to identify you on the platform. It can't be changed later."
              />
              <InputFormItem
                label="Your Name"
                id="name"
                placeholder="Hasnan Patel"
                form={form}
                required
                description="Enter your full name, appears on your profile and projects."
              />
              <TextareaFormItem label="Bio" id="bio" size="sm" placeholder="Tell us a little about yourself..." form={form} />
              <MultiSelectFormItem label="Roles" id="tags" form={form} data={roles} placeholder="Select your roles" required />
              <div className="pt-4 text-sm text-muted-foreground">
                <p>
                  By creating your profile, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-service" className="text-blue-500 hover:underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner mounted={mounted} size={4} /> : "Create profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
