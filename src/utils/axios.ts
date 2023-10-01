import type { UnknownObj } from "@/types/types";
import axios from "axios";

const baseApiUrl = process.env.REACT_APP_API_BASE_URL;
// 리소스 접근 허용
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// 서로 다른 도메인간 쿠키 전달 허용
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, PUT, DELETE, OPTIONS";

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
let token = localStorage.getItem("token")?localStorage.getItem("token"):sessionStorage.getItem("token")
// console.log(token,"토큰")  
let Authorization = 'Bearer '+ token
axios.defaults.headers.common["Authorization"] = Authorization
const instance = axios.create({
  baseURL: baseApiUrl
});
instance.interceptors.request.use(
  function (config) {
    
  let token = localStorage.getItem("token")?localStorage.getItem("token"):sessionStorage.getItem("token")
  console.log(token,"토큰")  
  if(config.headers.Authorization && (config.headers.Authorization as string).split(" ")[1]==="null"){
    let Authorization = 'Bearer '+ token
    config.headers["Authorization"] = Authorization
  }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  async function (config) {
    return config.data;
  },
  function (error) {
    return error.response.data;
  }
);
const api = {
  get: async ({ url, query }: any) => {
    console.log(process.env, "process.env");
    const method = "get";
    const params = query;
    const response = await instance({
      baseURL: baseApiUrl,
      url,
      method,
      params
    });
    return response;
  },
  post: ({
    url,
    query
  }: {
    url: string;
    query: any[] | UnknownObj | undefined;
  }) => {
    const params = query;
    return instance.post(url, params);
  },
  delete: ({
    url,
    query
  }: {
    url: string;
    query: any[] | UnknownObj | undefined;
  }) => {
    const params = query;
    return instance.delete(url, {
      data: params
    });
  },
  put: ({
    url,
    query
  }: {
    url: string;
    query: any[] | UnknownObj | undefined;
  }) => {
    const params = query;
    return instance.put(url, params);
  }
};
export default api;
