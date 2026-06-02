# React 04 — 조건부 렌더링 · 이벤트 · CSS · props · form

> 실습 코드: `my-app01/src/pages/step05-if` ~ `step10-form`
> (강사 필기의 "Day03"은 빈 페이지여서, 이 단원은 **로컬 실습 코드 기준**으로 정리했습니다.)

---

## 1. 조건부 렌더링 — step05-if

`return()` 안에서는 `if`문을 못 쓰므로, 변수/삼항/논리연산자를 활용합니다.
```jsx
// 삼항: 조건 ? 참 : 거짓
<p>Status : {isPacked ? '체크 O' : '체크 X'}</p>

// && (AND): 왼쪽이 true면 오른쪽 반환 (왼쪽에 숫자 0 주의 — 0이면 0 출력)
<li>{name} {isPacked && "체크 O"}</li>

// || (OR): 왼쪽이 false/빈문자열이면 오른쪽 반환
<li>{name} {chk || "체크 X"}</li>
```

## 2. 이벤트 처리 — step06-event

```jsx
function handleClick() { alert("클릭1") }
function handleClick2(msg) { alert(msg) }

<button onClick={handleClick}>눌러주세요-1</button>          {/* 함수 "참조" 전달 (O) */}
<button onClick={handleClick2("클릭")}>X</button>             {/* 즉시 실행됨 (X, 잘못된 코드) */}
<button onClick={() => handleClick2("클릭2")}>눌러주세요-2</button>  {/* 화살표로 감싸 호출 (O) */}
```
> 핵심: `onClick={fn}`은 **함수 참조**(이벤트 발생 시 실행), `onClick={fn()}`은 **즉시 실행**(렌더 시점). 인자를 넘기려면 화살표 함수로 감쌉니다.

## 3. CSS 적용 — step07-css

- **외부 CSS 파일**: `import './Board.css'` 후 `className="..."`로 적용
- **인라인 스타일**: `style={{ color: 'red', fontSize: 16 }}` (객체, camelCase)

## 4. state로 만드는 카운터 — step08-event2 (MUI)

`@mui/material`의 `Button`을 쓰되, 값 변경을 화면에 반영하려면 **state**가 필요합니다(일반 변수는 리렌더 X). → [React 03](03-state-list-events.md), [React 05](05-hooks.md)
```jsx
import { Button } from "@mui/material";
const [cnt, setCnt] = useState(5);
<Button variant="outlined" onClick={() => setCnt(cnt + 1)}> + </Button>
```

## 5. props 심화 — step09-props

구조분해 + 조건부 표시:
```jsx
export default function Profile({ name, isStatus }) {
  return (
    <div>
      <h3>Name : {name}</h3>
      <p>Status : {isStatus ? 'Active' : 'Deactive'}</p>
    </div>
  );
}
```

## 6. form 다루기 — step10-form (제어 컴포넌트)

입력값을 **state로 제어**하는 "제어 컴포넌트(Controlled Component)" 패턴. `value`/`checked`를 state에 묶고 `onChange`로 갱신합니다.
```jsx
const [userName, setUserName] = useState('');
const [isSubscribed, setSubscribed] = useState(false);
const genders = ['male','female','other'];
const [gender, setGender] = useState(genders[0]);

<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
<input type="checkbox" checked={isSubscribed} onChange={(e) => setSubscribed(e.target.checked)} />
{genders.map((k) => (
  <label key={k}>
    <input type="radio" name="gender" value={k}
           checked={gender === k} onChange={(e) => setGender(e.target.value)} />{k}
  </label>
))}
<select value={role} onChange={(e) => setRole(e.target.value)}>
  {roles.map((k) => <option key={k}>{k}</option>)}
</select>
```
| 입력 타입 | 읽는 값 |
|-----------|---------|
| text/select | `e.target.value` |
| checkbox | `e.target.checked` |
| radio | `value` + `checked={state === value}` |

---
### 다음 단계
- [React 05 — Hooks](05-hooks.md)
