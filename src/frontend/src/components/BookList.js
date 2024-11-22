import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from './AufContext';
import "../styles/BookList.css"
import { delBook, changeBook, getDoc } from '../API/Books';
import { useNavigate } from 'react-router-dom';
import { booksGetByAuthor } from '../API/Books';


const BookBlock = ({ book, showAuthorAndTags = true, onDelete }) => {
  const { aufToken } = useAuth(); 
  const navigate = useNavigate();

  const delFunc = async (bookID) => {
      const confirmDelete = window.confirm("Вы уверены, что хотите удалить запись?");
      if (confirmDelete) {
          try {
              await delBook(aufToken, bookID);
              onDelete(bookID); // Вызов функции обновления списка после удаления
          } catch (error) {
              alert('Удаление не удалось: ' + error.message);
          }
      }
  };

  const changeFunc = async (bookID) => {
      try {
          navigate(`/create_an_entry/${bookID}`);
      } catch (error) {
          alert('Изменение не удалось: ' + error.message);
      }
  };

  const uploadFunc = async (bookID) => {
      const fileData = await getDoc(bookID);
  };

  return (
      <div className="book-block">
          <Link to={`/postpage/${book.id}`}>
              <h2>{book.title}</h2>
          </Link>
          {showAuthorAndTags ? (
              <div className="author-and-tags">
                  <span className="author">{book.author}</span>
                  <div className="tags">
                      {book.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                      ))}
                  </div>
              </div>
          ) : (
              <div className="buttons">
                  <button type="button" className="upload-button" onClick={() => uploadFunc(book.id)}>Скачать</button>
                  <button type="button" className="edit-button" onClick={() => changeFunc(book.id)}>Редактировать</button>
                  <button type="button" className="delete-button" onClick={() => delFunc(book.id)}>Удалить</button>
              </div>
          )}
      </div>
  );
};

const BookList = ({ filterType }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { nickname } = useAuth(); 

  useEffect(() => {
    const fetchBooks = async () => {
      if (filterType === 'my') {
        try {
          const books = await booksGetByAuthor(nickname);
          setFilteredBooks(books);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
    };
    fetchBooks();
  }, [filterType, nickname]); 

  const handleDelete = (bookID) => {
    setFilteredBooks((prevBooks) => prevBooks.filter(book => book.id !== bookID));
  };

  return (
    <div>
      {filteredBooks.map(book => (
        <BookBlock key={book.id} book={book} showAuthorAndTags={false} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default BookList;