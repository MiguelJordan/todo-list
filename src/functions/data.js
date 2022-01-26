const apiUrl = process.env.REACT_APP_API_URL;
const nodeEnv = process.env.NODE_ENV;

const toCapital = (word = "") => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const AddImage = async (e, setError, setImage, setImageUrl) => {
  if (!e) return "";
  setError("");
  let file = e.target.files[0];

  const typeInfo = file.type.split("/"); // [mimeType ,extension]

  // validate type & extension
  if (
    typeInfo[0] !== "image" ||
    !["jpg", "png", "jpeg"].includes(typeInfo[1])
  ) {
    return setError("Invalid image - format");
  }

  // validate file size
  if (file.size > 5 * 1024 * 1024) {
    return setError("Invalid image - size too large");
  }

  let base64 = await toBase64(file);

  setImage(base64);
  setImageUrl(file);
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

export const getBool = (value) => {
  return ["true", "yes"].includes(value.toLowerCase()) ? true : false;
};

export const getImage = ({ url = "", fullUrl = false }) => {
  // this is in case the resource
  // is independent of NODE_ENV
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
  startTime = new Date(),
  stopTime,
  distance = 1,
  useDistance = false,
}) => {
  let otherTime;

  if (!startTime && useDistance) {
    otherTime = new Date(getDateString(stopTime));
    startTime = new Date(otherTime.getTime() - distance * 24 * 60 * 60 * 1000);
  }

  if (!stopTime && useDistance) {
    otherTime = new Date(getDateString(startTime));
    stopTime = new Date(otherTime.getTime() + distance * 24 * 60 * 60 * 1000);
  }

  return {
    startTime: new Date(getDateString(startTime)),
    stopTime: new Date(getDateString(stopTime)),
  };
};

export const removeAt = ({ index = 0, list = [] }) => {
  const newList = [...list];
  newList.splice(index, 1);
  return newList;
};

export const RemoveImage = (setImage, setImageUrl) => {
  setImage(null);
  setImageUrl(null);
};

export const toBase64 = async (file) => {
  return new Promise((reslove, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => reslove(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
export const validateItem = (item, imageUrl) => {
  item.name = item.name?.trim();
  if (!item.name) return { valid: false, message: "Invalid item name" };

  item.family = item.family?.trim();
  if (!item.family) return { valid: false, message: "Invalid family" };

  item.category = item.category?.trim();
  if (!item.category) return { valid: false, message: "Invalid category" };

  item.measureUnit = item.measureUnit?.trim();
  if (!item.measureUnit) {
    return { valid: false, message: "Invalid measure unit" };
  }

  item.measureUnitPlural = item.measureUnitPlural?.trim();
  if (!item.measureUnitPlural) {
    return { valid: false, message: "Invalid measure unit" };
  }

  if (isNaN(item.quantity) || item.quantity < 0) {
    return { valid: false, message: "Invalid quantity" };
  }
  item.quantity = Number(item.quantity);

  if (isNaN(item.cost) || item.cost < 0) {
    return { valid: false, message: "Invalid cost price" };
  }
  item.cost = Number(item.cost);

  if (isNaN(item.commission) || item.commission < 0) {
    return { valid: false, message: "Invalid commission" };
  }
  item.commission = Number(item.commission);

  if (isNaN(item.commissionRatio) || item.commissionRatio < 1) {
    return { valid: false, message: "Invalid commission ratio" };
  }
  item.commissionRatio = Number(item.commissionRatio);

  if (imageUrl) {
    item.imageUrl = imageUrl;
  } else {
    delete item?.imageUrl;
  }

  return { valid: true, validated: item };
};
