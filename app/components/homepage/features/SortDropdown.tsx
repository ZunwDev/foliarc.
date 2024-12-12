import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import React from "react";

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "Hot", label: "Hot" },
  { value: "Popular", label: "Popular" },
  { value: "New", label: "New" },
  { value: "Old", label: "Old" },
];

export function SortDropdown() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedSortOption, setSelectedSortOption] = React.useState<SortOption>({
    label: "Popular",
    value: "popular",
  });

  if (isDesktop) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-between">
            {selectedSortOption ? <>{selectedSortOption.label}</> : <>Set Sort</>}
            <ChevronDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0" align="start">
          <SortOptionList setIsOpen={setIsOpen} setSelectedSortOption={setSelectedSortOption} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedSortOption ? <>{selectedSortOption.label}</> : <>+ Set Sort</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <SortOptionList setIsOpen={setIsOpen} setSelectedSortOption={setSelectedSortOption} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SortOptionList({
  setIsOpen,
  setSelectedSortOption,
}: {
  setIsOpen: (open: boolean) => void;
  setSelectedSortOption: (sortOption: SortOption) => void;
}) {
  return (
    <Command>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {sortOptions.map((sortOption) => (
            <CommandItem
              key={sortOption.value}
              value={sortOption.value}
              onSelect={(value) => {
                setSelectedSortOption(sortOptions.find((option) => option.value === value)!);
                setIsOpen(false);
              }}>
              {sortOption.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
