"use client";

import React, { ReactNode } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const { session, isLoading } = useSessionContext();

  if (!session && !isLoading) return redirect("/auth");

  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
};

export default Layout;
