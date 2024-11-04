import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Acount.css'
import { useAuth } from '../components/AufContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BookList from '../components/BookList';
import { logoutAPI } from '../API/Users';

function Acount() {
    const navigate = useNavigate();
    const { nickname, aufToken, logout } = useAuth();

    const click_exit = async () =>{
      logout()
      try {
        console.log(aufToken)
        const dataAPI = await logoutAPI(aufToken);
    } catch (error) {
        alert('Exit failed: ' + error.message);
    }
    }
  
    return (
      <div className='Acount-container'>
        <NavigationBar />
        <div className='Acount-block'>
            <div className='change-password-title'>
                <h1>Имя пользователя: {nickname} </h1>
                <button className='logout_button' onClick={click_exit}>Выход</button>
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
        
        <h2>Ваши книги</h2>
        <BookList filterType="my" />

        </div>
        
      </div>
    );
  }

export default Acount;