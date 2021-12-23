import { useEffect, useState } from "react";

const useFetchGet = (url, resourceName = "") => {
  const [resource, setResource] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    fetch(url, { signal: abortControl.signal })
      .then((response) => {
        return response.json();
      })
      .then((resource) => {
        setError(null);
        setIsPending(false);
        setResource(resource);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });

    return () => abortControl.abort();
  }, [url, resourceName]);

  return { resource, error, isPending };
};

export default useFetchGet;
