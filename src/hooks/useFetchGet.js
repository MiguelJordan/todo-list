import { useEffect, useState } from "react";

const useFetchGet = ({
  url,
  resourceName = "",
  params = {},
  _default = null,
}) => {
  const [resource, setResource] = useState(_default);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();
    const reqUrl = new URL(url);

    reqUrl.search = new URLSearchParams(params).toString();

    fetch(reqUrl, { signal: abortControl.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error(
            `Could not fetch ${resourceName ? resourceName : "the resource"}`
          );
        }
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
