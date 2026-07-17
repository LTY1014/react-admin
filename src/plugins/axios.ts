import axios, {AxiosInstance} from 'axios';
import { message } from 'antd';

const baseURL = process.env.API_URL || '/api';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
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
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
      // 如果是文件下载，直接返回响应
      if (response.config.responseType === 'blob') {
        return response;
      }

    const {code} = response.data;
    // 修改判断条件以匹配后端返回的 code
    if (code == 0) {
      return response.data
    } else {
      // console.log(response.data)
      return Promise.reject(response.data.message || '请求失败');
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


export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

/**
 * Blob 文件下载通用方法
 * @param {BlobPart[]} blobData 二进制数据，一般 res.data
 * @param {string} [customFileName] 自定义文件名.xlsx (注意：文件名必须带扩展名)
 */
export function downloadBlobFile(blobData, customFileName) {
  const blob = new Blob([blobData]);
  let fileName = 'downloaded.txt';
  // 外部传入自定义文件名
  if (customFileName) {
    fileName = customFileName.trim();
  }
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // 释放blob内存，非常重要！
  URL.revokeObjectURL(fileUrl);
}

export default instance; 