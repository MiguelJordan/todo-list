import { useEffect, useState } from "react";

const useFetchPost = (url, resourceName = "", data) => {
  const [resource, setResource] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: abortControl.signal,
    })
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
  }, [url, data, resourceName]);

  return { resource, error, isPending };
};

export default useFetchPost;
