import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Dummy fetch implementation
  useEffect(() => {
    setLoading(false);
  }, [url]);
  
  return { data, loading };
}