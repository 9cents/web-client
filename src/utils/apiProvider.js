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
  getPlayers: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/player`, {
      params: params,
    });
    return request;
  },
  getResponseData: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/responsedata`, {
      params: params,
    });
    return request;
  },
  getProgressData: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/progressreport`, {
      params: params,
    });
    return request;
  },
  getAccuracyData: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/accuracy`, {
      params: params,
    });
    return request;
  },
  getInstructors: (params) => {
    const request = axios.get(`${process.env.REACT_APP_API}/instructor`, {
      params: params,
    });
    return request;
  },
  updateAnswer: (data) => {
    const request = axios.put(`${process.env.REACT_APP_API}/answer`, data);
    return request;
  },
  updateQuestion: (data) => {
    const request = axios.put(`${process.env.REACT_APP_API}/question`, data);
    return request;
  },
  updateInstructor: (data) => {
    const request = axios.put(`${process.env.REACT_APP_API}/instructor`, data);
    return request;
  },
  getCountPlayers: (data) => {
    return axios.get(`${process.env.REACT_APP_API}/countplayers`, data);
  },
  getCountTowers: (data) => {
    return axios.get(`${process.env.REACT_APP_API}/counttowers`, data);
  },
  getCountLevels: (data) => {
    return axios.get(`${process.env.REACT_APP_API}/countlevels`, data);
  },
  getCountQuestions: (data) => {
    return axios.get(`${process.env.REACT_APP_API}/countQuestions`, data);
  },
  getCountResponses: (data) => {
    return axios.get(`${process.env.REACT_APP_API}/countresponses`, data);
  },
  getQuestionAccuracy: (data) => {
    return axios.get(`${process.env.REACT_APP_API}/questionaccuracy`, data);
  },
};
