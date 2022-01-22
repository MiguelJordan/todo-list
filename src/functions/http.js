import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getHeaders = () => {
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {}

  let token = user?.access_token ?? "";
  return { Authorization: `Bearer ${token}` };
};

const getError = (err) => {
  let errRes = {
    error: err?.response?.data?.error ?? err?.error ?? err?.message,
  };
  if (["jwt expired", "jwt must be provided"].includes(errRes.error)) {
    localStorage.removeItem("user");
    return window.location.reload();
  }
  return errRes;
};

const getUrl = (url, params) => {
  const reqUrl = new URL(url);
  reqUrl.search = new URLSearchParams(params).toString();
  return reqUrl;
};

export const _delete = async ({ url = "", params = {}, fullUrl = false }) => {
  try {
    const headers = getHeaders();
    if (!fullUrl) url = apiUrl + url;
    const reqUrl = getUrl(url, params);
    return (await axios.delete(reqUrl, { headers })).data;
  } catch (err) {
    return getError(err);
  }
};

export const get = async ({ url = "", params = {}, fullUrl = false }) => {
  try {
    const headers = getHeaders();
    if (!fullUrl) url = apiUrl + url;
    const reqUrl = getUrl(url, params);
    return (await axios.get(reqUrl, { headers })).data;
  } catch (err) {
    return getError(err);
  }
};

export const post = async ({ url = "", body = {}, fullUrl = false }) => {
  try {
    const headers = getHeaders();
    if (!fullUrl) url = apiUrl + url;
    return await (
      await axios.post(url, body, { headers })
    ).data;
  } catch (err) {
    return getError(err);
  }
};

export const sendFormData = async ({
  url = "",
  values = {},
  method = "POST",
  fullUrl = false,
}) => {
  const headers = getHeaders();
  if (!fullUrl) url = apiUrl + url;

  const body = new FormData();

  for (let prop in values) {
    let value = Array.isArray(values[prop])
      ? JSON.stringify(values[prop])
      : values[prop];

    body.append(prop, value);
  }

  try {
    return await (
      await fetch(url, {
        method,
        body,
        headers,
      })
    ).json();
  } catch (err) {
    // console.log(err);
    return getError(err);
  }
};
