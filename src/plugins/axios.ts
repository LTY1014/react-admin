import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {message} from 'antd';

const baseURL = process.env.API_URL || '/api';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 60000,
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
    async (response) => {
        // 下载接口发生业务异常时，后端的 JSON/文本错误也会被 Axios 转成 Blob。
        // 将其还原并 reject，避免把错误内容当作文件下载及继续执行成功逻辑。
        if (response.config.responseType === 'blob') {
            const blobError = await parseBlobErrorResponse(response);
            if (blobError) {
                console.error(blobError);
                return Promise.reject(blobError);
            }
            return response;
        }

        const {code} = response.data;
        // 修改判断条件以匹配后端返回的 code
        if (code == 0) {
            return response.data
        } else {
            console.error(response.data);
            return Promise.reject(response.data || '请求失败');
        }
    },
    async (error) => {
        if (error.response) {
            if (error.response.config?.responseType === 'blob') {
                const blobError = await parseBlobErrorResponse(error.response);
                if (blobError) {
                    console.error(blobError);
                    return Promise.reject(blobError);
                }
            }

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

export function downloadFile(response) {
    let fileName = getDownloadFileName(response);
    downloadBlobFile(response.data, fileName);
}

const getDownloadFileName = (response) => {
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
        const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
        const normalMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
        const responseName = utf8Match?.[1] || normalMatch?.[1];

        if (responseName) {
            try {
                return decodeURIComponent(responseName);
            } catch (error) {
                console.warn('响应文件名解码失败:', error);
                return responseName;
            }
        }
    }
    return null;
};

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
    // 释放blob内存，非常重要
    URL.revokeObjectURL(fileUrl);
}

const parseBlobErrorResponse = async (response: AxiosResponse) => {
    const responseData = response.data;
    if (!(responseData instanceof Blob)) {
        return null;
    }

    const contentType = response.headers['content-type'] || responseData.type || '';
    const isTextResponse = /json|text\//i.test(contentType);
    if (!isTextResponse) {
        const contentPreview = await responseData.slice(0, 100).text();
        if (!/^\s*\{/.test(contentPreview)) {
            return null;
        }
    }

    const responseText = await responseData.text();
    if (!responseText) {
        return {code: -1, message: '服务器未返回有效文件'};
    }

    try {
        const parsed = JSON.parse(responseText);
        if (parsed && typeof parsed === 'object' && 'code' in parsed) {
            return parsed;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export default instance;