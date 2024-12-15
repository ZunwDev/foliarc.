"use client";
import {
  FeedbackSummary,
  Overview,
  QuickActions,
  RecentActivity,
  ReviewList,
  TopPerformers,
  UserFeedback,
} from "@/components/dashboard";
import { DatePickerWithRange } from "@/components/ui/datepickerwithrange";

export default function Dashboard({ activeSection }: { activeSection: string }) {
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            {/* Overview Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Overview</h2>
                <DatePickerWithRange />
              </div>
              <Overview />
            </section>

            {/* Quick Actions Section */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <QuickActions />
            </section>

            {/* Activity and Performers Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <RecentActivity />
              <TopPerformers />
              <FeedbackSummary />
            </section>
          </>
        );
      case "review":
        return <ReviewList />;
      case "feedback":
        return <UserFeedback />;
      default:
        return (
          <>
            {/* Overview Section */}
            <section className="my-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Overview</h2>
                <DatePickerWithRange />
              </div>
              <Overview />
            </section>

            {/* Quick Actions Section */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <QuickActions />
            </section>

            {/* Activity and Performers Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <RecentActivity />
              <TopPerformers />
              <FeedbackSummary />
            </section>
          </>
        );
    }
  };
  return renderSection();
}
