import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import TaskBoard from './components/TaskBoard';
import CreateTask from './components/CreateTask';
import TaskDetail from './components/TaskDetail';
import './App.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {user && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/tasks" /> : <Login />} />
          <Route path="/tasks" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
          <Route path="/tasks/new" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
          <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
