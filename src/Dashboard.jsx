import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import OnboardingStatusCards from "./components/OnboardingStatusCards";
import OnboardingStatusChart from "./components/OnboardingStatusChart";
import OnboardingStatusPie from "./components/OnboardingStatusPie";

// Supabase client (use env vars instead of hardcoding keys)
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

  useEffect(() => {
    if (user && !user.hasHeardIntro && !hasPlayedIntro) {
      playOnboardingAudio(user.role, async () => {
        await supabase
          .from("profiles") // ✅ update to match your table
          .update({ hasHeardIntro: true })
          .eq("id", user.id);

        user.hasHeardIntro = true;
        setHasPlayedIntro(true);
      });
    }
  }, [user, hasPlayedIntro]);

  if (!user) {
    return (
      <div className="bg-carbon min-h-screen p-6 text-center text-white">
        Loading user data...
      </div>
    );
  }

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
          Logged in as: {user.name || user.email || "Unknown User"} (Role:{" "}
          {user.role || "N/A"})
        </p>

        <button
          onClick={() =>
            playOnboardingAudio(user?.role || "Universal", () => {})
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

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Cards */}
        <OnboardingStatusCards showPendingOnly={showPendingOnly} />

        {/* Right column: Charts stacked */}
        <div className="space-y-8">
          <OnboardingStatusChart />
          <OnboardingStatusPie />
        </div>
      </div>
    </div>
  );
}
