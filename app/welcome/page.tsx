"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { InputFormItem, Loading, MultiSelectFormItem, TextareaFormItem } from "@/components/util";
import { useCreateUser, useFetchUser } from "@/lib/api/hooks";
import { roles } from "@/lib/constants";
import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const welcomeSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Nickname must be at least 3 characters" })
    .max(16, { message: "Nickname must not exceed 16 characters" }),
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  bio: z.string().max(200, { message: "Bio must not exceed 200 characters" }).optional(),
  tags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "At least one tag must be selected")
    .max(3, "You can select up to 3 tags"),
});

export default function WelcomePage() {
  const { user, error, isLoading } = useUser();
  const { mutate: createUser, isError, error: createError } = useCreateUser();
  const { data: fetchedUsers, isLoading: isLoadingDbUser } = useFetchUser(user?.sub || "", "id");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && (!user || fetchedUsers)) {
      router.push("/");
    }
  }, [mounted, isLoading, user, fetchedUsers, router]);

  const form = useForm<z.infer<typeof welcomeSchema>>({
    mode: "onChange",
    resolver: zodResolver(welcomeSchema),
    defaultValues: {
      username: user?.nickname || user?.name || user?.email || "",
      name: "",
      bio: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("username", user.nickname || user.name || user.email || "");
    }
  }, [user, form]);

  if (!mounted || isLoading || isLoadingDbUser) {
    return <Loading mounted={mounted} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">There was an error loading your data. Please try again later.</p>
      </div>
    );
  }

  const onSubmit = async (values: z.infer<typeof welcomeSchema>) => {
    try {
      await welcomeSchema.parseAsync(values);
      setIsSubmitting(true);

      if (!user) {
        return;
      }

      const extendedValues = {
        ...values,
        id: user.sub as string,
        email: user?.email || null,
        bio: values.bio || null,
      };

      createUser(extendedValues, {
        onSuccess: () => {
          setIsSubmitting(false);
          setTimeout(() => {
            router.push("/");
          }, 500);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    !fetchedUsers &&
    user &&
    !isLoading &&
    !isLoadingDbUser && (
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
                  description="Enter a unique username. This will be used to identify you on the platform."
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
                <MultiSelectFormItem
                  label="Roles"
                  id="tags"
                  form={form}
                  data={roles}
                  placeholder="Select your roles"
                  required
                />

                {isError && createError && (
                  <p className="text-red-500 text-sm">
                    {createError.message || "An error occurred while creating your profile. Please try again."}
                  </p>
                )}

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
                  {isSubmitting ? "Creating..." : "Create profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  );
}
