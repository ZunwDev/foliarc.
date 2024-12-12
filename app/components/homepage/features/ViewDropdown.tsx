import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronDown, Grid, List } from "lucide-react";
import React from "react";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedViewMode, setSelectedViewMode] = React.useState<ViewModeOption>({
    label: "Compact",
    value: "compact",
    icon: <Grid size={20} />,
  });

  React.useEffect(() => {
    setViewToggle(selectedViewMode.value);
  }, [selectedViewMode.value, setViewToggle]);

  return (
    <section>
      <div className="flex gap-4">
        {isDesktop ? (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="size-10 w-16" onClick={() => setViewToggle(selectedViewMode.value)}>
                {selectedViewMode.icon}
                <ChevronDown className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align="start">
              <ViewModeOptionList setIsOpen={setIsOpen} setSelectedViewMode={setSelectedViewMode} />
            </PopoverContent>
          </Popover>
        ) : (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="size-10" onClick={() => setViewToggle(selectedViewMode.value)}>
                {selectedViewMode.icon}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mt-4 border-t">
                <ViewModeOptionList setIsOpen={setIsOpen} setSelectedViewMode={setSelectedViewMode} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </section>
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
