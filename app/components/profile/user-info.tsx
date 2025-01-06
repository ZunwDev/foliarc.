import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { InputFormItem, MultiSelectFormItem, TextareaFormItem } from "@/components/util";
import { technologies } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, ChevronsUpDown, Link2, Linkedin, Mail, MapPin, Trash, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

interface UserInfoProps {
  user: {
    username: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    tags: { value: string; label: string }[];
    socials: { platform: string; url: string }[];
  };
  isCurrentUser: boolean;
}

const profileSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .trim(),
  bio: z
    .string()
    .max(200, { message: "Bio must not exceed 200 characters" })
    .optional()
    .transform((val) => val?.trim() || null),
  tags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "At least one tag must be selected")
    .max(3, "You can select up to 3 tags"),
  email: z.string().email("Invalid email address"),
  location: z.string().optional(),
  socials: z
    .array(
      z.object({
        url: z.string().url("Invalid URL format"),
        platform: z.string().optional(),
      })
    )
    .optional()
    .default([]),
});

const extractPlatformFromUrl = (url: string): string => {
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("twitter.com")) return "Twitter";
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("youtube.com")) return "YouTube";
  if (url.includes("twitch.com")) return "Twitch";

  throw new Error(
    "Invalid URL. Please use a URL from one of the following platforms: LinkedIn, Twitter, Facebook, GitHub, Instagram, YouTube, or Twitch."
  );
};

export function UserInfo({ user, isCurrentUser }: UserInfoProps) {
  const [socialError, setSocialError] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio || "",
      tags: user.tags || [],
      email: user.email || "",
      location: user.location || "",
      socials: user.socials || [],
    },
  });

  type ProfileFormValues = {
    name: string;
    bio: string | null;
    tags: { value: string; label: string }[];
    email: string;
    location?: string;
    socials: { url: string; platform?: string }[];
  };

  const { fields, append, remove } = useFieldArray<ProfileFormValues>({
    control: form.control,
    name: "socials",
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const parsedValues = await profileSchema.parseAsync(values);
      if (socialError) setSocialError("");

      const finalSocials = parsedValues.socials?.map((social) => {
        try {
          const platform = extractPlatformFromUrl(social.url);
          return { ...social, platform };
        } catch {
          setSocialError(
            `${social.url} is not from allowed platforms. Please use a URL from one of the following platforms: LinkedIn, Twitter, Facebook, GitHub, Instagram, YouTube, or Twitch.`
          );
          return null;
        }
      });

      const validSocials = finalSocials?.filter((social) => social !== null);

      const finalValues = {
        ...parsedValues,
        socials: validSocials,
      };

      console.log("Final values:", finalValues);

      if (!socialError) {
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      throw new Error("Invalid form data");
    }
  };

  const handleAddSocial = () => {
    if (fields.length < 8) {
      append({ url: "", platform: "" });
    } else {
      alert("You can only add up to 8 social links.");
    }
  };

  return (
    <Card className="w-full xl:min-w-[20rem] mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl relative">
      <div className="h-20 xl:h-32 bg-gradient-to-r from-primary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/10" />
      </div>

      {isCurrentUser ? (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="absolute top-2 right-2 rounded-full shadow-md transition-colors"
              onClick={() => console.log("Edit Profile clicked")}>
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your profile</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <User className="size-4 text-muted-foreground" />
                          <span>Personal Info</span>
                        </div>
                        <ChevronsUpDown className="size-4 text-muted-foreground" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-3">
                      <InputFormItem id="name" label="Name" form={form} placeholder="Hasnan Patel" required></InputFormItem>
                      <TextareaFormItem
                        id="bio"
                        label="Bio"
                        size="sm"
                        form={form}
                        placeholder="Write something about yourself..."></TextareaFormItem>
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Briefcase className="size-4 text-muted-foreground" />
                          <span>Roles</span>
                        </div>
                        <ChevronsUpDown className="size-4 text-muted-foreground" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-3">
                      <MultiSelectFormItem
                        id="tags"
                        label="Tags"
                        form={form}
                        data={technologies}
                        placeholder="Select your roles"></MultiSelectFormItem>
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Mail className="size-4 text-muted-foreground" />
                          <span>Contact Info</span>
                        </div>
                        <ChevronsUpDown className="size-4 text-muted-foreground" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-3">
                      <InputFormItem
                        id="email"
                        label="Email"
                        form={form}
                        placeholder="example@gmail.com"
                        required></InputFormItem>
                      <InputFormItem id="location" label="Location" form={form} placeholder="City, Country"></InputFormItem>
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Link2 className="size-4 text-muted-foreground" />
                          <span>Social Links</span>
                        </div>
                        <ChevronsUpDown className="size-4 text-muted-foreground" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-3">
                      {socialError && <p className="text-red-500">{socialError}</p>}
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-3 w-full">
                          <div className="flex-1">
                            <InputFormItem
                              id={`socials.${index}.url`}
                              label="Link"
                              form={form}
                              placeholder="URL (e.g., https://linkedin.com/username)"
                              required
                              className="w-full"
                            />
                          </div>

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => remove(index)}
                            className="flex items-center justify-center mt-8">
                            <Trash />
                          </Button>
                        </div>
                      ))}

                      <Button type="button" variant="ghost" onClick={handleAddSocial} className="w-full">
                        + Add Social Link
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </form>
              </Form>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}

      <CardContent className="relative pt-0 pb-8">
        <div className="flex flex-col xl:gap-0 xl:items-center">
          <Avatar
            className="size-24 md:size-28 lg:size-32 xl:size-40 border-4 border-background shadow-xl -mt-16 transition-all duration-300"
            onError={() => setImageError(true)}>
            <AvatarImage src={imageError ? undefined : user.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback className="text-3xl bg-primary/10">{getInitials(user?.name ?? "")}</AvatarFallback>
          </Avatar>

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

            {user.bio && (
              <p className="mt-4 xl:text-center text-foreground max-w-sm leading-relaxed text-pretty truncate">{user.bio}</p>
            )}

            <div className="w-full mt-6 space-y-1">
              {user.location && (
                <div className="flex items-center space-x-2 group hover:text-primary transition-colors">
                  <MapPin size={18} className="text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.email && (
                <Link
                  href={`mailto:${user.email}`}
                  className="flex items-center space-x-2 group hover:text-blue-500 hover:underline text-pretty truncate">
                  <Mail size={18} className="text-muted-foreground" />
                  <span>{user.email}</span>
                </Link>
              )}
            </div>

            {user.socials?.length > 0 && (
              <div className="flex items-center justify-center space-x-4 mt-6">
                {user.socials.find((social) => social.platform === "twitter") && (
                  <Link
                    href={`https://twitter.com/${user.socials.find((social) => social.platform === "twitter")?.url}`}
                    target="_blank"
                    className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Twitter Profile">
                    <X size={20} className="text-primary hover:scale-110 transition-transform" />
                  </Link>
                )}
                {user.socials.find((social) => social.platform === "linkedin") && (
                  <Link
                    href={`https://linkedin.com/in/${user.socials.find((social) => social.platform === "linkedin")?.url}`}
                    target="_blank"
                    className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="LinkedIn Profile">
                    <Linkedin size={20} className="text-primary hover:scale-110 transition-transform" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
