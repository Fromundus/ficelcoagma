import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import type { NavItem } from "../types/NavItem";
import { useAuth } from "../store/auth";
import Button from "./ui/Button";
import Logo from "./ui/Logo";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
};

export function Sidebar({ open, onClose, items }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
        onClick={onClose}
      />

      {/* Off-canvas (mobile) & static (desktop) sidebar */}
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-pearl shadow-xl transition-transform
                    md:static md:translate-x-0 md:shadow-none
                    dark:bg-slate-900 dark:text-slate-100
                    flex h-full flex-col overflow-hidden border-r
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar"
      >
        {/* Sidebar header (non-scrolling) */}
        <div className="flex h-16 items-center gap-2 px-4 border-b shrink-0">
          {/* <div className="h-9 w-9 rounded-xl bg-indigo-600" /> */}
          <span className="font-semibold text-lg text-center w-full">AGMA 2025</span>
          <button
            className="ml-auto md:hidden inline-flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Sidebar scroll area */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col">
          <div className="pb-4">
            <Logo />
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
                <li key={item.href}>
                    <NavLink
                        to={item.href}
                        end={item.href === `/${user?.role}`}
                        className={({ isActive }) =>
                        [
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                            isActive
                            ? "text-white bg-primary"
                            : "hover:bg-smoke",
                        ].join(" ")
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                </li>
            ))}
          </ul>

          <Button className="bg-primary text-white w-full mt-auto" onClick={logout}>
            Logout
          </Button>
        </nav>
      </aside>
    </>
  );
}
