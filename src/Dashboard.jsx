import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import OnboardingStatusCards from "./components/OnboardingStatusCards";
import OnboardingStatusChart from "./components/OnboardingStatusChart";
import OnboardingStatusPie from "./components/OnboardingStatusPie";
import DealerLocationChart from "./components/DealerLocationChart";
import DealerLocationPie from "./components/DealerLocationPie";

// Supabase client (use env vars)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function playOnboardingAudio(userRole, onComplete) {
  const universalAudio = new Audio("/audio/universal_welcome.mp3");
  let roleAudioFile = null;
  if (userRole === "Foreman") roleAudioFile = "/audio/foreman.mp3";
  else if (userRole === "Admin") roleAudioFile = "/audio/admin.mp3";

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
  const [contractors, setContractors] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [counts, setCounts] = useState({ profiles: 0, contractors: 0, dealers: 0 });

  const fallbackUser = {
    id: 0,
    name: "Demo User",
    email: "demo@stocklinksa.co.za",
    role: "Admin",
    hasHeardIntro: false,
  };
  const activeUser = user || fallbackUser;

  useEffect(() => {
    async function fetchProfiles() {
      const { data } = await supabase.from("profiles").select("*");
      setProfiles(data || []);
    }
    async function fetchContractors() {
      const { data } = await supabase.from("contractors").select("*");
      setContractors(data || []);
    }
    async function fetchDealers() {
      const { data } = await supabase.from("dealers").select("*");
      setDealers(data || []);
    }
    async function fetchCounts() {
      const { count: profilesCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      const { count: contractorsCount } = await supabase
        .from("contractors")
        .select("*", { count: "exact", head: true });
      const { count: dealersCount } = await supabase
        .from("dealers")
        .select("*", { count: "exact", head: true });
      setCounts({
        profiles: profilesCount || 0,
        contractors: contractorsCount || 0,
        dealers: dealersCount || 0,
      });
    }
    fetchProfiles();
    fetchContractors();
    fetchDealers();
    fetchCounts();
  }, []);

  useEffect(() => {
    if (activeUser && !activeUser.hasHeardIntro && !hasPlayedIntro) {
      playOnboardingAudio(activeUser.role, async () => {
        await supabase.from("profiles").update({ hasHeardIntro: true }).eq("id", activeUser.id);
        activeUser.hasHeardIntro = true;
        setHasPlayedIntro(true);
      });
    }
  }, [activeUser, hasPlayedIntro]);

  return (
    <div className="bg-carbon min-h-screen p-6">
      {/* Welcome section */}
      <div className="holographic-glass max-w-4xl mx-auto p-8 rounded-lg border-glow-red text-center mb-8">
        <h2 className="text-3xl font-bold text-glow-red mb-4">Welcome to StockLinkSA</h2>
        <p className="text-white mb-6">You’re now authenticated and inside the dashboard 🚀</p>
        <p className="text-white mb-6">
          Logged in as: {activeUser.name || activeUser.email} (Role: {activeUser.role})
        </p>
        <button
          onClick={() => playOnboardingAudio(activeUser?.role || "Universal", () => {})}
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

      {/* Profiles table */}
      <div className="holographic-glass max-w-4xl mx-auto p-6 rounded-lg border-glow-red mb-8">
        <h3 className="text-xl font-bold text-glow-red mb-4">Profiles</h3>
        {profiles.length === 0 ? <p className="text-white">No profiles found.</p> : (
          <table className="w-full text-white border-collapse">
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>{profiles.map(p => (
              <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.email}</td><td>{p.role}</td></tr>
            ))}</tbody>
          </table>
        )}
      </div>

      {/* Contractors table */}
      <div className="holographic-glass max-w-4xl mx-auto p-6 rounded-lg border-glow-red mb-8">
        <h3 className="text-xl font-bold text-glow-red mb-4">Contractors</h3>
        {contractors.length === 0 ? <p className="text-white">No contractors found.</p> : (
          <table className="w-full text-white border-collapse">
            <thead><tr><th>ID</th><th>Name</th><th>Role</th></tr></thead>
            <tbody>{contractors.map(c => (
              <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.role}</td></tr>
            ))}</tbody>
          </table>
        )}
      </div>

      {/* Dealers table */}
      <div className="holographic-glass max-w-4xl mx-auto p-6 rounded-lg border-glow-red mb-8">
        <h3 className="text-xl font-bold text-glow-red mb-4">Dealers</h3>
        {dealers.length === 0 ? <p className="text-white">No dealers found.</p> : (
          <table className="w-full text-white border-collapse">
            <thead><tr><th>ID</th><th>Name</th><th>Location</th></tr></thead>
            <tbody>{dealers.map(d => (
              <tr key={d.id}><td>{d.id}</td><td>{d.name}</td><td>{d.location}</td></tr>
            ))}</tbody>
          </table>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OnboardingStatusCards showPendingOnly={showPendingOnly} />
        <div className="space-y-8">
          <OnboardingStatusChart counts={counts} />
          <OnboardingStatusPie counts={counts} />
          <DealerLocationChart />
          <DealerLocationPie />
        </div>
      </div>
    </div>
  );
}
