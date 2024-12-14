"use client";

import { FeedbackSummary, Overview, QuickActions, RecentActivity, TopPerformers } from "@/components/dashboard";
import { DatePickerWithRange } from "@/components/ui/datepickerwithrange";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, error, isLoading } = useUser();

  return (
    <div className="flex min-h-screen bg-background pt-16">
      <div className="flex-1 p-8">
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <RecentActivity />
          <TopPerformers />
        </section>

        {/* Feedback Summary Section */}
        <section className="mb-12">
          <FeedbackSummary />
        </section>
      </div>
    </div>
  );
}
