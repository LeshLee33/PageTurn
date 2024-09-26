import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Bookmarks.css'

function Bookmarks() {

    return (
        <div className='Bookmarks-container'>
            <NavigationBar />
       </div>
    );
}

export default Bookmarks;