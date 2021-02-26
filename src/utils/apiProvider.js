import axios from "axios";
export default {
  // get data of all questions
  getAllQuestions: () => {
    const request = axios.get(`${process.env.REACT_APP_API}/question`);
    return request;
  },
};
