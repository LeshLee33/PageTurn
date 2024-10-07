import { api } from './instance';

export const getUsers = async () => {
    try {
      const res = await api.get(`/users`);
      return res.data;
    } catch (error) {
      console.error('Ошибка при выполнении GET запроса:', error);
    }
};

export const register = async (nickname, password) => {
    try {
      const res = await api.post(`/register?nickname=${nickname}&password=${password}`);
      return res.data;
    } catch (error) {
      console.error('Ошибка при выполнении POST запроса:', error);
    }
};