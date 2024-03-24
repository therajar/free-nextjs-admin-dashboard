import { useState, useEffect } from 'react';

const useApiData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Abort ongoing fetch if component unmounts before fetch completes
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useApiData;
