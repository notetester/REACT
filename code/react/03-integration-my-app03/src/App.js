import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import MemoPage from './pages/MemoPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
import PrivateRoute from './components/PrivateRoute';
import GuestBookPage from './pages/GuestBookPage';

const Router = process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter

function App() {
  // 새로고침(F5) 시 로그인 상태 복원
  useEffect(()=>{
    // tokens가 있으면 로그인 상태 복원
    const stored = localStorage.getItem('tokens')  
    if(stored){
       const parsed = JSON.parse(stored)
       useAuthStore.getState().zu_login(parsed.user || null)
    }
  },[])
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <div className='app'>
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/todo" element={<TodoPage />}></Route>
        <Route path="/memo" element={<PrivateRoute> <MemoPage /></PrivateRoute>}></Route>
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/guestbook" element={<GuestBookPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
