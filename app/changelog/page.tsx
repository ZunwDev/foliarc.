"use client";

import { ChangelogList } from "@/components/changelog";
import { Title } from "@/components/global";

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
      <Title>Changelog</Title>
      <ChangelogList />
    </section>
  );
}
