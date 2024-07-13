import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', geolocation: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://food-app-woad-iota.vercel.app/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/login');
    } else {
      alert('Enter Valid Credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const backgroundImageUrl =
    'https://images.pexels.com/photos/858508/pexels-photo-858508.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '25rem' }}>
        <h2 className="card-title text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="geolocation"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">
            Submit
          </button>
          <Link to="/login" className="btn btn-danger w-100">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
