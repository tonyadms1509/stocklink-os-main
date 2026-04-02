import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import OnboardingStatusCards from "./components/OnboardingStatusCards";
import OnboardingStatusChart from "./components/OnboardingStatusChart";
import OnboardingStatusPie from "./components/OnboardingStatusPie";

// Supabase client (use env vars)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function playOnboardingAudio(userRole, onComplete) {
  const universalAudio = new Audio("/audio/universal_welcome.mp3");

  let roleAudioFile = null;
  if (userRole === "Foreman") {
    roleAudioFile = "/audio/foreman.mp3";
  } else if (userRole === "Admin") {
    roleAudioFile = "/audio/admin.mp3";
  }

  universalAudio.play();
  universalAudio.onended = () => {
    if (roleAudioFile) {
      const roleAudio = new Audio(roleAudioFile);
      roleAudio.play();
      roleAudio.onended = onComplete;
    } else {
      onComplete();
    }
  };
}

export default function Dashboard({ user }) {
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [profiles, setProfiles] = useState([]);

  // Fallback user if Supabase fails
  const fallbackUser = {
    id: 0,
    name: "Demo User",
    email: "demo@stocklinksa.co.za",
    role: "Admin",
    hasHeardIntro: false,
  };

  const activeUser = user || fallbackUser;

  useEffect(() => {
    // Fetch all profiles from Supabase
    async function fetchProfiles() {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        console.error("Supabase error:", error.message);
        setProfiles([fallbackUser]); // fallback if query fails
      } else {
        setProfiles(data);
      }
    }
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (activeUser && !activeUser.hasHeardIntro && !hasPlayedIntro) {
      playOnboardingAudio(activeUser.role, async () => {
        try {
          await supabase
            .from("profiles")
            .update({ hasHeardIntro: true })
            .eq("id", activeUser.id);

          activeUser.hasHeardIntro = true;
          setHasPlayedIntro(true);
        } catch (err) {
          console.error("Supabase update failed:", err.message);
        }
      });
    }
  }, [activeUser, hasPlayedIntro]);

  return (
    <div className="bg-carbon min-h-screen p-6">
      {/* Welcome section */}
      <div className="holographic-glass max-w-4xl mx-auto p-8 rounded-lg border-glow-red text-center mb-8">
        <h2 className="text-3xl font-bold text-glow-red mb-4">
          Welcome to StockLinkSA
        </h2>
        <p className="text-white mb-6">
          You’re now authenticated and inside the dashboard 🚀
        </p>
        <p className="text-white mb-6">
          Logged in as: {activeUser.name || activeUser.email} (Role:{" "}
          {activeUser.role})
        </p>

        <button
          onClick={() =>
            playOnboardingAudio(activeUser?.role || "Universal", () => {})
          }
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Replay Introduction
        </button>
      </div>

      {/* Toggle filter */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowPendingOnly(!showPendingOnly)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showPendingOnly ? "Show All Roles" : "Show Pending Only"}
        </button>
      </div>

      {/* Multi-row display */}
      <div className="holographic-glass max-w-4xl mx-auto p-6 rounded-lg border-glow-red mb-8">
        <h3 className="text-xl font-bold text-glow-red mb-4">Profiles</h3>
        {profiles.length === 0 ? (
          <p className="text-white">No profiles found.</p>
        ) : (
          <table className="w-full text-white border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-600 p-2">ID</th>
                <th className="border-b border-gray-600 p-2">Name</th>
                <th className="border-b border-gray-600 p-2">Email</th>
                <th className="border-b border-gray-600 p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id}>
                  <td className="border-b border-gray-700 p-2">{p.id}</td>
                  <td className="border-b border-gray-700 p-2">
                    {p.name || "N/A"}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {p.email || "N/A"}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {p.role || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OnboardingStatusCards showPendingOnly={showPendingOnly} />
        <div className="space-y-8">
          <OnboardingStatusChart />
          <OnboardingStatusPie />
        </div>
      </div>
    </div>
  );
}

