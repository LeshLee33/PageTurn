import { api } from './instance';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
          const uniqueFileName = `${uuidv4()}-${upload_file.name}`;
          formData.append('upload_file', new File([upload_file], uniqueFileName, { type: upload_file.type })); 
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

export const changeBook = async (token, book_id, title, description, tags) => {
  try {
    const params = new URLSearchParams();
      params.append('token', token);
      params.append('book_id', book_id);
      params.append('title', title);
      params.append('description', description);

      tags.forEach(tag => {
        params.append('tags', tag);
      });

    const res = await api.patch(`/books/edit?${params.toString()}`)
      return(res.data)
  } catch (error) {
    console.error('Ошибка при выполнении DELETE запроса:', error);
  }
};

export const getBookInfo = async (book_id) => {
  try {
    const res = await api.get(`/books/get_info?book_id=${book_id}`);
    console.log(res)
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

export const getDoc_for_use = async (book_id) => {
  try {
    const res = await api.get(`/books/get_doc?book_id=${book_id}`, {
      responseType: 'blob', 
    });
    // Возвращаем данные файла
    return res.data; 
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
    throw error; // Бросаем ошибку дальше, если нужно обработать её в вызывающем коде
  }
};


export const booksGetByAuthor= async (author) => {
  try {
      const res = await api.get(`/books/get_by_author?author=${author}`)
      return(res.data)

  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const delBook = async (token,book_id) => {
  try {
    const res = await api.delete(`/books/delete?token=${token}&book_id=${book_id}`)
      return(res.data)
  } catch (error) {
    console.error('Ошибка при выполнении DELETE запроса:', error);
  }
};



