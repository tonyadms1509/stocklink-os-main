import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ContractorDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("Projects")   // <-- Supabase table name
        .select("*");       // <-- fetch all columns

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h1>Contractor Dashboard</h1>
      <h2>My Projects</h2>
      <ul>
        {projects.length > 0 ? (
          projects.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong> — {p.status}
            </li>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </ul>
    </div>
  );
}
