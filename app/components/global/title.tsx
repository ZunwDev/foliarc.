export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-6xl font-semibold h-32 justify-center mx-auto mt-16 uppercase">
      <span className="text-background bg-foreground px-16">{children}</span>
    </h1>
  );
}
