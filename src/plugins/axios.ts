import axios, {AxiosInstance} from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
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
      // message.error(response.message || '请求失败');
      return Promise.reject(new Error(response.data.message || '请求失败'));
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
 * 文件下载
 * @param url
 * @param body
 * @example  download(`/code/generateSQLDocument`,values,'test.xlsx');
 */
export const download = async (url: string, body?: {},filename?: string) => {
  try {
    const res = await instance.post(url, body, {responseType: 'blob'});
    // console.log('res', res)
    // json格式返回说明后端提示报错
    if (res.data.type === 'application/json') {
      return Promise.reject('文件下载失败');
    }
    const blob = new Blob([res.data]);
    let fileName = 'downloaded_file'; // 默认值
    if (filename) {
      fileName = filename; // 优先使用传入的
    } else {
      // 尝试从 content-disposition 获取
      const disposition = res.headers['content-disposition'];
      if (disposition) {
        const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)/i;
        const asciiFilenameRegex = /filename="?([^"]+)"?/i;

        const utf8Matches = disposition.match(utf8FilenameRegex);
        if (utf8Matches && utf8Matches[1]) {
          fileName = decodeURIComponent(utf8Matches[1]);
        } else {
          const asciiMatches = disposition.match(asciiFilenameRegex);
          if (asciiMatches && asciiMatches[1]) {
            fileName = asciiMatches[1];
          }
        }
      }
    }
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err: any) {
    console.error('下载失败', err)
    return Promise.reject(err);
  }
};

export default instance; 