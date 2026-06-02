# React 08 — React Router (페이지 라우팅)

> 실습 코드: `my-app01/src/pages/step15-Router`, `step16-Router` · 버전: `react-router-dom` v6

---

## 바로 확인하는 실행 결과

상단 메뉴의 홈, 첫번째, 두번째, Axios 링크를 눌러 보세요. 주소와 화면이 바뀌지만 HTML 문서 전체를 다시 불러오지 않습니다. `단계별 결과`를 누르면 앞 장의 갤러리로 돌아갑니다.

<div class="react-live-preview">
  <iframe class="react-live-frame react-live-frame--compact" src="/REACT/demo/react-basics/" title="React Router 실행 결과" loading="lazy"></iframe>
</div>

<p class="react-live-links"><a href="/REACT/demo/react-basics/" target="_blank" rel="noopener">↗ 새 탭에서 크게 보기</a></p>

## 1. 라우터란?

**URL(주소 경로)에 따라 어떤 컴포넌트를 화면에 보여줄지 결정**하는 역할. React Router는 **클라이언트 측 라우팅(CSR)**을 구현하는 표준 라이브러리로, 페이지 전체를 새로고침하지 않고 URL에 맞는 컴포넌트만 갈아끼웁니다.

설치: `npm install react-router-dom`

## 2. 핵심 컴포넌트

| 컴포넌트 | 역할 |
|----------|------|
| `BrowserRouter` | HTML5 History API로 주소를 관리하는 최상위 컴포넌트 |
| `Routes` | 여러 `Route`를 감싸고, 현재 URL과 가장 잘 맞는 경로를 선택 |
| `Route` | `path`(경로)와 `element`(보여줄 컴포넌트)를 연결 |
| `Link` | 새로고침 없이 주소를 바꾸는 `<a>`의 React 버전 |

## 3. 기본 사용 (step15)
```jsx
// 네비게이션
import { Link } from 'react-router-dom';
<nav>
  <Link to="/">홈</Link>
  <Link to="/first">첫번째</Link>
  <Link to="/second">두번째</Link>
</nav>

// App.js — 라우트 정의
<BrowserRouter>
  <RouterTest02 />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/first" element={<First msg='환영합니다.' />} />
    <Route path="/second" element={<Second data={data} />} />
    {/* URL 파라미터 패턴 :idx, :name 은 변수 자리 */}
    <Route path="/third/:idx/:name" element={<Third data={data} />} />
  </Routes>
</BrowserRouter>
```

## 4. URL 파라미터 (step16)

`:idx`, `:name` 처럼 콜론으로 시작하는 부분은 **변수 자리**입니다. 자식에서 `useParams`로 읽습니다.
```jsx
import { useParams } from 'react-router-dom';
const { idx, name } = useParams();
```
- `useNavigate()` — 코드로 페이지 이동: `const navigate = useNavigate(); navigate('/')`

> 이 패턴은 이후 **Axios 상세보기**(`/axios02/:id`)와 **연동 프로젝트**의 페이지 보호(`PrivateRoute`)로 이어집니다. → [React 09](09-fetch-axios.md), [연동 흐름](../integration/react-springboot-jwt-flow.md)

!!! note "GitHub Pages 데모"
    로컬 개발에서는 `BrowserRouter`, 정적 GitHub Pages 빌드에서는 `HashRouter`를 사용합니다. 정적 서버에서 `/todo` 같은 경로를 직접 새로고침할 때 발생하는 404를 피하기 위한 선택입니다.

---
### 다음 단계
- [React 09 — Fetch / Axios](09-fetch-axios.md)
