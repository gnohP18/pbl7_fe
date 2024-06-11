import axios from "axios";
import { API_URL } from "~/constants/config";

export const trackingAPI = () : Promise<any> => {
    return axios
      .get(`${API_URL}/tracking`)
      .then((result) => {
        return result.data
      });
  };

export const crawlAPI = (taskKey: string) : Promise<any> => {
  return axios
    .get(`${API_URL}/crawl/${taskKey}`)
    .then((result) => {
      return result.data
    });
};

export const crawlAllAPI = () : Promise<any> => {
  return axios
    .get(`${API_URL}/crawl/start-all-tasks`)
    .then((result) => {
      return result.data
    });
};

export const getResultCrawlAPI = () : Promise<any> => {
  return axios
    .get(`${API_URL}/crawl/crawl-result`)
    .then((result) => {
      return result.data
    });
};


export const startPreprocessAPI = () : Promise<any> => {
  return axios
    .get(`${API_URL}/preprocess/start`)
    .then((result) => {
      return result.data
    });
};