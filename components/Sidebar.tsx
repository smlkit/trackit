"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

import { FaRegCircleUser as AccountIcon } from "react-icons/fa6";
import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";
import { FiPlus as AddNewIcon } from "react-icons/fi";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import SidebarItem from "./SidebarItem";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();
  console.log(pathname);

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
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item}></SidebarItem>
        ))}
      </nav>
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Sidebar;
