import request from '../utils/request';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
}

export interface ProductQueryParams {
  page: number;
  pageSize: number;
  name?: string;
  category?: string;
  status?: string;
}

export const getProducts = (params: ProductQueryParams) => {
  return request.get<any, { total: number; list: Product[] }>('/products', { params });
};

export const createProduct = (data: Omit<Product, 'id'>) => {
  return request.post<any, Product>('/products', data);
};

export const updateProduct = (id: number, data: Partial<Product>) => {
  return request.put<any, Product>(`/products/${id}`, data);
};

export const deleteProduct = (id: number) => {
  return request.delete(`/products/${id}`);
}; 