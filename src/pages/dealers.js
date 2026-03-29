import { useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';

export default function Dealers() {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    async function fetchDealers() {
      const { data } = await supabase.from('Dealers').select('*');
      setDealers(data);
    }
    fetchDealers();
  }, []);

  return (
    <div>
      <h1>Dealerships</h1>
      {dealers.map(dealer => (
        <div key={dealer.id}>
          <h2>{dealer.name}</h2>
          <p>{dealer.address}</p>
          <p>{dealer.phone}</p>
          <a href={dealer.website}>{dealer.website}</a>
        </div>
      ))}
    </div>
  );
}
