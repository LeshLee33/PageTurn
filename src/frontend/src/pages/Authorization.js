import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Authorization.css';
import { useAuth } from '../components/AufContext';
import { useNavigate } from 'react-router-dom';

function Authorization() {
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
                <div className='title'>Авторизация</div>

                <div className='input-field'>
                    <label htmlFor="login">Логин</label>
                    <input  className='input-auf' name="login" id="login" type="text" placeholder="Введите логин" />
                </div>
                
                <div className='input-field'>
                    <label htmlFor="password">Пароль</label>
                    <input className='input-auf' name="password" id="password" type="password" placeholder="Введите пароль" />
                    <div className='button-container'>
                        <button className='submit-button-auf' onClick={() => submitFunc()}>Подтвердить</button>
                    </div>
                    
                </div>
                <p2> вы можете <Link to={`/registration`}>зарегистрироваться</Link></p2> 
            </div>
        </div>
    );
}

export default Authorization;