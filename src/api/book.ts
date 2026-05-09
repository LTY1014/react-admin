import request from '../plugins/axios';
import type { ApiResponse } from '../plugins/axios';

const BASE_URL = '/book'

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

export const getListBookByPage = (data: QueryParams) => {
  return request.post<any, ApiResponse<BookResponse>>(`${BASE_URL}/list/page`, data);
};

export const getByBookId = (params) => {
  return request.post<any, ApiResponse<BookResponse>>(`${BASE_URL}/get`, params);
}

export const addBook = (data: QueryParams) => {
  return request.post<any, ApiResponse<BookResponse>>(`${BASE_URL}/add`, data);
};
export const updateBook = (data: QueryParams) => {
  return request.post<any, ApiResponse<BookResponse>>(`${BASE_URL}/update`, data);
};

export const deleteBook = (data) => {
  return request.post<any, ApiResponse<void>>(`${BASE_URL}/delete`, data);
};


