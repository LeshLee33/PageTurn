import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Reg_Auf.css';
import { useAuth } from '../components/AufContext';
import { useNavigate } from 'react-router-dom';
import { loginAPI, logoutAPI } from '../API/Users';

function Authorization() {
const navigate = useNavigate();
const { login } = useAuth();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const submitFunc = async () => {
    try {
        const aufData = await loginAPI(username, password);
        if (aufData != null){
            login(username,aufData);
            navigate('/acount');
        } 
    } catch (error) {
        alert('Authorization failed: ' + error.message);
    }
};

return (
    <div className="Authorization-container">
        <NavigationBar />

        <div className="Authorization-block">
            <div className="title">Авторизация</div>

            <div className="input-field">
                <label htmlFor="login">Логин</label>
                <input
                    className="input-auf"
                    name="login"
                    id="login"
                    type="text"
                    placeholder="Введите логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="input-field">
                <label htmlFor="password">Пароль</label>
                <input
                    className="input-auf"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="button-container">
                <button type="submit" className="submit-button-auf" onClick={() => submitFunc()}>
                    Подтвердить
                </button>
            </div>

            <p2>
            вы можете <Link to={`/registration`}>зарегистрироваться</Link>
            </p2>
        </div>
    </div>
    );
}

export default Authorization;