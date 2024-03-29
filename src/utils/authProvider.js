import axios from "axios";
export default {
  // called when the user attempts to login
  login: (username, password) => {
    const request = axios.post(`${process.env.REACT_APP_API}/loginweb`, {
      name: username,
      password: password,
    });
    request.then(({ data }) => {
      sessionStorage.setItem("token", data.jwt);
    });
    return request;
  },
  // called when the user attempts to logout
  logout: () => {
    sessionStorage.removeItem("token");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: (error) => {
    if (error === 401 || error === 403) {
      sessionStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for auth
  checkAuth: () => {
    const token = sessionStorage.getItem("token");
    return token;
  },
};
