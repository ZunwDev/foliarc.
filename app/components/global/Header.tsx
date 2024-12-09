export default function Header() {
  return (
    <>
      <header className="h-14 lg:h-[60px] px-8 w-full  z-[999] fixed md:min-w-[1200px] min-w-[360px] bg-secondary text-accent">
        <nav className="flex items-center h-full flex-row justify-between">
          <a className="flex flex-row gap-4 items-center" href="/"></a>
          <div className="flex md:gap-2 flex-row-reverse"></div>
        </nav>
      </header>
    </>
  );
}
