/**
 * 分页信息
 */
interface PageInfo<T> {
    current: number;
    size: number;
    total: number;
    records: T[];
}

/**
 * 分页请求
 */
interface PageRequest {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: 'ascend' | 'descend';
}

/**
 * 删除请求
 */
interface DeleteRequest {
    id: number | string;
    ids?: (number | string)[];
}

/**
 * 返回封装
 */
interface BaseResponse<T> {
    code: number;
    data: T;
    message?: string;
}