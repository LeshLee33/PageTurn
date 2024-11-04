import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from './AufContext';
import "../styles/BookList.css"
import { delBook, changeBook, getDoc } from '../API/Books';
import { useNavigate } from 'react-router-dom';

const books = [
    {
        id: 23,
        name: "1984",
        author: "e",
        tags: ["dystopian", "politics", "science fiction","dystopian", "politics", "science fiction","dystopian", "politics", "science fiction","dystopian", "politics", "science fiction","dystopian", "politics", "science fiction"],
        creationDate: "1949-06-08",
        content: "1984 is a dystopian novel set in a totalitarian society ruled by Big Brother."
    },
    {
        id: 2,
        name: "To Kill a Mockingbird",
        author: "user1",
        tags: ["classic", "racism", "justice"],
        creationDate: "2024-07-11",
        content: "A novel about the serious issues of rape and racial inequality, told through the eyes of young Scout Finch."
    },
    {
        id: 3,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        tags: ["classic", "American dream", "romance"],
        creationDate: "1925-04-10",
        content: "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
    }
]



const BookBlock = ({ book, showAuthorAndTags = true }) => {
    const navigate = useNavigate();

    const delFunc = async (bookID) => {
      const confirmDelete = window.confirm("Вы уверены что хотите удалить запись?");
      if (confirmDelete) {
        try {
          const delData = await delBook(bookID);
        } catch (error) {
          alert('Delete failed: ' + error.message);
        }
      }
    };

    const changeFunc = async (bookID) => {
      try {
        navigate(`/create_an_entry/${bookID}`)
      } catch (error) {
          alert('Delete failed: ' + error.message);
      }
    };

    const uploadFunc = async (bookID) => {
      bookID = "67275160f302d9e651cae05c"
      const fileData = await getDoc(bookID);
    };

    return (
      <div className="book-block">
        <Link to={`/postpage/${book.id}`}>
          <h2>{book.name}</h2>
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
                    <button type="button" className="upload-button" onClick={() => uploadFunc(book.id)}>скачать</button>
                    <button type="button" className="edit-button" onClick={() => changeFunc(book.id)}>редактировать</button>
                    <button type="button" className="delete-button" onClick={() => delFunc(book.id)}>удалить</button>
                </div>
        )}
      </div>
    );
  };
  
  const BookList = ({ filterType }) => {
    let filteredBooks;
  
    const { nickname } = useAuth(); 
  
    if (filterType === 'last') {
      filteredBooks = [...books].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).slice(0, 10);
    } else if (filterType === 'my') {
      filteredBooks = [...books].filter(book => book.author.toLowerCase() === nickname.toLowerCase());
      return (
        <div>
          {filteredBooks.map(book => (
            <BookBlock key={book.id} book={book} showAuthorAndTags={false} />
          ))}
        </div>
      );
    } else if (filterType === 'admin') {
      // Возвращаем все записи и заменяем теги на кнопки
      return (
          <div>
              {books.map(book => (
                  <BookBlock key={book.id} book={book} showAuthorAndTags={false} />
              ))}
          </div>
      );
  } else if (Array.isArray(filterType)) {
      filteredBooks = [...books].filter(book => filterType.includes(book.id));
    } else {
      filteredBooks = books;
    }
  
    return (
      <div>
        {filteredBooks.map(book => (
          <BookBlock key={book.id} book={book} />
        ))}
      </div>
    );
  };
  
  export default BookList;