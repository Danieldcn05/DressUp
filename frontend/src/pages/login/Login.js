import './Login.css'
import { Link } from 'react-router-dom';

import './Login.css';

export function Login() {
  return (
    <div className="login-container">
      <h2 className="login-title">Sign in to your account</h2>

      <form>
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button className="login-button" type="submit">Sign in</button>
      </form>

      <a href="#" className="forgot-password-link">Forgot password?</a>
      <Link to="/register" className="register-link">Register now</Link>
    </div>
  );
}
