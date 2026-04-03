import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Dashboard from "./Dashboard";
import { UserProvider } from "./UserContext";

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from("profiles")   // ✅ using your real table
        .select("*")
        .limit(1);

      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        console.log("Supabase data:", data);
        if (data && data.length > 0) {
          setUser(data[0]); // take the first row
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

