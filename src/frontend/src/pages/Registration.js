import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Registration.css';
import { useAuth } from '../components/AufContext';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate()
    const {nickname, login} = useAuth();

    const submitFunc = () => {
        login("lol")
        navigate("/acount")

    }

    return (
        <div className='Authorization-container'>
            <NavigationBar />

            <div className="Authorization-block">
                <div className='title'>Регистрация</div>

                <div className='input-field'>
                    <label htmlFor="login">Логин</label>
                    <input  className='input-auf' id="login" type="text"  placeholder="Введите логин" />
                </div>

                <div className='input-field'>
                    <label htmlFor="password">Пароль</label>
                    <input  className='input-auf' id="password" type="password" placeholder="Введите пароль" autoComplete="new-password"/>
                </div>
                
                <div className='input-field'>
                    <label htmlFor="confirm-password">Повтор пароля</label>
                    <input className='input-auf' id="confirm-password" type="password" placeholder="Повторите пароль" autoComplete="new-password"/>
                </div>
                <div className='button-container'>
                        <button className='submit-button-auf' onClick={() => submitFunc()}>Подтвердить</button>
                    </div>
                
            </div>
            
        </div>
    );
}

export default Registration;