import React from 'react';
import BookList from '../components/BookList';
import NavigationBar from '../components/NavigationBar';

import '../styles/Home.css'; // Импортируем файл стилей
import logo from '../image/logo.svg'; // Импортируем изображение
import bookmarks from '../image/bookmarks.svg';
import create_an_entry from '../image/create_an_entry.svg';
import account from '../image/account.svg';
import search from '../image/search.svg';

function Home() {

    return (
    <div className="home-container">
        
      <NavigationBar />

      <div className="bookList">

        <div class="popular-works">Наиболее популярные произведения</div>
        <BookList filterType="likes" />

        <div class="last-works">Последнии добавленные произведения</div>
        <BookList filterType="last" />

        <div class="last-works">Все</div>
        <BookList filterType="all" />

      </div>

    </div>
  );
}

export default Home;