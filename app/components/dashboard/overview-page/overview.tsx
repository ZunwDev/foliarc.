import { FeedbackSummary, Metrics, QuickActions, RecentActivity, TopPerformers } from "@/components/dashboard";
import { DatePickerWithRange } from "@/components/ui/datepickerwithrange";

export function Overview() {
  return (
    <>
      {/* Overview Section */}
      <section className="mb-12 pt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Overview</h2>
          <DatePickerWithRange />
        </div>
        <Metrics />
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
