const useStorage = () => {
  const get = (key) => {
    let value = "";
    try {
      value = JSON.parse(localStorage.getItem(key));
    } catch (err) {
      localStorage.removeItem(key);
    }
    return value;
  };

  const set = (key, value) => {
    try {
      key = key ?? String(key).toLowerCase();

      if (!key) {
        throw new Error(`could not assign ${value} to ${key}`);
      }
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // localStorage.setItem(key, "");
    }
  };

  const remove = (key) => localStorage.removeItem(key);

  return { get, remove, set };
};

export default useStorage;
