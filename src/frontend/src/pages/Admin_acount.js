import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Acount.css'
import { useAuth } from '../components/AufContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BookList from '../components/BookList';

function Admin_acount() {
    const navigate = useNavigate();
    const { nickname, logout } = useAuth();
  
    return (
      <div className='Acount-container'>
        <NavigationBar />
        <div className='Acount-block'>
            <div className='change-password-title'>
                <h1>Имя пользователя: {nickname} </h1>
                <button className='logout_button' onClick={logout}>Выход</button>
            </div>
        
          <h2>Смена пароля</h2>
          <form>
            <div class="form-group">
                <label>Старый пароль:</label>
                <br />
                <input className='input-change-password' type="password"/>
            </div>
            <div class="form-group">
                <label>Новый пароль:</label>
                <br />
                <input className='input-change-password' type="password" autocomplete="off" />
            </div>
            <div class="form-group">
                <label>Повтор нового пароля:</label>
                <br />
                <input className='input-change-password' type="password" autocomplete="off" />
            </div>
            <button type="submit">Сменить пароль</button>
        </form>
        
        <h2>список записей
        </h2>
        <BookList filterType="admin" />

        </div>
        
      </div>
    );
  }

export default Admin_acount;