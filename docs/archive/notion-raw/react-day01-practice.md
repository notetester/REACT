# [RAW] React Day01 (실습) — 출처: 강사 Notion (351b3824...dcd1)

Title: Day01(실습) | Notion
URL: https://www.notion.so/Day01-351b382469f480ce8614c37b6bdedcd1

---

Day01(실습)
1. 프로젝트 실행 구조
1) index.html (HTML 뼈대) → 2) index.js (진입점) → 3) App.js (화면 구성)
  1. index.html → 빈 도화지 준비
  2. index.js → 도화지 찾고, App 호출
  3. App.js → 실제 내용 그려서 출력
  4. 화면 표시 완료

2. step01-jsx 실습

pages/step01-jsx/Book.jsx
// 파일이름과 function이름을 같게 하자. function 이름은 대문자로 시작하자.
export default function Book(props) {
  return(
    // 단일 루트 요소 반환
    <>
      {/* 태그 표현식 */}
      <h1>책이름은 {props.name} 입니다.</h1>
      {/* `{문자열 ${객체.변수이름} 문자열}` */}
      <h1>{`책은 총 ${props.numOfPage} 페이지로 만들어졌음`}</h1>
    </>
  );
}

pages/step01-jsx/Library.jsx
import Book from "./Book";
export default function Library() {
  return(
    <>
      {/* 컴포넌트가 다른 컴포넌트를 호출 할 수 있다. */}
      <h1>안녕하세요</h1>
      {/* 속성(props)을 이용해서 정보를 전달 */}
      <Book name="홍길동 전" numOfPage="105" />
      <hr />
      <Book name="구운몽 전" numOfPage="1024" />
      <hr />
      <Book name="춘향전" numOfPage="75"/>
    </>
  );
}

index.js (테스트 시 루트에 컴포넌트 직접 렌더링)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Library from './pages/step01-jsx/Library';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> 대신 학습용으로 컴포넌트를 직접 렌더링 */}
    <Library />
  </React.StrictMode>
);
