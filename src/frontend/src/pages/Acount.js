import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Acount.css'
import { useAuth } from '../components/AufContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Acount() {
    const navigate = useNavigate();
    const {nickname} = useAuth();
    console.log(nickname)

    useEffect(() => {
        if (nickname === '') {
            navigate("/authorization");
            console.log('+');
        }
    }, [nickname, navigate]);

    return (
        <div className='Acount-container'>
            <NavigationBar />
            <div className='Acount-block'>

            </div>
       </div>
    );
}

export default Acount;