"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Option } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectRangeEventHandler } from "react-day-picker";

const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
  (e.target as HTMLInputElement).blur();
};

export function InputFormItem({
  id,
  label,
  placeholder = "",
  description = "",
  form,
  type = "text",
  suffix = "",
  prefix = "",
  required = false,
  className = "",
  ...rest
}: {
  id: string;
  label?: string;
  placeholder?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  type?: string;
  suffix?: string;
  prefix?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <FormItem>
      <FormLabel htmlFor={id} className="block" isRequired={required}>
        {label}
        {label && !required ? <span className="text-muted-foreground"> (optional)</span> : ""}
      </FormLabel>
      <div className="flex flex-row items-center">
        {prefix && (
          <div className={cn("bg-muted h-10 w-8 flex justify-center items-center border rounded-tl-md rounded-bl-md")}>
            <span className="text-sm">{prefix}</span>
          </div>
        )}
        <Input
          id={id}
          name={id}
          type={type}
          onWheel={handleWheel}
          placeholder={placeholder}
          {...form.register(id)}
          className={cn(
            "border rounded-md p-2",
            {
              "rounded-tl-none rounded-bl-none border-l-0": prefix,
              "rounded-tr-none rounded-br-none border-r-0": suffix,
            },
            className
          )}
          {...rest}
        />
        {suffix && (
          <div className={cn("bg-muted h-10 w-8 flex justify-center items-center border rounded-tr-md rounded-br-md truncate")}>
            <span className="text-sm">{suffix}</span>
          </div>
        )}
      </div>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form.formState.errors[id]?.message}</FormMessage>
    </FormItem>
  );
}

export function TextareaFormItem({
  id,
  label,
  placeholder,
  description,
  form,
  required = false,
  size = "md", // Default size
  ...rest
}: {
  id: string;
  label: string;
  placeholder?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-20",
    md: "h-44",
    lg: "h-64",
  };

  return (
    <FormItem>
      <FormLabel htmlFor={id} isRequired={required}>
        {label}
        {!required ? <span className="text-muted-foreground"> (optional)</span> : ""}
      </FormLabel>
      <Textarea id={id} name={id} placeholder={placeholder} {...form.register(id)} className={sizeClasses[size]} {...rest} />
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form?.formState?.errors?.[id]?.message}</FormMessage>
    </FormItem>
  );
}

