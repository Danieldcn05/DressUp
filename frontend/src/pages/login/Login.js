import './Login.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Notification from '../../core/pagesCore/Notification';

import { GuardarTokenEnStorage } from '../home/utils/guardarTokenEnStorage';

export function Login() {

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const [showNotification, setShowNotification] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.removeItem('authToken');

    try {
      const response = await fetch('http://localhost:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        GuardarTokenEnStorage(data.access);
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        setNotificationMessage('Login successful!');
        setNotificationType('success');
        setShowNotification(true);
        navigate('/home');
      } else {
        setSuccessMessage('');
        setErrorMessage(data?.response || 'Invalid email or password.');
        setNotificationMessage('Usuario o contraseña incorrectos');
        setNotificationType('error');
        setShowNotification(true); 
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Hubo un error en la conexión con el servidor.');
      setSuccessMessage('');
      setNotificationMessage('Hubo un error en la conexión con el servidor.');
      setNotificationType('error');
      setShowNotification(true);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Sign in to your account</h2>

        {showNotification && (
          <Notification
            message={notificationMessage}
            type={notificationType}
            onClose={() => setShowNotification(false)} 
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="input"
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="input"
            />
          </div>

          <button className="login-button" type="submit">Sign in</button>
        </form>
        <Link to="/register" className="register-link">Register now</Link>
      </div>
    </div>
  );
}
