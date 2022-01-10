const apiUrl = process.env.REACT_APP_API_URL;
const nodeEnv = process.env.NODE_ENV;

const toCapital = (word = "") => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalise = (value) => {
  if (typeof value != "string") return value;

  value = value.trim();
  if (value == "") return value;

  let _capitalised = "";

  value.split(" ").forEach((word, index) => {
    if (index != 0) _capitalised += " ";
    _capitalised += toCapital(word);
  });

  return _capitalised;
};

export const filter = ({
  data = [],
  criteria = "",
  value = "",
  exclude = false,
}) => {
  return data.filter((dt) =>
    exclude ? dt?.[criteria] !== value : dt?.[criteria] === value
  );
};

export const getImage = ({ url = "", fullUrl = false }) => {
  // this is in case the resource
  // is independent of NODE_ENV
  if (fullUrl) return url;
  return nodeEnv === "production" ? url : apiUrl + url;
};

export const getList = ({ data = [], criteria }) => {
  return [...new Set(data.map((dt) => dt[criteria]))];
};

export const groupData = ({ data = [], criteria = "" }) => {
  if (!data) return [];
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

export const getUnique = ({ data = [], key = "id" }) => {
  const obj = {};

  data.forEach((dt) => (obj[dt[key]] = dt));

  return Object.values(obj);
};
