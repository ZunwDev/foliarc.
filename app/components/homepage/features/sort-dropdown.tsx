import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/lib/hooks";
import { Option } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const sortOptions: Option[] = [
  { value: "Hot", label: "Hot" },
  { value: "Popular", label: "Popular" },
  { value: "New", label: "New" },
  { value: "Old", label: "Old" },
];

export function SortDropdown() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState<Option>({
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
        <DrawerHeader>
          <DrawerTitle>Sort Options</DrawerTitle>
          <DrawerDescription>Choose a sort option</DrawerDescription>
        </DrawerHeader>
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
  setSelectedSortOption: (sortOption: Option) => void;
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
