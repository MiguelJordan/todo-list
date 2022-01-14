import { useEffect, useState } from "react";

// functions
import { filter } from "../functions/data";

const useSearch = ({ data = [], criteria = "id" }) => {
  const [searchVal, setSearchVal] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let value = searchVal.trim();
    if (!value) return setFiltered(data);

    const _filtered = filter({ data, criteria, value, exact: false });

    setFiltered(_filtered);
  }, [criteria, data, searchVal]);

  return { filtered, setSearchVal };
};

export default useSearch;
