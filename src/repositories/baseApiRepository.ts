import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: "https://opendata.resas-portal.go.jp",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    "X-API-KEY": "wJ75OrWHAhz1GDMdSyw4OySh4RjjbKRynbKuCT5R",
  },
});

export default apiClient;
