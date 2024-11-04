import { api } from './instance';
import axios from 'axios';

export const addBook = async (token, title, nickname, release_date, description, tags, upload_file) => {
  try {
      const formattedReleaseDate = release_date.split('.').reverse().join('-');

      const params = new URLSearchParams();
      params.append('token', token);
      params.append('title', title);
      params.append('nickname', nickname);
      params.append('release_date', formattedReleaseDate);
      params.append('description', description);
      
      tags.forEach(tag => {
          params.append('tags', tag);
      });

      const formData = new FormData();
      if (upload_file instanceof File) {
          formData.append('upload_file', upload_file); 
      } else {
          throw new Error('Invalid file object');
      }

      const res = await api.post(`/books/upload/?${params.toString()}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      return res.data; 
  } catch (error) {
      console.error('Error adding book:', error);
      throw error;
  }
};


export const getBook = async (id) => {
  try {
    const res = await api.get(`/books/${id}/?book_id=${id}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};


export const getDoc = async (book_id) => {
  try {
    const res = await api.get(`/books/get_doc?book_id=${book_id}`, {
      responseType: 'blob', 
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement('a');
    link.href = url;
    link.download = `document_${book_id}.docx`; 

    link.click();

    window.URL.revokeObjectURL(url);

    return res.data; 
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};


export const changeBook = async () => {
  try {

  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const delBook = async () => {
  try {

  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};
