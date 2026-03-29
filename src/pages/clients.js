import { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', workshop: '' });

  useEffect(() => {
    async function fetchClients() {
      const { data } = await supabase.from('Clients').select('*');
      setClients(data);
    }
    fetchClients();
  }, []);

  async function registerClient() {
    const { data, error } = await supabase.from('Clients').insert([form]);
    if (!error) {
      setClients([...clients, ...data]);
      setForm({ name: '', email: '', phone: '', workshop: '' });
    }
  }

  return (
    <div>
      <h1>Clients & Mechanics</h1>
      <h2>Register</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Workshop" value={form.workshop} onChange={e => setForm({ ...form, workshop: e.target.value })} />
      <button onClick={registerClient}>Register</button>

      <h2>Registered Clients</h2>
      {clients.map(client => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <p>{client.email}</p>
          <p>{client.phone}</p>
          <p>{client.workshop}</p>
        </div>
      ))}
    </div>
  );
}
