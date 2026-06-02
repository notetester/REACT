// 라우터란 URL(주소경로)을 기준으로 어떤 컴포넌트을 화면에 보여줄지 결정하는 역학을 한다.
// React Router는 리액트 앱에서 클라이언트 측 라우팅(Client-Side Routing)을 구현할 때 사용하는 표준 라이브러리입니다. 
// 페이지 전체를 새로고침하지 않고도 URL에 맞춰 특정 컴포넌트만 갈아 끼워주는 역할을 합니다.

// 핵심 컴포넌트 
// BrowserRouter: HTML5 History API를 사용해 주소를 관리하는 최상위 컴포넌트입니다.
// Routes: 여러 Route를 감싸며, 현재 URL과 가장 잘 일치하는 경로를 찾아줍니다.
// Route: 특정 경로(path)와 그때 보여줄 컴포넌트(element)를 연결합니다.
// Link: 주소를 변경하되 페이지 새로고침은 막아주는 <a> 태그의 리액트 버전입니다

// 설치 : npm install react-router-dom

import { Link } from 'react-router-dom';
import './RouterTest01.css';

export default function RouterTest01(params) {
    return(
        <nav className="nav">
            <ul>
                <li className='lineStyle'>
                    <Link to="/">홈</Link>
                </li>
                <li className='lineStyle'>
                    <Link to="/first">첫번째</Link>
                </li>
                <li className='lineStyle'>
                   <Link to="/second">두번째</Link>
                </li>
            </ul>
        </nav>
    );
}