import request from '../plugins/axios';
import type { ApiResponse } from '../plugins/axios';

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

// 登录
export const login = (data: LoginParams) => {
  return request.post<any, ApiResponse<UserResponse>>('/user/login', data);
};

// 获取当前用户信息
export const getCurrentUser = () => {
  return request.get<any, ApiResponse<UserResponse>>('/user/current');
};

// 退出登录
export const logout = () => {
  return request.post<any, ApiResponse<null>>('/user/logout');
};

export const getListUserByPage = (params) => {
  return request.get<any, ApiResponse<UserResponse>>('/user/list/page', { params });
};

// 更新用户信息
export interface UpdateUserParams {
  userName?: string;
  avatarUrl?: string;
  gender?: number;
}

export const updateUser = (data: UpdateUserParams) => {
  return request.put<any, ApiResponse<UserResponse>>('/user/update', data);
};

// 修改密码
export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = (data: ChangePasswordParams) => {
  return request.post<any, ApiResponse<null>>('/user/password/change', data);
};

// 重置密码（管理员功能）
export const resetUserPassword = (userId: number) => {
  return request.post<any, ApiResponse<null>>(`/user/resetPassword/${userId}`);
};

export const updatePassword = (data) => {
  return request.post<any, ApiResponse<UserResponse>>('/user/updatePassword', data);
};

export const addUser = (data) => {
  return request.post<any, ApiResponse<UserResponse>>('/user/add', data);
};

export const deleteUser = (data) => {
  return request.post<any, ApiResponse<null>>('/user/delete', data);
};

