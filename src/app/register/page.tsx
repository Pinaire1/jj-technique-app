"use client";

import { useState } from "react";
import { useSupabase } from "../../components/SupabaseProvider";

export default function Register() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [beltLevel, setBeltLevel] = useState("White");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // Insert user data into 'users' table
    const userId = data.user?.id;
    if (userId) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          email,
          belt_level: beltLevel,
        },
      ]);
      if (insertError) {
        setErrorMsg(insertError.message);
      } else {
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <div
      className="register"
      style={{ maxWidth: 400, margin: "0 auto", paddingTop: 40 }}
    >
      <h2>Register</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <select
          onChange={(e) => setBeltLevel(e.target.value)}
          value={beltLevel}
          style={{ padding: "0.5rem" }}
        >
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Purple">Purple</option>
          <option value="Brown">Brown</option>
          <option value="Black">Black</option>
        </select>
        <button
          onClick={handleRegister}
          style={{
            padding: "0.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
