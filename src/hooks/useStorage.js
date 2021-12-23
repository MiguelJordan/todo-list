const useStorage = () => {
  const get = (key) => {
    return localStorage.getItem(key);
  };

  const set = (key, value) => {
    key = key ?? String(key).toLowerCase();

    if (!key) {
      throw new Error(`${key} is not an acceptable key`);
    }

    localStorage.setItem(key, value);
  };

  return { get, set };
};

export default useStorage;
