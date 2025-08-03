import { RiMenu2Line } from "react-icons/ri";

type HeaderProps = {
  onOpenSidebar: () => void;
  title: string;
};

export function Header({ onOpenSidebar, title }: HeaderProps) {

  return (
    <header className="fixed top-0 h-16 w-full z-1 p-4 border-b bg-white/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800" style={{ zIndex: 1 }}>
      <div className="mx-auto flex h-full max-w-7xl w-full items-center gap-4">
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
          aria-controls="app-sidebar"
          aria-expanded={false}
        >
          {/* Hamburger */}
          <RiMenu2Line className="text-xl" />
        </button>

        <h1 className="text-nowrap">{title}</h1>

        <div className="ms-auto flex items-center gap-2">
          {/* {user?.name} */}
        </div>
      </div>
    </header>
  );
}
