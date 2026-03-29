import { useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';

export default function Spares() {
  const [spares, setSpares] = useState([]);

  useEffect(() => {
    async function fetchSpares() {
      const { data } = await supabase.from('SpareParts').select('*');
      setSpares(data);
    }
    fetchSpares();
  }, []);

  return (
    <div>
      <h1>Spare Parts Catalog</h1>
      {spares.map(part => (
        <div key={part.id}>
          <h2>{part.description}</h2>
          <p>Part Number: {part.partNumber}</p>
          <p>Stock: {part.stockQty}</p>
        </div>
      ))}
    </div>
  );
}
