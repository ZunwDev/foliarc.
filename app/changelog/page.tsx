"use client";

import { ChangelogList } from "@/components/changelog";

export default function ReleaseNotes() {
  return (
    <section className="relative flex flex-col min-w-[360px] min-h-[100dvh] pt-16 bg-background overflow-x-hidden">
      <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative z-10">
        <h1 className="text-7xl font-semibold justify-center mx-auto mb-6 !specialtext">Changelog</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
          View the latest updates, features, and fixes in the changelog.
        </p>
      </div>
      <ChangelogList />
    </section>
  );
}
