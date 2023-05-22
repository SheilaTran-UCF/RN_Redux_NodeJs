import axiosClient from './axios-client';

export const login = async payload => {
  return await axiosClient.post('/auth/login', payload);
};

export const register = async payload => {
  return await axiosClient.post('/auth/register', payload);
};

export const forgotPassword = async payload => {
  return await axiosClient.post('/auth/forgot-password', payload);
};

export const resetPassword = async payload => {
  return await axiosClient.post('/auth/reset-password', payload);
};
