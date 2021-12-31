export const get = async (url, params = {}) => {
  try {
    const reqUrl = new URL(url);

    reqUrl.search = new URLSearchParams(params).toString();
    return await (await fetch(reqUrl)).json();
  } catch (err) {
    return { error: err.message };
  }
};

export const post = async (url, body = {}) => {
  try {
    return await (
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
  } catch (err) {
    return { error: err.message };
  }
};

export const postFormData = async (url, values = {}) => {
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
    return { error: err.message };
  }
};