export function CheckboxFormItem({
  id,
  label,
  description,
  form,
  checked = false,
  ...rest
}: {
  id: string;
  label: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  checked?: boolean;
}) {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleCheckboxChange = (e: boolean) => {
    setIsChecked(e);
    form.setValue(id, e);
  };

  return (
    <FormItem>
      <div className="flex flex-row gap-2 items-center">
        <Checkbox
          id={id}
          name={id}
          {...form.register(id)}
          {...rest}
          checked={isChecked}
          onCheckedChange={handleCheckboxChange} // Use onChange instead of onCheckedChange
        />
        <FormLabel htmlFor={id}>{label}</FormLabel>
      </div>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
}

export function DateRangeFormItem({
  id,
  label,
  description,
  form,
  required = false,
  date,
  setDate,
  ...rest
}: {
  id: string;
  label: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  required?: boolean;
  date?: { from: Date; to?: Date };
  setDate?: (date: { from: Date; to?: Date }) => void;
}) {
  const handleDateSelect: SelectRangeEventHandler = (range) => {
    if (range && range.from) {
      setDate?.({
        from: range.from,
        to: range.to || undefined,
      });
    }
  };

  return (
    <FormItem>
      <FormLabel htmlFor={id} className="block" isRequired={required}>
        {label}
      </FormLabel>
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              {...form.register(id)}
              variant="outline"
              {...rest}
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 size-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="!w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form.formState.errors[id]?.message}</FormMessage>
    </FormItem>
  );
}

export function SelectFormItem({
  id,
  label,
  placeholder,
  description,
  form,
  required = false,
  data = [],
  onChange,
  enableSearch = false,
  ...rest
}: {
  id: string;
  label: string;
  placeholder?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  required?: boolean;
  data?: string[];
  onChange?: (value: string) => void;
  enableSearch?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selectedValue = form.getValues(id)?.toLowerCase();
  const selectedItem = data.find((item) => item?.toLowerCase() === selectedValue);
  const buttonText = selectedItem ?? `Select ${id || "default"}...`;

  return (
    <FormItem className="flex flex-col space-y-2">
      <FormLabel htmlFor={id} isRequired={required}>
        {label}
      </FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              name={`${id}Select`}
              aria-expanded={open}
              className={cn({ "text-muted-foreground": !form.getValues(id) })}>
              {buttonText}
              <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className={cn({ "h-96": data.length > 10 })}>
          <Command>
            {enableSearch && <CommandInput placeholder={placeholder} />}
            <ScrollArea className={cn({ "h-96": data.length > 10 })}>
              <CommandEmpty>No {id} found.</CommandEmpty>
              <CommandGroup>
                {data.map((item, index) => (
                  <CommandItem
                    key={`${item}${index}`}
                    id={id}
                    value={item}
                    onSelect={(currentValue) => {
                      form.setValue(id, currentValue);
                      setOpen(false);
                      if (onChange) {
                        onChange(currentValue);
                      }
                    }}
                    {...rest}>
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>{description}</FormDescription>
      <FormMessage>{form.formState.errors[id]?.message}</FormMessage>
    </FormItem>
  );
}

export function MultiSelectFormItem({
  id,
  label,
  placeholder,
  description,
  form,
  data = [],
  required = false,
}: {
  id: string;
  label: string;
  placeholder?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  data?: Option[];
  required?: boolean;
}) {
  const [selectedValues, setSelectedValues] = useState<Option[]>(form.getValues(id) || []);

  useEffect(() => {
    const subscription = form.watch((value: Partial<Record<string, unknown>>, { name }: { name?: string }) => {
      if (name === id) {
        const formValues = (value[id] as Option[]) || [];
        if (!arraysEqual(formValues, selectedValues)) {
          setSelectedValues(formValues);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, id, selectedValues]);

  useEffect(() => {
    if (!arraysEqual(selectedValues, form.getValues(id))) {
      form.setValue(id, selectedValues, { shouldValidate: true, shouldDirty: true });
    }
  }, [selectedValues, form, id]);

  const toggleValue = (option: Option) => {
    setSelectedValues((current) => {
      const exists = current.some((item) => item.value === option.value);
      return exists ? current.filter((item) => item.value !== option.value) : [...current, option];
    });
  };

  const isValueSelected = (targetValue: string): boolean => {
    return selectedValues.some((item) => item?.value === targetValue);
  };

  return (
    <FormItem className="space-y-2">
      <FormLabel htmlFor={id} isRequired={required}>
        {label}
      </FormLabel>
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-hidden={false}
            className={cn("w-full justify-between h-fit", !selectedValues.length && "text-muted-foreground")}>
            {selectedValues.length ? (
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((value) => (
                  <Badge key={value.value} className="capitalize">
                    {value.label}
                  </Badge>
                ))}
              </div>
            ) : (
              <span>{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 h-96 z-[999]">
          <ScrollArea className="h-full z-[999]">
            <Command>
              <CommandInput placeholder={placeholder} />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {data.length > 0 ? (
                    data.map((option, index) => (
                      <CommandItem
                        key={`${option.value}-${index}`}
                        onSelect={() => toggleValue(option)}
                        className={isValueSelected(option.value) ? "bg-secondary/50" : ""}>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`${
                              isValueSelected(option.value) ? "text-blue-500 block" : "text-muted-foreground hidden"
                            }`}>
                            <Check size={16} />
                          </div>
                          <span>{option.label}</span>
                        </div>
                      </CommandItem>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground">No tags available</div>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form.formState.errors[id]?.message}</FormMessage>
    </FormItem>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arraysEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value.value === arr2[index].value);
};
