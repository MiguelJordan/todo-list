import { useEffect, useState } from "react";

const useFetchGet = (url, resourceName = "") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    fetch(url, { signal: abortControl.signal })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setError(null);
        setIsPending(false);
        setData(data);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });

    return () => abortControl.abort();
  }, [url, resourceName]);

  return { data, error, isPending };
};

export default useFetchGet;
