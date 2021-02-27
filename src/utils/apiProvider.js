import axios from "axios";
export default {
  getWorlds: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/world`, {
      params: params,
    });
    return request;
  },
  getTowers: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/tower`, {
      params: params,
    });
    return request;
  },
  getLevels: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/level`, {
      params: params,
    });
    return request;
  },
  // get data of all questions
  getQuestions: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/question`, {
      params: params,
    });
    return request;
  },
  getAnswers: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/answer`, {
      params: params,
    });
    return request;
  },
  updateAnswer: (data) => {
    const request = axios.put(`${process.env.REACT_APP_API}/answer`, data)
    return request
  }
};
