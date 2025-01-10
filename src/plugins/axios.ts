import axios, {AxiosInstance} from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8088/api', // 设置基础URL
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error('请求发送失败');
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    
    // 修改判断条件以匹配后端返回的 code
    if (res.code === 0) {
      return res.data;
    } else {
      message.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error('未登录或登录已过期');
          // 可以在这里处理登录过期的逻辑
          break;
        case 403:
          message.error('没有权限访问');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error('网络错误');
      }
    } else {
      message.error('网络连接失败');
    }
    return Promise.reject(error);
  }
);

// 文件下载请求
export const fileRequest = (url: string) => {
  return instance({
    method: 'GET',
    url: `${url}`,
    responseType: 'blob',
  });
};

// 下载文件函数
export const downloadFile = (data: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default instance; 