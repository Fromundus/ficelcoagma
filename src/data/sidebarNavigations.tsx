import { LuLayoutDashboard, LuMonitor, LuUser, LuUserPlus, LuUsers } from "react-icons/lu";
import type { NavItem } from "../types/NavItem"

export const preNavItems: NavItem[] = [
    {
        label: "Member Registration",
        href: "/pre",
        icon: (
        <div className='text-xl'>
            <LuUserPlus />
        </div>
        ),
    },
    {
        label: "Account Settings",
        href: "account-settings",
        icon: (
        <div className='text-xl'>
            <LuUser />
        </div>
        ),
    },
];

export const onsNavItems: NavItem[] = [
    {
        label: "Member Registration",
        href: "/ons",
        icon: (
        <div className='text-xl'>
            <LuUserPlus />
        </div>
        ),
    },
    {
        label: "Account Settings",
        href: "account-settings",
        icon: (
        <div className='text-xl'>
            <LuUser />
        </div>
        ),
    },
];

export const adminNavItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: (
        <div className='text-xl'>
            <LuLayoutDashboard />
        </div>
        ),
    },
    {
        label: "Member Registration",
        href: "member-registration",
        icon: (
        <div className='text-xl'>
            <LuUserPlus />
        </div>
        ),
    },
    {
        label: "Registered Members",
        href: "registered-members",
        icon: (
        <div className='text-xl'>
            <LuMonitor />
        </div>
        ),
    },
    {
        label: "Accounts",
        href: "accounts",
        icon: (
        <div className='text-xl'>
            <LuUsers />
        </div>
        ),
    },
    {
        label: "Account Settings",
        href: "account-settings",
        icon: (
        <div className='text-xl'>
            <LuUser />
        </div>
        ),
    },
];