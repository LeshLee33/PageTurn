import React from 'react';
import { useState } from 'react';
import BookList from '../components/BookList';
import NavigationBar from '../components/NavigationBar';

import '../styles/Home.css'; // Импортируем файл стилей

function Home() {
  const [showAllBooks, setShowAllBooks] = useState(false); // Состояние для управления видимостью всех книг
  const handleShowAllClick = () => {
      setShowAllBooks(prevState => !prevState);
    }

    return (
    <div className="home-container">
        
      <NavigationBar />

      <div className="bookList">

        <div class="last-works">Последние добавленные произведения</div>
        <BookList filterType="last" />

        <button onClick={handleShowAllClick} className="show-all-button">
                    {showAllBooks ? "Скрыть все" : "Показать все"}
                </button>
                {showAllBooks && (
                    <>
                        <div className="last-works">Все</div>
                        <BookList filterType="all" />
                    </>)}

      </div>
    </div>
  );
}

export default Home;