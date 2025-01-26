import { UpdateProfileSchema } from "@/components/forms/update-profile-form";
import { Button } from "@/components/ui/button";
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
import { InputFormItem, MultiSelectFormItem, TextareaFormItem } from "@/components/util";
import { roles } from "@/lib/constants";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof UpdateProfileSchema>;

export function UpdateProfileDialog({
  form,
  isOpen,
  setDialogOpen,
  onSubmit,
  socialError,
}: {
  form: UseFormReturn<FormData>;
  isOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  onSubmit: (values: FormData) => void;
  socialError: string;
}) {
  type ProfileFormValues = {
    name: string;
    bio: string | null;
    tags: { value: string; label: string }[];
    location?: string;
    socials: { url: string; platform?: string }[];
  };

  const { fields, append, remove } = useFieldArray<ProfileFormValues>({
    control: form.control,
    name: "socials",
  });

  const handleAddSocial = () => {
    if (fields.length < 8) {
      append({ url: "", platform: "" });
    } else {
      alert("You can only add up to 8 social links.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute top-2 right-2 rounded-full shadow-md transition-colors">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputFormItem id="name" label="Name" form={form} placeholder="Hasnan Patel" required />
            <TextareaFormItem id="bio" label="Bio" size="sm" form={form} placeholder="Write something about yourself..." />
            <MultiSelectFormItem id="tags" label="Tags" form={form} data={roles} required placeholder="Select your roles" />
            <InputFormItem id="location" label="Location" form={form} placeholder="City, Country" />

            <div>
              {socialError && <p className="text-red-500">{socialError}</p>}
              <span className="text-sm">
                Socials <span className="text-muted-foreground">(optional)</span>
              </span>
              {fields.length === 0 && <p className="text-muted-foreground text-sm">No socials added yet.</p>}
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 w-full">
                  <div className="flex-1">
                    <InputFormItem
                      id={`socials.${index}.url`}
                      form={form}
                      placeholder="https://example.com/username"
                      className="w-full"
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                    className="flex items-center justify-center mt-2">
                    <Trash />
                  </Button>
                </div>
              ))}

              <Button type="button" variant="ghost" onClick={handleAddSocial} className="w-full mt-4">
                <Plus /> Add social link
              </Button>
            </div>
          </form>
        </Form>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
