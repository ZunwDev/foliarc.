"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { InputFormItem, MultiSelectFormItem, TextareaFormItem } from "@/components/util";
import { roles } from "@/lib/constants";
import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod Schema for Validation
const welcomeSchema = z.object({
  nickname: z
    .string()
    .min(3, { message: "Nickname must be at least 3 characters" })
    .max(20, { message: "Nickname must not exceed 20 characters" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  bio: z.string().max(200, { message: "Bio must not exceed 200 characters" }).optional(),
  roles: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "At least one tag must be selected")
    .max(3, "You can select up to 3 tags"),
});

type WelcomeFormValues = z.infer<typeof welcomeSchema>;

export default function WelcomePage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  const form = useForm<z.infer<typeof welcomeSchema>>({
    mode: "onChange",
    resolver: zodResolver(welcomeSchema),
    defaultValues: {
      nickname: user?.nickname || user?.name || user?.email || "",
      name: "",
      bio: "",
      roles: [],
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("nickname", user.nickname || user.name || user.email || "");
    }
  }, [user, form]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">There was an error loading your data. Please try again later.</p>
      </div>
    );
  }

  const onSubmit = (data: WelcomeFormValues) => {
    console.log("Form data:", data);
    setTimeout(() => {
      router.push("/"); // Redirect after form submission
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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
                label="Nickname"
                id="nickname"
                placeholder="hasnan_patel"
                form={form}
                required
                description="Enter a unique nickname."
              />
              <InputFormItem
                label="Your Name"
                id="name"
                placeholder="Hasnan Patel"
                form={form}
                required
                description="Enter your full name to display on your profile and projects."
              />
              <TextareaFormItem label="Bio" id="bio" size="sm" placeholder="Tell us a little about yourself..." form={form} />
              <MultiSelectFormItem label="Roles" id="roles" form={form} data={roles} placeholder="Select your roles" required />

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
              <Button type="submit" className="w-full">
                Save and Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
