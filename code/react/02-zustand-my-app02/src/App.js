import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import MemoPage from './pages/MemoPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';


function App() {
  // GitHub Pages에서는 정적 호스팅 새로고침 404를 피하려고 hash 라우팅을 사용한다.
  const Router = process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <div className='app'>
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/todo" element={<TodoPage />}></Route>
        <Route path="/memo" element={<MemoPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        
      </Routes>
    </div>
    </Router>
  );
}

export default App;
