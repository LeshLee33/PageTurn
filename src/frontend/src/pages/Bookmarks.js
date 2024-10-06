import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Bookmarks.css'
import BookList from '../components/BookList';

function Bookmarks() {

    const [myBookmarks, setMyBookmarks] = useState([1,2,3])

    return (
        <div className='Bookmarks-container'>
            <NavigationBar />
            <div className='page-container'>
                <div class="bookmark-works">Мои закладки</div>
                <BookList filterType={myBookmarks} />
            </div>
       </div>
    );
}

export default Bookmarks;