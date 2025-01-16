"use client";
import { PortfolioCard } from "@/components/homepage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMount } from "@/lib/hooks";
import { useState } from "react";

export function PortfolioGallery() {
  const items = [
    { id: 1, type: "portfolio" },
    { id: 2, type: "project" },
    { id: 3, type: "portfolio" },
    { id: 4, type: "project" },
    { id: 5, type: "portfolio" },
    { id: 6, type: "project" },
    { id: 7, type: "portfolio" },
    { id: 8, type: "project" },
    { id: 9, type: "portfolio" },
    { id: 10, type: "project" },
    { id: 11, type: "portfolio" },
    { id: 12, type: "project" },
  ];
  const [activeTab, setActiveTab] = useState("all");
  const mounted = useMount();
  if (!mounted) return null;

  const filteredItems = items.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className="max-w-[1600px] mx-auto z-10 w-full mt-12 px-4">
      <div className="flex flex-row mb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className=" space-x-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolios</TabsTrigger>
            <TabsTrigger value="project">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="all"></TabsContent>
          <TabsContent value="portfolio"></TabsContent>
          <TabsContent value="project"></TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredItems.map((item, index) => (
          <PortfolioCard key={item.id} index={index} />
        ))}
      </div>
    </div>
  );
}
