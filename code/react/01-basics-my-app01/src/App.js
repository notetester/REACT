import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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


function App() {
    const [data, setData] = useState([
    {title: "영화0", img: "movie0.jpg"},
    {title: "영화1", img: "movie1.jpg"},
    {title: "영화2", img: "movie2.jpg"},
    {title: "영화3", img: "movie3.jpg"},
    {title: "영화4", img: "movie4.jpg"},
    {title: "영화5", img: "movie5.jpg"},
  ])

  return (
     <div className="App">
        <BrowserRouter>
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
        </BrowserRouter>
     </div>
  );
}

export default App;
