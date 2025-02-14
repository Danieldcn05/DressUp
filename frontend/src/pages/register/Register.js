import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Si tienes el archivo CSS separado

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un API
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
    <div className="register-container">
      <h2 className="register-title">Create a new account</h2>

      <form>
        <div className="input-field">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
        </div>

        <button className="register-button" type="submit">Register</button>
      </form>

      <Link to="/login" className="login-link">Already a member? Log in</Link>
    </div>
    </form>
  );

}
