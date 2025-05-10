"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "../../components/SupabaseProvider";
import { User } from "@supabase/supabase-js";

export default function Dashboard() {
  const { supabase } = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [beltLevel, setBeltLevel] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("users")
        .select("belt_level")
        .eq("id", user.id)
        .single();

      if (data) setBeltLevel(data.belt_level);
    };

    fetchUser();
  }, [supabase]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>Welcome to your Dashboard</h1>
      {beltLevel && <p>Your belt level: {beltLevel}</p>}
    </div>
  );
}
