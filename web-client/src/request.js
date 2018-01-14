import _ from "lodash";

function makeRequest(req) {
  return fetch(req)
    .then(res => res.json())
    .then(res => res.errors
      ? Promise.reject(_.values(res.errors)[0])
      : res,
    );
}

export default {
  get: (url, csrf) => {
    const request = new Request(url, {
      method: "GET",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {},
    });
    return makeRequest(request);
  },
};