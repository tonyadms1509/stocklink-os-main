import React from 'react'

export default function Dashboard() {
  return (
    <div className="bg-carbon min-h-screen flex items-center justify-center">
      <div className="holographic-glass max-w-lg w-full p-8 rounded-lg border-glow-red text-center">
        <h2 className="text-3xl font-bold text-glow-red mb-4">Welcome to Stocklink Ferrari</h2>
        <p className="text-white">You’re now authenticated and inside the dashboard 🚀</p>
      </div>
    </div>
  )
}
