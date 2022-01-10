const queries = {
  "cE-store-items-updated": ({ items = [], storeId = "" }) => {
    return { $and: [{ name: { $in: items } }, { storeId }] };
  },
};

export default queries;
