import React from 'react';
import BookList from '../components/BookList';
import NavigationBar from '../components/NavigationBar';

import '../styles/Home.css'; // Импортируем файл стилей

function Home() {

    return (
    <div className="home-container">
        
      <NavigationBar />

      <div className="bookList">

        <div class="popular-works">Наиболее популярные произведения</div>
        <BookList filterType="likes" />

        <div class="last-works">Последние добавленные произведения</div>
        <BookList filterType="last" />

        <div class="last-works">Все</div>
        <BookList filterType="all" />

      </div>

    </div>
  );
}

export default Home;