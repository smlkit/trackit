import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type SidebarItemProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
};

const SidebarItem = ({ icon: Icon, label, active, href }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(`sidebar__item`, active && "text-blue-accent")}
    >
      <Icon size={24}></Icon>
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
