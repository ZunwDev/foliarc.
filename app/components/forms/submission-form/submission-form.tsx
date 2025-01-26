import { SubmitSubmissionDialog } from "@/components/dialogs";
import { NewSubmissionSchema } from "@/components/forms/submission-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SubmissionForm({ setHasSubmitted }: { setHasSubmitted: React.Dispatch<React.SetStateAction<boolean>> }) {
  //TODO: Add submit !! include an user in post who made it.
  const form = useForm<z.infer<typeof NewSubmissionSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewSubmissionSchema),
    defaultValues: {
      url: "",
      technologies: [],
      type: "portfolio",
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewSubmissionSchema>) => {
    console.log(values);
    setHasSubmitted(true);
  };

  return (
    <>
      <SubmitSubmissionDialog form={form} onSubmit={onSubmit} />
    </>
  );
}
