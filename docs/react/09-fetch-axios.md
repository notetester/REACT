# React 09 — Fetch / Axios (서버 통신)

> 실습 코드: `my-app01/src/pages/step17-Fetch`, `step18-Axios`

---

## 1. Fetch API — 브라우저 내장

별도 설치 없이 `fetch()`로 비동기 요청. `useEffect`와 함께 **최초 1회** 데이터를 가져옵니다.
```jsx
const [temp, setTemp] = useState();
useEffect(() => {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&appid=...')
    .then(res => res.json())                 // 응답을 JSON으로 변환
    .then(data => setTemp((data.main.temp - 273.15).toFixed(2) + "C"))
    .catch(err => console.error(err));
}, []);                                        // [] → 마운트 시 1회
```

## 2. Axios — Promise 기반 HTTP 라이브러리

`axios`는 브라우저/Node용 Promise 기반 HTTP 라이브러리. **자동 JSON 변환**, 인터셉터 등 편의 기능 제공. 설치: `npm install axios`

### async/await + 로딩/에러 처리 (step18)
```jsx
const [list, setList] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const getData = async () => {
  try {
    const res = await axios.get('https://api.tvmaze.com/search/shows?q=avengers');
    setList(res.data.slice(0, 10));           // 10개만
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
useEffect(() => { getData(); }, []);

if (loading) return <p>불러오는 중 ...</p>;     // 로딩 상태 분기
if (error)   return <p>오류 : {error}</p>;       // 에러 상태 분기

return list.map((k) => (
  <Link key={k.show.id} to={`/axios02/${k.show.id}`}>   {/* 상세보기로 URL 파라미터 전달 */}
    <img src={k.show.image?.medium} alt={k.show.name} />
    <p>장르 : {k.show.genres.join(",")}</p>
  </Link>
));
```

> **Fetch vs Axios**: Fetch는 내장(설치 불필요)이지만 JSON 변환·에러 처리를 직접 해야 함. Axios는 자동 JSON 변환 + **인터셉터**(요청/응답 가로채기)가 강력 → 연동 프로젝트에서 **JWT 토큰 자동 주입/재발급**에 활용. → [연동 흐름](../integration/react-springboot-jwt-flow.md)

---
### 다음 단계
- [React 10 — Zustand 기초](10-zustand-basics.md)
