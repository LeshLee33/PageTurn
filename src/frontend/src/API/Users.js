import { api } from './instance';

export const getUsers = async () => {
    try {
      const res = await api.get(`/users`);
      return res.data;
    } catch (error) {
      console.error('Ошибка при выполнении GET запроса:', error);
    }
};

export const check_token = async (token) => {
  try {
    const res = await api.get(`/users/check_token?token=${token}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const register = async (nickname, password) => {
    try {
      const res = await api.post(`/sign_up?nickname=${nickname}&password=${password}`);
      return res.data;
    } catch (error) {
      console.error('Ошибка при выполнении POST запроса:', error);
    }
};

export const loginAPI = async (nickname, password) => {
  try {
    const res = await api.get(`/sign_in?nickname=${nickname}&password=${password}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const logoutAPI = async (token) => {
  try {
    console.log(token)
    const res = await api.get(`/sign_out?token=${token}`);
    console.log(res)
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};