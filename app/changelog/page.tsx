"use client";

import { ChangelogList } from "@/components/changelog";

export default function ReleaseNotes() {
  return (
    <section className="relative flex flex-col min-w-[360px] min-h-[100dvh] pt-16 bg-background overflow-x-hidden">
      <div
        className="absolute top-0 left-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(200,250,255,0.6),transparent)]"
        style={{
          filter: "blur(200px)",
          transform: "translate(-50%, -20%)",
        }}></div>

      <div
        className="absolute bottom-0 right-0 w-[900px] h-[700px] bg-[radial-gradient(ellipse,rgba(130,170,255,0.4),transparent)]"
        style={{
          filter: "blur(250px)",
          transform: "translate(50%, 50%)",
        }}></div>
      <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative z-10">
        <h1 className="text-6xl font-semibold justify-center mx-auto mb-6">Changelog</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
          View the latest updates, features, and fixes in the changelog.
        </p>
      </div>
      <ChangelogList />
    </section>
  );
}
