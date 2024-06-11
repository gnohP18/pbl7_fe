import axios from "axios";
import { API_URL } from "~/constants/config";

export const predictAPI = (text: string) : Promise<any> => {
    return axios
      .post(`${API_URL}/model/predict`, { text: text })
      .then((result) => {
        return result.data
      });
  };