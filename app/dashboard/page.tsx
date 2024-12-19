"use client";
import { Overview, PendingList, UserFeedback } from "@/components/dashboard";

export default function Dashboard({ activeSection }: { activeSection: string }) {
  const renderSection = () => {
    switch (activeSection) {
      case "submissions/pending":
        return <PendingList />;
      case "feedback":
        return <UserFeedback />;
      default:
        return <Overview />;
    }
  };
  return renderSection();
}
