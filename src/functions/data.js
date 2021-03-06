const apiUrl = process.env.REACT_APP_API_URL;
const nodeEnv = process.env.NODE_ENV;

const toCapital = (word = "") => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalise = (value) => {
  if (typeof value !== "string") return value;

  value = value.trim();
  if (value === "") return value;

  let _capitalised = "";

  value.split(" ").forEach((word, index) => {
    if (index !== 0) _capitalised += " ";
    _capitalised += toCapital(word);
  });

  return _capitalised;
};

export const filter = ({
  data = [],
  criteria = "",
  value = "",
  exact = true,
  exclude = false,
}) => {
  return data.filter((dt) => {
    let allowed = exact
      ? dt?.[criteria] === value
      : dt?.[criteria]?.toLowerCase().includes(value?.toLowerCase());

    return exclude ? !allowed : allowed;
  });
};

export const findElement = ({ data = [], key = "id", value = "" }) => {
  return data.find((order) => order[key] === value);
};

export const getBool = (value) => {
  return ["true", "yes"].includes(String(value).toLowerCase()) ? true : false;
};

export const getImage = ({ url = "", fullUrl = false }) => {
  // this is in case the resource
  // is independent of NODE_ENV
  if (!url) return null;
  if (fullUrl) return url;
  return nodeEnv === "production" ? url : apiUrl + url;
};

export const getInputWith = (quantity) => {
  let length = String(quantity ?? 0).length * 10;
  return length > 40 ? 40 : length > 1 ? length : 1;
};

export const getList = ({ data = [], criteria }) => {
  return [...new Set(data.map((dt) => dt[criteria]))];
};

export const getMeasureUnit = ({
  quantity,
  measureUnit,
  measureUnitPlural,
}) => {
  if (!quantity || quantity <= 1) {
    return measureUnit
      ? measureUnit
      : measureUnitPlural
      ? measureUnitPlural
      : "";
  }
  return measureUnitPlural ? measureUnitPlural : measureUnit ? measureUnit : "";
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

const getDateString = (value) => new Date(value).toISOString().substring(0, 10);

export const getDate = ({ date }) => {
  date = new Date(getDateString(date));
  date = new Date(date.getTime());

  return new Date(getDateString(date));
};

export const getPeriod = ({
  asDate = true,
  start = new Date(),
  stop,
  distance = 1,
  useDistance = false,
}) => {
  let otherTime;

  if (!start && useDistance) {
    otherTime = new Date(getDateString(stop));
    start = new Date(otherTime.getTime() - distance * 24 * 60 * 60 * 1000);
  }

  if (!stop && useDistance) {
    otherTime = new Date(getDateString(start));
    stop = new Date(otherTime.getTime() + distance * 24 * 60 * 60 * 1000);
  }

  if (asDate) {
    return {
      start: new Date(getDateString(start)),
      stop: new Date(getDateString(stop)),
    };
  }

  stop = new Date(
    new Date(getDateString(stop)).getTime() + 1 * 24 * 60 * 60 * 1000
  );

  return {
    start: new Date(getDateString(start)),
    stop: new Date(getDateString(stop)),
  };
};

export const removeAt = ({ index = 0, list = [] }) => {
  const newList = [...list];
  newList.splice(index, 1);
  return newList;
};

export const toBase64 = async (file) => {
  return new Promise((reslove, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => reslove(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
