const capitalise = (value) => {
  if (typeof value != "string") return value;

  value = value.trim();
  if (value == "") return value;

  return value[0].toUpperCase() + value.slice(1).toLowerCase();
};

export default capitalise;
