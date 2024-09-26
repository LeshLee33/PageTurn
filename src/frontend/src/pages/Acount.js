import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Acount.css'

function Acount() {

    return (
        <div className='Acount-container'>
            <NavigationBar />
       </div>
    );
}

export default Acount;