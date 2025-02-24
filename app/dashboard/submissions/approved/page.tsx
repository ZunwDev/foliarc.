"use client";

import { NewCreationForm } from "@/components/forms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApprovedItem } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

export default function ApprovedSubmissionsPage() {
  const [image, setImage] = useState<File | null>(null);
  const [selectedUser, setSelectedUser] = useState<ApprovedItem | null>(null);
  const [selectedType, setSelectedType] = useState("");

  const handleSelectUser = async (data: ApprovedItem | null) => {
    if (data) {
      const selectedItem = items.find((item) => item.id === data.id) || null;
      setSelectedUser(selectedItem);
    } else {
      setSelectedUser(null);
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const items: ApprovedItem[] = [
    {
      id: "1",
      userName: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      portfolioUrl: "https://portfolio.sarahjohnson.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      type: "portfolio",
      submitDate: "2023-12-15",
      technologies: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
        { value: "nextjs", label: "Next.js" },
      ],
      status: "pending",
    },
    {
      id: "2",
      userName: "Mike Chen",
      type: "portfolio",
      email: "mike.chen@example.com",
      portfolioUrl: "https://mikechen.dev",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      submitDate: "2023-12-14",
      technologies: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue" },
      ],
      status: "pending",
    },
    {
      id: "3",
      userName: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      type: "project",
      title: "Design Portfolio",
      portfolioUrl: "https://emilyrodriguez.design",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      submitDate: "2023-12-13",
      technologies: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
      ],
      status: "pending",
    },
    {
      id: "4",
      userName: "Alex Thompson",
      email: "alex.thompson@example.com",
      type: "project",
      title: "Personal Website",
      portfolioUrl: "https://alexthompson.io",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      submitDate: "2023-12-12",
      technologies: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
      ],
      status: "pending",
    },
  ];

  return (
    <div className="flex pt-16 justify-center px-4 md:px-6">
      <div className="flex flex-col w-full">
        <div className="pl-6">
          <h1 className="text-3xl font-bold tracking-tight">Approved Portfolio Submissions</h1>
          <p className="text-muted-foreground">
            Select a user from the list to fill in any missing details, and once completed, add their portfolio to the database.
            After selection, the submission will be removed from the list.
          </p>
        </div>
        <div className="flex flex-col xl:flex-row w-full h-[calc(70dvh)] gap-8 p-6 overflow-y-hidden">
          {/* User List Card */}
          <Card className="flex-1 w-full xl:w-1/3">
            <CardContent className="pt-6 h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center p-3 rounded-md cursor-pointer border ${
                        selectedUser?.id === item.id ? "border-blue-500" : "hover:border-blue-600"
                      } transition-all`}
                      onClick={() => handleSelectUser(item)}>
                      <Avatar className="flex-shrink-0">
                        <AvatarImage src={item.avatarUrl} alt={item.userName} />
                        <AvatarFallback>
                          {item.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <span
                          className={`block font-medium ${selectedUser?.id === item.id ? "text-blue-600" : "text-foreground"}`}>
                          {item.userName}
                        </span>
                        <span className="text-sm text-muted-foreground">{item.email || "No email provided"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Selected User Details Card */}
          <Card className="flex-1 w-full xl:w-2/3">
            <CardContent className="pt-6 h-full">
              {selectedUser ? (
                <div className="flex flex-col md:flex-row h-full gap-4">
                  <div className="w-full md:w-1/2 h-full flex-shrink-0">
                    <div className="flex flex-col items-center space-y-4 h-full">
                      <div
                        className="w-full h-full max-w-lg p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="fileInput"
                          onChange={(e) => handleFileChange(e.target.files)}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer h-full w-full flex items-center justify-center">
                          {image ? (
                            <div className="relative w-full h-full">
                              <Image
                                loading="lazy"
                                src={URL.createObjectURL(image)}
                                alt="Uploaded Preview"
                                className="absolute inset-0 object-contain w-full h-full rounded-md"
                                width={750}
                                height={1000}
                              />
                            </div>
                          ) : (
                            <div className="space-y-2 flex justify-center items-center h-full flex-col">
                              <p className="text-foreground">
                                Drag & drop an image, or <span className="text-blue-500 underline">click to select</span>
                              </p>
                              <p className="text-sm text-muted-foreground">Only image files are allowed</p>
                            </div>
                          )}
                        </label>
                      </div>
                      {image && (
                        <button onClick={() => setImage(null)} className="text-red-500 hover:text-red-600 transition-colors">
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-full xl:w-1/2 xl:h-full h-80 overflow-y-auto relative px-1">
                    <NewCreationForm
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      selectedUser={selectedUser}
                      onUserSelect={handleSelectUser}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center justify-center items-center flex h-full">
                  <p className="text-muted-foreground">Select a user from the list to view add form.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
