import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "~/constants/config";

export const sendQuestionApi = (question: string): Promise<any> => {
  return axios.get(API_URL + '/').then((result) => {
    console.log(result);
  });
};

export const executeCLI = (command: string): Promise<string> => {
  console.log( {command: command});
  
  return axios.post(API_URL + '/cli/execute', { command: command })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      return "Error command";
    });
};
