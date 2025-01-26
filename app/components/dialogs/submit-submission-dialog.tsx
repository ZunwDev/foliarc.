import { NewSubmissionSchema } from "@/components/forms/submission-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputFormItem, MultiSelectFormItem } from "@/components/util";
import { technologies } from "@/lib/constants";
import { Briefcase, File } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof NewSubmissionSchema>;

export function SubmitSubmissionDialog({
  form,
  onSubmit,
}: {
  form: UseFormReturn<FormData>;
  onSubmit: (values: FormData) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-8 md:px-10 lg:px-12 text-lg sm:text-xl md:text-2xl rounded-full text-white bg-blue-600 border-2 border-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 transform hover:scale-105 relative group">
          Submit Your Work
          <span className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Your Work</DialogTitle>
          <DialogDescription>
            Fill out your name and a link to your portfolio or project. Approval may take some time. Click{" "}
            <strong>submit</strong> when done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="mt-4">
            <div className="flex flex-col w-full gap-4">
              <RadioGroup className="w-full" value={form.watch("type")} onValueChange={(value) => form.setValue("type", value)}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="portfolio" id="portfolio" className="peer sr-only" />
                    <label
                      htmlFor="portfolio"
                      className="flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all">
                      <div className="flex flex-col items-center gap-1 w-full">
                        <Briefcase className="size-6 text-primary" />
                        <span className="font-medium">Portfolio</span>
                        <div
                          className={`absolute top-[0.5rem] right-[0.5rem] size-3 rounded-full border-2 ${
                            form.watch("type") === "portfolio"
                              ? "border-primary bg-primary flex items-center justify-center"
                              : "border-muted bg-transparent"
                          }`}>
                          {form.watch("type") === "portfolio" && <div className="size-1.5 rounded-full bg-white"></div>}
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Project Option */}
                  <div className="relative">
                    <RadioGroupItem value="project" id="project" className="peer sr-only" />
                    <label
                      htmlFor="project"
                      className="flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all">
                      <div className="flex flex-col items-center gap-1 w-full">
                        <File className="size-6 text-primary" />
                        <span className="font-medium">Project</span>
                        <div
                          className={`absolute top-[0.5rem] right-[0.5rem] size-3 rounded-full border-2 ${
                            form.watch("type") === "project"
                              ? "border-primary bg-primary flex items-center justify-center"
                              : "border-muted bg-transparent"
                          }`}>
                          {form.watch("type") === "project" && <div className="size-1.5 rounded-full bg-white"></div>}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </RadioGroup>
              <InputFormItem
                label="URL"
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
                description="Select one or more technologies you use in your project/portfolio."
                form={form}
                data={technologies}
                required
              />

              {form.watch("type") === "project" && (
                <InputFormItem
                  label="Project Title"
                  id="title"
                  form={form}
                  required
                  description="Provide a title for your project."
                  placeholder="Personal Finance App"
                />
              )}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
