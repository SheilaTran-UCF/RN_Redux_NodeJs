import axiosClient from './axios-client';

export const createWork = async payload => {
  return await axiosClient.post('/work/create', payload);
};

export const getWorks = async () => {
  return await axiosClient.get('/work/list');
};

export const deleteWork = async payload => {
  //${payload} truyen bien payload vao chuoi, variable into string
  return await axiosClient.delete(`/work/delete/${payload}`);
};

export const updateWork = async payload => {
  return await axiosClient.patch('/work/update', payload);
};
