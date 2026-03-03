import React, { useState } from 'react'
import { supabase } from './supabaseClient.js'
import { useNavigate } from 'react-router-dom'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState('')
  const navigate = useNavigate()

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setOutput(`❌ Signup error: ${error.message}`)
    } else {
      setOutput(`✅ Signup success`)
      navigate('/dashboard')
    }
  }

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setOutput(`❌ Login error: ${error.message}`)
    } else {
      setOutput(`✅ Login success`)
      navigate('/dashboard')
    }
  }

  return (
    <div className="bg-carbon min-h-screen flex items-center justify-center">
      <div className="holographic-glass max-w-md w-full p-8 rounded-lg border-glow-red">
        <h2 className="text-3xl font-bold text-center mb-6 text-glow-red">Stocklink Ferrari Auth</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        
        <div className="flex justify-between mb-4">
          <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Sign Up</button>
          <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Log In</button>
        </div>
        
        <pre className="bg-black/60 text-green-300 p-4 rounded text-sm whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  )
}
