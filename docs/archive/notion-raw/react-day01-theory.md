# [RAW] React Day01 (이론) — 출처: 강사 Notion (351b3824...0b14)

Title: Day01(이론) | Notion
URL: https://www.notion.so/Day01-351b382469f48159a68ae636ffbe0b14

---

Day01(이론)
1. React 란
페이스북(현 Meta)에서 개발한 자바스크립트 기반의 사용자 인터페이스 라이브러리
최종 프로젝트의 화면을 담당한다.
(이유: 최종 프로젝트 할 때 SpringBoot에서는 jsp를 권장하지는 않아서 jsp 를 잘 사용하지 않는다.
대신 React 나 Vue를 사용한다. 가벼운 프로젝트에서 thymeleaf 라는 화면 단을 사용하기도 한다.)
React의 핵심 개념
컴포넌트 기반 : UI를 작고 독립적인 조각(컴포넌트)으로 나누어 작성한다. 재사용이 가능하고 유지보수가 쉽다.
  function Welcome(props){ return <h1>Hello, {props.name}</h1>; }
JSX(JavaScript XML): 실제 자바스크립트는 아니다. HTML과 비슷하게 생긴 문법을 JavaScript 안에서 사용할 수 있게 한다.
Virtual DOM : 실제 DOM 대신 가상의 DOM을 사용하여 변경 사항을 추적, 최소한의 변경만 실제 DOM에 반영
단방향 데이터 흐름 : 상위 컴포넌트에서 하위 컴포넌트로만 데이터를 전달한다.
Hooks : 상태 관리나 라이프 사이클(생명주기) 제어 등을 가능하게 한다.

2. React 설치
React를 사용하려면 node.js가 설치되어야 한다.
node.js 란 자바스크립트를 브라우저 밖에서도 실행할 수 있게 해주는 런타임 환경(실행 환경) 이다.
원래 자바스크립트는 브라우저에서만 실행되던 언어였다. Node.js는 자바스크립트를 브라우저가 아닌 컴퓨터(서버)에서도 실행 할 수 있게 해준다. 이를 통해 백엔드 서버도 자바스크립트로 개발 할 수 있게 되었다.
Node 관련 용어:
- NVM : Node Version Manager => Node.js의 버전을 쉽게 관리할 수 있도록 도와주는 도구
- NPM : Node Package Manager => Node.js의 기본 패키지 관리 도구. 필요한 패키지(모듈)를 쉽게 관리하고 설치.
- CSR (Client Side Rendering) : 클라이언트 측에서 페이지를 렌더링. 서버는 최초에 HTML/CSS/JS를 제공하고, 이후 클라이언트가 동적으로 콘텐츠 렌더링.
- SPA(Single Page Application) : 단일 HTML 페이지로 구성, 동적으로 콘텐츠 로드, 전체 페이지 새로고침 없이 페이지 전환 처리. React는 기본적으로 SPA이며 CSR 방식이 기본.
- SSR (Server Side Rendering) : React 컴포넌트를 서버에서 먼저 렌더링하여 HTML로 보내주는 방식. Next.js가 SSR.

React 설치 방법:
1) Node.js 설치 (NVM 사용권장). React 19는 node.js 18.x 또는 20.x(LTS) 권장.
   https://github.com/coreybutler/nvm-windows/releases => nvm-setup.exe 다운받아 설치
2) nvm-setup.exe 설치
3) 설치 확인: cmd에서 node -v / npm -v / nvm -v
4) node -v, npm -v 안 되고 nvm -v 만 되면:
   nvm list / nvm install 20 / nvm use 20
vscode 설치: https://code.visualstudio.com/download

프로젝트 만들기:
5-1. CRA(Create React App) : 전통적인 React 프로젝트 구조, 보수적이고 보편적
   npx create-react-app my-app01 --template cra-template --react-version 19
   vscode에서 폴더 열기 → my-app01 선택 → 새 터미널에서 npm start → http://localhost:3000
5-2. Vite : 빠르고 간단한 React 프로젝트 생성 (프론트엔드 빌드 도구)
   npm create vite@latest my-app02
   npm install 후 npm run dev → http://localhost:5173

프로젝트 전체 구조:
1. node_modules : npm install로 내려받은 모든 라이브러리. 직접 수정X, 삭제해도 됨(npm install로 재생성), Git에 안 올림(용량 큼)
2. public : 정적 페이지 파일 보관소. index.html : 단 하나의 HTML 껍데기
3. src : 실제 React 애플리케이션 소스 코드
   - App.js : 루트 컴포넌트(화면 구성 시작점)
   - index.js : 앱의 진입점
     const root = ReactDOM.createRoot(document.getElementById('root'));
     root.render(<React.StrictMode><App /></React.StrictMode>);
     1. 화면 만들 위치 찾기 (id=root → index.html의 <div id="root"></div>)
     2. root.render() => root 위치에 화면 렌더링
     3. <App />은 App.js에서 리턴하는 코드
     4. <React.StrictMode>는 개발 중에만 동작하는 경고 도우미(배포 시 영향 없음)
4. .gitignore : Git에 올리지 않을 파일/폴더 목록
5. package-lock.json : 설치 당시 정확한 의존성 트리의 잠금 스냅샷. 동일 버전 재현 보장. 직접 수정X
6. package.json : 프로젝트 메타정보 + 의존성 + 스크립트. 라이브러리 추가: npm install 라이브러리
7. components 폴더 : 재사용 가능한 공통 컴포넌트 (Button, Header, Footer, Modal, Card …)
8. pages 폴더 : 화면 단위 구성. 라우터와 연결되는 하나의 페이지 (로그인, 회원가입, 게시판리스트, 상세보기 등)

React - JSX 규칙 (https://ko.react.dev/learn/your-first-component)
컴포넌트 = 마크업(태그)을 반환하는 자바스크립트 함수.
1. 컴포넌트 만드는 방법
   - 선언 후 내보내기(분리형): function 이름(){ return( ... ) }  export default 이름;
   - 선언하면서 내보내기(통합형): export default function 이름(){ return( ... ) }  (일반적)
2. 단일 루트 요소 반환: 최종 태그는 하나여야 한다. (<div>...</div> 또는 Fragment <>...</>)
3. html과 다른점: 모든 태그는 닫는 태그 사용. <img>,<br>,<input> → <img />,<br />,<input />
4. html과 다른점: class 속성 → className 속성
5. camelCase 작성 규칙(속성): 첫 단어 소문자, 이후 단어 첫글자 대문자
6. 컴포넌트 이름(function 이름)은 첫글자 대문자로 시작 (HTML 태그와 구분; HTML 태그는 소문자)
7. return 뒤 ()가 없으면 한 줄일 때만 가능 (주의: return 다음 줄바꿈 시 undefined 반환됨)
8. 컴포넌트 안에 다른 컴포넌트를 호출해 사용 가능(재사용). 단, 컴포넌트 내부에 다른 컴포넌트를 "정의(중첩)"하면 안 됨.
   올바른 예: Gallery 안에서 <Profile /> 여러 번 호출
   틀린 예: Gallery 함수 내부에 function Profile(){} 정의
