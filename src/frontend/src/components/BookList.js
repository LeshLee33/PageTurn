import React from 'react';
import {Link} from 'react-router-dom';

const books = [
    {
        id: 1,
        name: "1984",
        author: "George Orwell",
        tags: ["dystopian", "politics", "science fiction"],
        creationDate: "1949-06-08",
        likes: 2500,
        dislikes: 300,
        content: "1984 is a dystopian novel set in a totalitarian society ruled by Big Brother."
    },
    {
        id: 2,
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        tags: ["classic", "racism", "justice"],
        creationDate: "2024-07-11",
        likes: 3000,
        dislikes: 150,
        content: "A novel about the serious issues of rape and racial inequality, told through the eyes of young Scout Finch."
    },
    {
        id: 3,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        tags: ["classic", "American dream", "romance"],
        creationDate: "1925-04-10",
        likes: 2800,
        dislikes: 180,
        content: "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
    }
]
const BookBlock = ({ book }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '0 5px 15px 10px',
            margin: '0 10px 15px 10px',
            backgroundColor: '#2C3E50',
            display: 'flex',
            flexDirection: 'column',
            color: '#F5F5F5',
        }}>
            <Link to={`/postpage/${book.id}`} style={{
                textDecoration: 'none', 
                color: '#F5F5F5' 
            }}>
                <h2>{book.name}</h2> 
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{book.author}</span>
                <div>
                    {book.tags.map((tag, index) => (
                        <span key={index} style={{
                            marginRight: '5px',
                            backgroundColor: '#F5F5F5',
                            color: '#2C3E50',
                            borderRadius: '5px',
                            padding: '3px'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const BookList = ({ filterType }) => {
    let filteredBooks;

    if (filterType === 'likes') {
        filteredBooks = [...books].sort((a, b) => b.likes - a.likes).slice(0, 5);
    } else if (filterType === 'last') {
        filteredBooks = [...books].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).slice(0, 10);
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