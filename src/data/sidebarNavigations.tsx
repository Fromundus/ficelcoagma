import { LuLayoutDashboard, LuMonitor, LuSettings, LuUser, LuUserPlus, LuUsers } from "react-icons/lu";
import type { NavItem } from "../types/NavItem"

export const userNavItems: NavItem[] = [
    {
        label: "Member Registration",
        href: "/user",
        icon: (
        <div className='text-xl'>
            <LuUserPlus />
        </div>
        ),
    },
    {
        label: "Change Password",
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
        label: "Registration Settings",
        href: "registration-settings",
        icon: (
        <div className='text-xl'>
            <LuSettings  />
        </div>
        ),
    },
    {
        label: "User Accounts",
        href: "accounts",
        icon: (
        <div className='text-xl'>
            <LuUsers />
        </div>
        ),
    },
    {
        label: "Change Password",
        href: "account-settings",
        icon: (
        <div className='text-xl'>
            <LuUser />
        </div>
        ),
    },
];

export const superAdminNavItems: NavItem[] = [
    // {
    //     label: "Dashboard",
    //     href: "/superadmin",
    //     icon: (
    //     <div className='text-xl'>
    //         <LuLayoutDashboard />
    //     </div>
    //     ),
    // },
    // {
    //     label: "Member Registration",
    //     href: "member-registration",
    //     icon: (
    //     <div className='text-xl'>
    //         <LuUserPlus />
    //     </div>
    //     ),
    // },
    // {
    //     label: "Registered Members",
    //     href: "registered-members",
    //     icon: (
    //     <div className='text-xl'>
    //         <LuMonitor />
    //     </div>
    //     ),
    // },
    {
        label: "User Accounts",
        href: "/superadmin",
        icon: (
        <div className='text-xl'>
            <LuUsers />
        </div>
        ),
    },
    {
        label: "Change Password",
        href: "account-settings",
        icon: (
        <div className='text-xl'>
            <LuUser />
        </div>
        ),
    },
];