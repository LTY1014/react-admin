import request from '../plugins/axios';
import type { ApiResponse } from '../plugins/axios';

export interface QueryParams {
  current: number;
  pageSize: number;
  bookName?: string;
  author?: string;
}

export interface BookResponse {
  current: number;
  total: number;
  records: BookVO[];
}

export interface BookVO {
  id: number;
  bookName: string;
  author: string;
  createTime: Date,
  updateTime: Date,
}

export const getListBookByPage = (params: QueryParams) => {
  return request.get<any, ApiResponse<BookResponse>>('/book/list/page', { params });
};

export const getByBookId = (params) => {
  return request.get<any, ApiResponse<BookResponse>>(`/book/get`, params);
}

export const addBook = (data: QueryParams) => {
  return request.post<any, ApiResponse<BookResponse>>(`/book/add`, data);
};
export const updateBook = (data: QueryParams) => {
  return request.post<any, ApiResponse<BookResponse>>(`/book/update`, data);
};

export const deleteBook = (data) => {
  return request.post<any, ApiResponse<void>>(`/book/delete`, data);
};


