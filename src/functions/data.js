const capitalise = (value) => {
  if (typeof value != "string") return value;

  value = value.trim();
  if (value == "") return value;

  return value[0].toUpperCase() + value.slice(1).toLowerCase();
};

const groupData = ({ data = [], criteria = "", filters = [] }) => {
  if (filters.length) {
    data = data.filter((datum) => {
      let isOk = true;
      for (let filter of filters) {
        if (datum[filter.name] != filter.value) {
          isOk = false;
          break;
        }
      }
      return isOk;
    });
  }

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

module.exports = { capitalise, groupData };
