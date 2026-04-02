import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/tasks">📋 Task Board</Link>
      </div>
      <div className="navbar-links">
        <Link to="/tasks">Tasks</Link>
        <Link to="/tasks/new">+ New Task</Link>
      </div>
      <div className="navbar-user">
        <span>Hello, {user?.name}</span>
        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
