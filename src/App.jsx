import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Dashboard from "./Dashboard";
import { UserProvider } from "./UserContext";

// Initialize Supabase client using environment variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const mockUser = {
    id: 1,
    role: "Admin",
    hasHeardIntro: false,
  };

  // Test Supabase connection on first render
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase
        .from("your_table_name") // 🔑 replace with a real table in Supabase (e.g., "profiles" or "products")
        .select("*")
        .limit(1);

      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        console.log("Supabase data:", data);
      }
    }
    testSupabase();
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard user={mockUser} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
