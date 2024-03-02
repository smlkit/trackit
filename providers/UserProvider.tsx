"use client";

import React from "react";
import { UserContextProvider } from "@/hooks/useUserContext";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
