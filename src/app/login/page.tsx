"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../../components/SupabaseProvider";

export default function LoginPage() {
  const { supabase } = useSupabase();

  return (
    <div
      className="login"
      style={{ maxWidth: 400, margin: "0 auto", paddingTop: 40 }}
    >
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        theme="dark"
        redirectTo="/dashboard"
      />
    </div>
  );
}
