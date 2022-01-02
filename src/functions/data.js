export const capitalise = (value) => {
  if (typeof value != "string") return value;

  value = value.trim();
  if (value == "") return value;

  return value[0].toUpperCase() + value.slice(1).toLowerCase();
};

export const filter = ({ data = [], criteria = "", value = "" }) => {
  return data.filter((dt) => dt?.[criteria] == value);
};

export const getList = ({ data = [], criteria }) => {
  return [...new Set(data.map((dt) => dt[criteria]))];
};

export const groupData = ({ data = [], criteria = "" }) => {
  return data.reduce((prev, next) => {
    const _criteria = next[criteria];
    if (prev[_criteria]) {
      prev[_criteria].push(next);
    } else {
      prev[_criteria] = [next];
    }
    return prev;
  }, {});
};

export const getUnique = (data = [], key = "id") => {
  const obj = {};

  data.forEach((dt) => (obj[dt[key]] = dt));

  return Object.values(obj);
};
