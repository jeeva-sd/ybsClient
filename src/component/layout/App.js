import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Login';
import Youtube from '../youtube/Layout';
import VideoDetail from '../youtube/VideoDetail';
import Header from './Header';

const App = () => {
  const isLoggedIn = useSelector(state => state.login.user.isLoggedIn);
  const PrivateRoute = ({ children }) => isLoggedIn ? children : <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="youtube" element={<PrivateRoute><Header /><Youtube /></PrivateRoute>} />
      <Route path="youtube/:videoId" element={<PrivateRoute><Header /><VideoDetail /></PrivateRoute>} />
    </Routes>
  );
};

export default App;