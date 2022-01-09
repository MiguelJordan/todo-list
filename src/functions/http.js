import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getUrl = (url, params) => {
  const reqUrl = new URL(url);
  reqUrl.search = new URLSearchParams(params).toString();
  return reqUrl;
};

export const _delete = async ({ url = "", params = {}, fullUrl = false }) => {
  try {
    if (!fullUrl) url = apiUrl + url;
    const reqUrl = getUrl(url, params);
    return (await axios.delete(reqUrl)).data;
  } catch (err) {
    return { error: err?.response?.data?.error ?? err.message };
  }
};

export const get = async ({ url = "", params = {}, fullUrl = false }) => {
  try {
    if (!fullUrl) url = apiUrl + url;
    const reqUrl = getUrl(url, params);
    return (await axios.get(reqUrl)).data;
  } catch (err) {
    return { error: err?.response?.data?.error ?? err.message };
  }
};

export const post = async ({ url = "", body = {}, fullUrl = false }) => {
  try {
    if (!fullUrl) url = apiUrl + url;
    return await (
      await axios.post(url, body)
    ).data;
  } catch (err) {
    return { error: err?.response?.data?.error ?? err.message };
  }
};

export const postFormData = async (url = "", values = {}, fullUrl = false) => {
  const formData = new FormData();

  for (let prop in values) {
    let value = Array.isArray(values[prop])
      ? JSON.stringify(values[prop])
      : values[prop];

    formData.append(prop, value);
  }

  try {
    return await (
      await fetch(url, {
        method: "POST",
        body: formData,
      })
    ).json();
  } catch (err) {
    return { error: err?.response?.data?.error ?? err.message };
  }
};
