import './Login.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Login.css';
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

   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        navigate('/home');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage(data?.response || 'Hubo un error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Hubo un error en la conexión con el servidor.');
      setSuccessMessage('');
    }
  }
  return (
    <div className="login-container">
      <h2 className="login-title">Sign in to your account</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required  onChange={handleChange}/>
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required  onChange={handleChange}/>
        </div>

        <button className="login-button" type="submit">Sign in</button>
      </form>

      <a href="#" className="forgot-password-link">Forgot password?</a>
      <Link to="/register" className="register-link">Register now</Link>
    </div>
  );
}