import { UpdateProfileDialog } from "@/components/dialogs";
import { UpdateProfileSchema } from "@/components/forms/update-profile-form";
import { User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const platformUrls = {
  linkedin: "linkedin.com",
  twitter: "twitter.com",
  facebook: "facebook.com",
  github: "github.com",
  instagram: "instagram.com",
  youtube: "youtube.com",
  twitch: "twitch.com",
};

const extractPlatformFromUrl = (url: string): string => {
  for (const [platform, platformUrl] of Object.entries(platformUrls)) {
    if (url.includes(platformUrl)) return platform;
  }

  throw new Error("Invalid URL. Please use a URL from one of the allowed platforms.");
};

export function UpdateProfileForm({
  user,
  isDialogOpen,
  setDialogOpen,
}: {
  user: User;
  isDialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
}) {
  const [socialError, setSocialError] = useState("");
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio || "",
      tags: user.tags || [],
      location: user.location || "",
      socials: user.socials || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
    try {
      const parsedValues = await UpdateProfileSchema.parseAsync(values);
      setSocialError("");
      let hasError = false;

      const finalSocials = parsedValues.socials?.map((social) => {
        try {
          const platform = extractPlatformFromUrl(social.url);
          return { ...social, platform };
        } catch {
          setSocialError(
            `${social.url} is not from allowed platforms. Please use a URL from one of the following platforms: LinkedIn, Twitter, Facebook, GitHub, Instagram, YouTube, or Twitch.`
          );
          hasError = true;
          return null;
        }
      });

      const validSocials = finalSocials?.filter((social) => social !== null);

      const finalValues = {
        ...parsedValues,
        socials: validSocials,
      };

      console.log("Final values:", finalValues);

      if (!hasError) {
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      throw new Error("Invalid form data");
    }
  };

  return (
    <UpdateProfileDialog
      form={form}
      isOpen={isDialogOpen}
      setDialogOpen={setDialogOpen}
      onSubmit={onSubmit}
      socialError={socialError}
    />
  );
}
