"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaRegCircleUser as AccountIcon } from "react-icons/fa6";
import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";
import { FiPlus as AddNewIcon } from "react-icons/fi";
import { RiLogoutBoxLine as LogoutIcon } from "react-icons/ri";

import SidebarItem from "./SidebarItem";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const supabaseClient = useSupabaseClient();
  const pathname = usePathname();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      // TODO: add toast
      console.log(error.message);
    }
  };

  const routes = useMemo(
    () => [
      {
        icon: AccountIcon,
        label: "Account",
        active: pathname === "/account",
        href: "/account",
      },
      {
        icon: DashboardIcon,
        label: "Dashboard",
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: AddNewIcon,
        label: "New Task",
        active: pathname === "/new-task",
        href: "/new-task",
      },
    ],
    [pathname],
  );
  return (
    <div className="flex h-full">
      <nav className="sidebar">
        <div className="flex flex-col gap-y-3">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item}></SidebarItem>
          ))}
        </div>
        <button onClick={handleLogout} className={"sidebar__item-logout"}>
          <LogoutIcon size={20} />
          Logout
        </button>
      </nav>
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Sidebar;
