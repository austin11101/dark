import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../logo.png'; 


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      navigate('/Home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login </h2>
      {/* Add the logo here */}
      <img src={logo} alt="Company Logo" style={{ width: '650px', height: '650px' }} />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;