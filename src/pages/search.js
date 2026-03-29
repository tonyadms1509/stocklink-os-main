import { useState } from 'react';
import supabase from '../utils/supabaseClient';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch() {
    const { data: vehicles } = await supabase
      .from('Vehicles')
      .select('*')
      .ilike('model', `%${query}%`);

    const { data: spares } = await supabase
      .from('SpareParts')
      .select('*')
      .ilike('description', `%${query}%`);

    setResults([...vehicles, ...spares]);
  }

  return (
    <div>
      <h1>Search Vehicles & Parts</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.map(item => (
        <div key={item.id}>
          <h2>{item.make || item.description}</h2>
          <p>{item.model || item.partNumber}</p>
        </div>
      ))}
    </div>
  );
}
