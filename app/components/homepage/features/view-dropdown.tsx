import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Grid, List } from "lucide-react";
import React, { useEffect, useState } from "react";

type ViewModeOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const viewModes: ViewModeOption[] = [
  {
    value: "compact",
    label: "Compact",
    icon: <Grid size={20} />,
  },
  {
    value: "list",
    label: "List",
    icon: <List size={20} />,
  },
];

type ViewDropdownProps = {
  setViewToggle: React.Dispatch<React.SetStateAction<string>>;
};

export function ViewDropdown({ setViewToggle }: ViewDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedViewMode, setSelectedViewMode] = useState<ViewModeOption>({
    label: "Compact",
    value: "compact",
    icon: <Grid size={20} />,
  });

  useEffect(() => {
    setViewToggle(selectedViewMode.value);
  }, [selectedViewMode.value, setViewToggle]);

  return (
    <div className="hidden md:block">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="size-10 w-16" onClick={() => setViewToggle(selectedViewMode.value)}>
            {selectedViewMode.icon}
            <ChevronDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="!w-40 p-0" align="start">
          <ViewModeOptionList setIsOpen={setIsOpen} setSelectedViewMode={setSelectedViewMode} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ViewModeOptionList({
  setIsOpen,
  setSelectedViewMode,
}: {
  setIsOpen: (open: boolean) => void;
  setSelectedViewMode: (viewMode: ViewModeOption) => void;
}) {
  return (
    <Command>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {viewModes.map((viewMode) => (
            <CommandItem
              key={viewMode.value}
              value={viewMode.value}
              onSelect={(value) => {
                const selectedMode = viewModes.find((mode) => mode.value === value)!;
                setSelectedViewMode(selectedMode);
                setIsOpen(false);
              }}>
              {viewMode.icon} {viewMode.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
