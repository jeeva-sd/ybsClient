import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Login';
import VideoCard from '../youtube/VideoCard';
import VideoDetail from '../youtube/VideoDetail';
import MainLayout from './MainLayout';
import AddPost from '../youtube/AddPost';
import Home from './Home';
import ErrorPage from './ErrorPage';

const App = () => {
  const isLoggedIn = useSelector(state => state.login.user.isLoggedIn);
  const Private = ({ children }) => isLoggedIn ? <MainLayout>{children}</MainLayout> : <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Private><Home /></Private>} />
      <Route path="/post" element={<Private><VideoCard /></Private>} />
      <Route path="/post/:videoId" element={<Private><VideoDetail /></Private>} />
      <Route path="/add" element={<Private><AddPost /></Private>} />
      <Route path='*' exact={true} element={<Private><ErrorPage /></Private>} />
    </Routes>
  );
};

export default App;