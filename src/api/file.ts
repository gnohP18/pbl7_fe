import axios from "axios";
import { API_URL } from "~/constants/config";

export const getDataCrawlAPI = (): Promise<any> => {
  return axios
    .get(`${API_URL}/files?type=crawl_data`)
    .then((result) => {
      return result.data
    });
};