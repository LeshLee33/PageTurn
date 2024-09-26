import React from 'react';
import '../styles/NovigationBar.css'
import logo from '../image/logo.svg'; // Импортируем изображение
import bookmarks from '../image/bookmarks.svg';
import create_an_entry from '../image/create_an_entry.svg';
import account from '../image/account.svg';
import search from '../image/search.svg';
import { Link } from 'react-router-dom';

const NavigationBar = () => {

    return (
        <div className="banner">
        <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
        </Link>
        
        <div class="search">
            <input 
                type="text" 
                class="search-field"
                className="search-field" // Добавим класс для стилей
            />
            <img src={search} alt="" class="search-icon"></img>
        </div>

        <Link to="/bookmarks"> 
            <img src={bookmarks} alt="bookmarks" className="bookmarks" />
        </Link>
        
        <Link to="/create+an+entry">
            <img src={create_an_entry} alt="create_an_entry" className="create_an_entry" />
        </Link>
        <Link to="/acount">
            <img src={account} alt="account" className="account" />
        </Link>
        

      </div>
    );
};

export default NavigationBar;