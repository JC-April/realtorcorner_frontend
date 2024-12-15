import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password);
  };

  return (
    <div className="auth_page">
      <div className="auth_div Login">
        <h1>Login</h1>
        <p>Sign into your account</p>

        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Password:</label>
          <input type="password" name="password" required />

          <div className="btn-container">
            <button type="submit">Login</button>
          </div>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
