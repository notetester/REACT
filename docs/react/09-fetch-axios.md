# React 09 — Fetch / Axios (서버 통신)

> 실습 코드: `my-app01/src/pages/step17-Fetch`, `step18-Axios`

---

> 아래 **2번 Axios 코드 바로 다음에 그 코드의 실행 결과**(TVmaze 공개 API 호출)를 붙였습니다. 전체를 크게 보려면 → [결과 탐색기](/REACT/demo/react-basics/#/lab)

## 1. Fetch API — 브라우저 내장

별도 설치 없이 `fetch()`로 비동기 요청. `useEffect`와 함께 **최초 1회** 데이터를 가져옵니다.
```jsx
const [temp, setTemp] = useState();
useEffect(() => {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&appid=...')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch는 4xx/5xx를 자동 reject하지 않음
      return res.json();
    })
    .then(data => setTemp((data.main.temp - 273.15).toFixed(2) + "C"))
    .catch(err => console.error(err));
}, []);                                        // [] → 마운트 시 1회
```

## 2. Axios — Promise 기반 HTTP 라이브러리

`axios`는 브라우저/Node용 Promise 기반 HTTP 라이브러리. **자동 JSON 변환**, 인터셉터 등 편의 기능 제공. 설치: `npm install axios`

### async/await + 로딩/에러 처리 (step18)
<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

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

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 로딩 표시 후 TVmaze 공개 API의 목록 렌더(이미지 클릭 → 상세)</p>
<iframe class="cr__frame cr__frame--tall" src="/REACT/demo/react-basics/#/axios02" loading="lazy" title="Axios 실행 결과"></iframe>
</div>
</div>

> **Fetch vs Axios**: Fetch는 내장(설치 불필요)이지만 JSON 변환·에러 처리를 직접 해야 함. Axios는 자동 JSON 변환 + **인터셉터**(요청/응답 가로채기)가 강력 → 연동 프로젝트에서 **JWT 토큰 자동 주입/재발급**에 활용. → [연동 흐름](../integration/react-springboot-jwt-flow.md)

## 3. Effect 안의 요청을 정리하기

화면을 떠난 뒤 늦게 도착한 응답이 이전 화면의 state를 바꾸지 않도록 요청 취소를 고려합니다.

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    const response = await fetch('/api/items', { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    setItems(await response.json());
  }

  load().catch(error => {
    if (error.name !== 'AbortError') setError(error.message);
  });

  return () => controller.abort();
}, []);
```

이 패턴은 기본 원리를 익히기에 좋습니다. 앱이 커지면 Router loader 또는 서버 상태 라이브러리로 로딩, 캐싱, 재검증을 분리할 수 있습니다. → [React 12](12-modern-react-roadmap.md)

---
### 다음 단계
- [React 10 — Zustand 기초](10-zustand-basics.md)
