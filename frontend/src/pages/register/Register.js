import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const avatarOptions = [
  "/avatars/actriz.png",
  "/avatars/hombre (1).png",
  "/avatars/hombre (2).png",
  "/avatars/hombre.png",
  "/avatars/jugador.png",
  "/avatars/mujer-de-negocios (1).png",
  "/avatars/mujer-de-negocios.png",
  "/avatars/mujer.png"
];

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: null // Cambié el valor a null para almacenar el archivo real
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Función para manejar la selección de archivo (imagen)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // Asegurarse de que el archivo esté presente
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        picture: file // Almacenar el archivo real en el estado
      }));
    }
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, picture: avatar });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Crea un FormData para enviar los datos del formulario
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);

    // Verifica que 'picture' sea un archivo y lo agrega
    if (formData.picture && formData.picture instanceof File) {
      form.append("picture", formData.picture); // Solo agregar si es un archivo
    }

    try {
      const response = await fetch('http://localhost:8000/users/register/', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate('/login');
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
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <div className="register-container">
          <h2 className="register-title">Create a new account</h2>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-field">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-field">
              <label>Choose an Avatar</label>
              <div className="avatar-selection">
                {avatarOptions.map((avatar, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleAvatarSelect(avatar)} 
                    style={{ cursor: 'pointer', display: 'inline-block', margin: '10px' }}
                  >
                    <img 
                      src={avatar} // Asegúrate de que la ruta sea correcta
                      alt={`Avatar ${avatar}`} 
                      className={`avatar-image ${formData.picture === avatar ? 'selected' : ''}`} 
                      width="50" 
                      height="50" 
                    />
                  </div>
                ))}
              </div>
              <input 
                type="file" 
                name="picture" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                style={{ display: 'block' }}  // Hacemos visible el input de archivo para que el usuario seleccione
              />
            </div>
            <button className="register-button" type="submit">Register</button>
          </form>

          <Link to="/login" className="login-link">Already a member? Log in</Link>
        </div>
      </div>
    </div>
  );
};
