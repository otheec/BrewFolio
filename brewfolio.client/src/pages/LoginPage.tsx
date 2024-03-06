import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Credentials {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (credentials: Credentials) => {
    try {
      const response = await fetch('http://localhost:5206/login?useCookies=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Necessary for cookies to be set by the browser
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      navigate('/home');
    } catch (error) {
      alert('Failed to login');
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = { email, password };
    login(credentials);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-12 col-sm-10 col-md-8 col-lg-4 mx-auto">
        <div className="card shadow">
          <h5 className="card-header text-center">Login to BrewFolio</h5>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
