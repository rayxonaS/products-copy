import { useEffect, useState } from "react";

export function useFetch(url) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setisPending(true);
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error("Something went wrong");
        }
        const data = await req.json();
        setData(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setisPending(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, isPending };
}
