"use client";

import React, { useEffect } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  console.log(session);

  useEffect(() => {
    if (session) {
      router.refresh();
    }
  }, [session, router]);

  return (
    <Auth
      theme="dark"
      magicLink
      providers={[]}
      supabaseClient={supabaseClient}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: { colors: { brand: "#4361EE", brandAccent: "#4361EE" } },
        },
      }}
    />
  );
};

export default Login;
