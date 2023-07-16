import type { UnknownObj } from '@/types/types';
import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_API_BASE_URL;
// 리소스 접근 허용
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// 서로 다른 도메인간 쿠키 전달 허용
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Methods'] =
  'GET, POST, PUT, DELETE, OPTIONS';

axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';
const instance = axios.create({
  baseURL: baseApiUrl
});
instance.interceptors.request.use(
  function (config) {
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
    return error;
  }
);
const api = {
  get: async ({ url, query }: any) => {
    console.log(process.env, 'process.env');
    const method = 'get';
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
