import { NewProfileSchema } from "@/components/forms/new-profile-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormItem, LoadingSpinner, MultiSelectFormItem, TextareaFormItem } from "@/components/util";
import { useCreateUser } from "@/lib/api/hooks";
import { roles } from "@/lib/constants";
import { ApiError } from "@/lib/types";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface NewProfileFormProps {
  user: UserProfile;
  mounted: boolean;
}

export function NewProfileForm({ user, mounted }: NewProfileFormProps) {
  const router = useRouter();
  const { mutate: createUser, isPending: isSubmitting } = useCreateUser();

  const form = useForm<z.infer<typeof NewProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewProfileSchema),
    defaultValues: {
      username: (user?.nickname || user?.name || user?.email || "") as string,
      name: "",
      bio: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("username", (user.nickname || user.name || user.email || "") as string);
    }
  }, [user, form]);

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
        onError: (error: ApiError) => form.setError("username", { message: error.message }),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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
  );
}
