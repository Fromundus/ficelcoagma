import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { useLocation, useResolvedPath } from "react-router-dom";
import type { NavItem } from '../types/NavItem';
import { useAuth } from '../store/auth';

type Props = {
  navItems: NavItem[];
}

const DashboardComponent = ({ navItems } : Props) => {
  const { sidebar, updateSidebar } = useAuth();

  function useHeaderLabel(items: NavItem[]) {
    const { pathname } = useLocation();

    // Resolve the parent route's absolute path (e.g., "/admin")
    // so we can convert relative hrefs like "services" -> "/admin/services"
    const basePath = useResolvedPath(".").pathname.replace(/\/$/, ""); // strip trailing slash

    return React.useMemo(() => {
      // Convert every item to an absolute path
      const normalized = items.map((i) => {
        const abs = i.href.startsWith("/")
          ? i.href
          : `${basePath}/${i.href}`;
        return { label: i.label, path: abs.replace(/\/+/g, "/") };
      });

      // 1) Try exact match
      const exact = normalized.find((n) => n.path === pathname);
      if (exact) return exact.label;

      // 2) Longest-prefix match (covers nested routes like "/admin/services/123")
      const prefix = normalized
        .filter((n) => pathname === n.path || pathname.startsWith(n.path + "/"))
        .sort((a, b) => b.path.length - a.path.length)[0];

      return prefix?.label ?? null;
    }, [items, pathname, basePath]);
  }

  return (
    <div className="h-screen w-full">
      <div className="relative h-full">
        {/* Sidebar (off-canvas on mobile, static on desktop) */}
        <div className='z-1'>
          <Sidebar open={sidebar} onClose={() => updateSidebar('false')} items={navItems} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {/* This is the MAIN SCROLL AREA */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <Header open={sidebar} title={useHeaderLabel(navItems)} onOpenSidebar={() => updateSidebar('true')} />

            {/* MAIN CONTENT */}
            <main className={`${sidebar === 'true' && "md:ml-72 lg:ml-72"} flex-1 mt-16 z-2`}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent
