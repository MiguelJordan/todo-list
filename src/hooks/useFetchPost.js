import { useEffect, useState } from "react";

const useFetchPost = (url, resourceName = "", reqData) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
      signal: abortControl.signal,
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setError(null);
        setIsPending(false);
        setData(resData);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });

    return () => abortControl.abort();
  }, [url, data, resourceName]);

  return { data, error, isPending };
};

export default useFetchPost;
