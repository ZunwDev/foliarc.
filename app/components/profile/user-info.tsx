import { UpdateProfileDialog } from "@/components/dialogs";
import AvatarUploadDialog from "@/components/dialogs/avatar-upload-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UpdateProfileSchema } from "@/lib/schemas";
import { User } from "@/lib/types";
import { getInitials } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Linkedin, Mail, MapPin, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UserInfoProps {
  user: User;
  isCurrentUser: boolean;
}

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

export function UserInfo({ user, isCurrentUser }: UserInfoProps) {
  const [socialError, setSocialError] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);

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

  const handleImageUpload = async (file: File) => {
    try {
      //await uploadToServer(file);
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  return (
    <>
      <Card className="w-full xl:min-w-[20rem] mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl relative">
        <div className="h-20 xl:h-32 bg-gradient-to-r from-primary/10 to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-primary/10" />
        </div>

        {isCurrentUser ? (
          <UpdateProfileDialog
            form={form}
            isOpen={isDialogOpen}
            setDialogOpen={setDialogOpen}
            onSubmit={onSubmit}
            socialError={socialError}
          />
        ) : null}

        <CardContent className="pt-0 pb-8 w-full">
          <div className="flex flex-col xl:gap-0 xl:items-center w-full">
            <div className="relative group size-24 md:size-28 lg:size-32 xl:size-40 border-4 border-background shadow-xl -mt-16 rounded-full overflow-hidden transition-all duration-300">
              <Avatar className="w-full h-full" onError={() => setAvatarLoadError(true)}>
                <AvatarImage src={avatarLoadError ? undefined : user.avatar} alt={user.name} className="object-cover" />
                <AvatarFallback className="text-3xl bg-primary/10">{getInitials(user?.name ?? "")}</AvatarFallback>
              </Avatar>

              {isCurrentUser && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => setImageDialogOpen(true)}>
                  <Edit className="text-primary size-6 bg-background" />
                </div>
              )}
            </div>

            <div className="xl:text-center mt-2 space-y-1.5 xl:ml-0">
              <div className="flex xl:flex-col items-center gap-2 xl:gap-0">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground text-sm">@{user.username}</p>
              </div>

              {user.tags.length > 0 && (
                <div className="flex flex-wrap xl:justify-center gap-2 mt-4">
                  {user.tags.map((tag) => (
                    <Badge key={tag.value}>{tag.label}</Badge>
                  ))}
                </div>
              )}

              <p className="pt-2 xl:text-center text-foreground xl:max-w-sm leading-relaxed text-pretty truncate">{user.bio}</p>

              <div className="w-full pt-2 space-y-1">
                {user.email && (
                  <Link
                    href={`mailto:${user.email}`}
                    className="flex items-center space-x-2 group hover:text-blue-500 hover:underline text-pretty truncate">
                    <Mail size={16} className="text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </Link>
                )}
                {user.location ? (
                  <div className="flex items-center space-x-2 group hover:text-primary transition-colors">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                ) : isCurrentUser ? (
                  <div
                    onClick={() => setDialogOpen(true)}
                    className="items-center flex gap-1 text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                    <Plus size={16} className="text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm">Add location</span>
                  </div>
                ) : null}

                {user.socials?.length > 0 ? (
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    {user.socials.find((social) => social.platform === "twitter") && (
                      <Link
                        href={`https://twitter.com/${user.socials.find((social) => social.platform === "twitter")?.url}`}
                        target="_blank"
                        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                        aria-label="Twitter Profile">
                        <X size={16} className="text-primary hover:scale-110 transition-transform" />
                      </Link>
                    )}
                    {user.socials.find((social) => social.platform === "linkedin") && (
                      <Link
                        href={`https://linkedin.com/in/${user.socials.find((social) => social.platform === "linkedin")?.url}`}
                        target="_blank"
                        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                        aria-label="LinkedIn Profile">
                        <Linkedin size={16} className="text-primary hover:scale-110 transition-transform" />
                      </Link>
                    )}
                  </div>
                ) : isCurrentUser ? (
                  <div
                    onClick={() => setDialogOpen(true)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                    <Plus size={16} className="text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm">Add socials</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <AvatarUploadDialog isOpen={isImageDialogOpen} onClose={() => setImageDialogOpen(false)} onUpload={handleImageUpload} />
    </>
  );
}
