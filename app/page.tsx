"use client";
import Hero from "@/components/homepage/Hero";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronUp, Grid, List, Sliders } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <section className="relative flex flex-col min-w-[360px] h-[100dvh] pt-16 bg-background">
      <div
        className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(ellipse_750px_500px_at_50%_-200px,rgba(200,250,255,0.6),transparent)]"
        style={{ filter: "blur(200px)" }}></div>

      <Hero />

      <div className="flex flex-row items-center gap-2 mt-12 sm:flex-row sm:gap-3 w-[1200px] xs:w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1200px] mx-auto z-10 justify-between">
        <SortComboBox />
        <ViewModeComboBox />
      </div>
      <div className="flex flex-col items-center gap-4 mt-3 sm:flex-row sm:gap-6 w-[1200px] xs:w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1200px] mx-auto z-10">
        <Card className="w-full rounded-lg shadow-lg overflow-hidden bg-secondary transition-all hover:bg-muted-foreground/30 hover:shadow-xl cursor-pointer relative">
          <CardHeader className="p-0">
            <div className="relative">
              <Button variant="outline" size="icon" className="absolute top-2 left-2 rounded-full">
                <ChevronUp />
              </Button>
              <span className="absolute top-2 left-12 bg-muted-foreground rounded-full px-2 flex justify-center items-center text-center text-sm font-semibold text-white">
                99+
              </span>
              <Image
                width={1200}
                height={300}
                src="/cats-9024710_960_720.jpg"
                alt="Portfolio Image"
                className="w-full h-[250px] object-cover"
              />
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold">Creative Web Design</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-2">
              A modern, sleek design showcasing creative web development projects for digital artists.
            </CardDescription>
            <div className="flex items-center mt-4">
              <Avatar className="mr-3">
                <AvatarImage src="https://via.placeholder.com/40" alt="Creator's Avatar" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                By John Doe, <span className="text-muted-foreground text-xs">30 min ago</span>
              </p>
            </div>
          </CardContent>
          <div className="absolute bottom-4 right-4 flex gap-2">
            {[
              { label: "Hireability", value: 80 },
              { label: "Creativity", value: 95 },
              { label: "Aesthetic", value: 90 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12">
                    <circle cx="24" cy="24" r="20" className="stroke-muted-foreground fill-none" strokeWidth="4" />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      className="stroke-primary fill-none"
                      strokeWidth="4"
                      strokeDasharray="126"
                      strokeDashoffset={(126 - (126 * stat.value) / 100).toFixed(1)}
                      style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{stat.value}%</div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  {
    value: "Hot",
    label: "Hot",
  },
  {
    value: "Popular",
    label: "Popular",
  },
  {
    value: "New",
    label: "New",
  },
  {
    value: "Old",
    label: "Old",
  },
];

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
    value: "cards",
    label: "Cards",
    icon: <List size={20} />,
  },
  {
    value: "more-cards",
    label: "More Cards",
    icon: <Sliders size={20} />,
  },
];

export function ViewModeComboBox() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedViewMode, setSelectedViewMode] = React.useState<ViewModeOption>({
    label: "Cards",
    value: "cards",
    icon: <List size={20} />,
  });

  return (
    <section>
      <div className="flex gap-4">
        {isDesktop ? (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="size-10">
                {selectedViewMode.icon}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <ViewModeOptionList setIsOpen={setIsOpen} setSelectedViewMode={setSelectedViewMode} />
            </PopoverContent>
          </Popover>
        ) : (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="size-10">
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

export function SortComboBox() {
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
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedSortOption ? <>{selectedSortOption.label}</> : <>Set Sort</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
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
                setSelectedViewMode(viewModes.find((mode) => mode.value === value)!);
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
