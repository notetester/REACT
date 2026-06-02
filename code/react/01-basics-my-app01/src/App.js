import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import RouterTest02 from './pages/step16-Router/RouterTest02';
import First from './pages/step16-Router/First';
import Second from './pages/step16-Router/Second';
import Home from './pages/step16-Router/Home';
import { useState } from 'react';
import Third from './pages/step16-Router/Third';
import FetchTest01 from './pages/step17-Fetch/FetchTest01';
import FetchTest02 from './pages/step17-Fetch/FetchTest02';
import AxiosTest01 from './pages/step18-Axios/AxiosTest01';
import AxiosTest02 from './pages/step18-Axios/AxiosTest02';
import AxiosTest02Detail from './pages/step18-Axios/AxiosTest02Detail';
import LearningGallery from './pages/live-preview/LearningGallery';
import EmbedExample from './pages/live-preview/EmbedExample';


function RouterPractice() {
  const [data] = useState([
    {title: "영화0", img: "movie0.jpg"},
    {title: "영화1", img: "movie1.jpg"},
    {title: "영화2", img: "movie2.jpg"},
    {title: "영화3", img: "movie3.jpg"},
    {title: "영화4", img: "movie4.jpg"},
    {title: "영화5", img: "movie5.jpg"},
  ])

  return (
    <div className="App">
      <RouterTest02 />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first" element={<First msg='환영합니다.'/>} />
        <Route path="/second" element={<Second data={data} />} />
        {/* URL 파라미터패턴 => :idx, :name 는 변수 자리 (고정값이 아니다)  */}
        <Route path="/third/:idx/:name" element={<Third data={data} />} />
        <Route path="/fetch01" element={<FetchTest01 />} />
        <Route path="/fetch02" element={<FetchTest02 />} />
        <Route path="/axios01" element={<AxiosTest01 />} />
        <Route path="/axios02" element={<AxiosTest02 />} />
        <Route path="/axios02/:id" element={<AxiosTest02Detail />} />
      </Routes>
    </div>
  );
}

function App() {
  // GitHub Pages에서는 정적 호스팅 새로고침 404를 피하려고 hash 라우팅을 사용한다.
  const Router = process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/lab/embed/:exampleId" element={<EmbedExample />} />
        <Route path="/lab" element={<LearningGallery />} />
        <Route path="/lab/:exampleId" element={<LearningGallery />} />
        <Route path="*" element={<RouterPractice />} />
      </Routes>
    </Router>
  );
}

export default App;
