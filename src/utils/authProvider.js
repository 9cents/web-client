import axios from "axios";
export default {
  // called when the user attempts to login
  login: ( username, password ) => {
    const request = axios.get(`${process.env.REACT_APP_API}/admin/login`, {
      params: { name: username, password: password },
    });
    request
      .then(({ data }) => {
        localStorage.setItem("token", data.jwt);
      });
    return request;
  },
  // called when the user attempts to logout
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: (error) => {
    if (error === 401 || error === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for auth
  checkAuth: () => {
    const token = localStorage.getItem("token");
    // TODO: check with backend if token valid
    return token;
  },
};
