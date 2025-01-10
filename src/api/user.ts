import request from '../plugins/axios';

export interface LoginParams {
  userAccount: string;
  userPassword: string;
}

export interface UserResponse {
  id: number;
  userName: string;
  userAccount: string;
  avatarUrl: string;
  gender: number;
  userRole: string;
  createTime: string;
  updateTime: string;
}

export const login = (data: LoginParams) => {
  return request.post<any, UserResponse>('/user/login', data);
};

export const getCurrentUser = () => {
  return request.get<any, UserResponse>('/user/current');
};

export const logout = () => {
  return request.post<any, null>('/user/logout');
}; 