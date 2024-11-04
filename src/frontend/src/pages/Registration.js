import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/Reg_Auf.css';
import { useAuth } from '../components/AufContext';
import { useNavigate } from 'react-router-dom';
import { register } from '../API/Users';

function Registration() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitFunc = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const registerData = await register(username, password);
      if (registerData != null){
        login(username, registerData);
        navigate('/acount');
      }
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className='Authorization-container'>
      <NavigationBar />

      <div className="Authorization-block">
        <div className='title'>Регистрация</div>

        <div className='input-field'>
          <label htmlFor="login">Логин</label>
          <input
            className='input-auf'
            id="login"
            type="text"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='input-field'>
          <label htmlFor="password">Пароль</label>
          <input
            className='input-auf'
            id="password"
            type="password"
            placeholder="Введите пароль"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='input-field'>
          <label htmlFor="confirm-password">Повтор пароля</label>
          <input
            className='input-auf'
            id="confirm-password"
            type="password"
            placeholder="Повторите пароль"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className='button-container'>
          <button type="submit" className='submit-button-auf' onClick={submitFunc}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;