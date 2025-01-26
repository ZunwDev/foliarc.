import { NewCreationSchema } from "@/components/forms/new-creation-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormItem, MultiSelectFormItem, SelectFormItem } from "@/components/util";
import { technologies } from "@/lib/constants";
import { ApprovedItem } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function NewCreationForm({
  selectedType,
  setSelectedType,
  selectedUser,
  onUserSelect,
}: {
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  selectedUser: ApprovedItem | null;
  onUserSelect: (user: ApprovedItem | null) => void;
}) {
  const form = useForm<z.infer<typeof NewCreationSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewCreationSchema),
    defaultValues: {
      url: "",
      technologies: [],
      type: "",
      title: "",
    },
  });
  useEffect(() => {
    if (selectedUser) {
      form.setValue("technologies", selectedUser.technologies, { shouldDirty: true, shouldTouch: true });
      form.setValue("url", selectedUser.portfolioUrl || "", { shouldDirty: true, shouldTouch: true });
      form.setValue("type", selectedUser.type || "", { shouldDirty: true, shouldTouch: true });

      setSelectedType(selectedUser.type || "");

      if (selectedUser.type.toLowerCase() === "project" && selectedUser.title) {
        form.setValue("title", selectedUser.title, { shouldDirty: true, shouldTouch: true });
      } else {
        form.setValue("title", "", { shouldDirty: true, shouldTouch: true });
      }
    } else {
      form.reset();
      form.setValue("type", "");
      setSelectedType("");
    }
  }, [selectedUser, form, setSelectedType]);

  const onSubmit = async (values: z.infer<typeof NewCreationSchema>) => {
    if (values.type.toLowerCase() === "project" && !values.title?.trim()) {
      form.setError("title", {
        type: "manual",
        message: "Title is required for projects",
      });
      return;
    }

    await NewCreationSchema.parseAsync(values);
    console.log(values);
    console.log("Creation submitted!");

    onUserSelect(null);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    form.setValue("type", value, { shouldValidate: true });

    if (value.toLowerCase() !== "project") {
      form.setValue("title", "", { shouldValidate: true });
    }

    if (value.toLowerCase() === "project") {
      form.trigger("title");
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="h-full w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-4">
            <InputFormItem
              label="Portfolio URL"
              id="url"
              form={form}
              required
              description="Insert a link to your portfolio or project."
              placeholder="https://www.example.com"
            />
            <MultiSelectFormItem
              id="technologies"
              label="Technologies"
              placeholder="Choose technologies..."
              description="Select one or more technologies."
              form={form}
              data={technologies}
              required
            />
            <SelectFormItem
              id="type"
              label="Type"
              form={form}
              required
              data={["Portfolio", "Project"]}
              description="Select whether this is a portfolio or project."
              onChange={handleTypeChange}
            />
            {selectedType.toLowerCase() === "project" && (
              <InputFormItem
                label="Title"
                id="title"
                form={form}
                required
                description="Provide a title for the project."
                placeholder="Enter title..."
              />
            )}
          </div>
          <div className="absolute xl:bottom-0 right-0 bottom-[-12rem]">
            <Button type="submit" disabled={!form.formState.isValid}>
              Add to Creations
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
