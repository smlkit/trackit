"use client";

import React, { useEffect } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { redirect, useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      router.refresh();
    }
  }, [session, router]);

  if (session) return redirect("/dashboard");

  return (
    <div className="flex justify-center pt-24">
      <div className="auth-form">
        <h1 className="header-1">Welcome back!</h1>
        <p className="p pb-6">Enter your details below to login.</p>
        <Auth
          theme="dark"
          magicLink
          providers={[]}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#4361EE",
                  brandAccent: "#4361EE",
                  inputBorder: "#4361EE",
                  inputBackground: "#4361EE",
                  inputLabelText: "#8189B0",
                  anchorTextColor: "#8189B0",
                  anchorTextHoverColor: "#4361EE",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
