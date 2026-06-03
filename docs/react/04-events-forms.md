# React 04 — 조건부 렌더링 · 이벤트 · CSS · props · form

> 실습 코드: `my-app01/src/pages/step05-if` ~ `step10-form`
> (강사 필기의 "Day03"은 빈 페이지여서, 이 단원은 **로컬 실습 코드 기준**으로 정리했습니다.)
>
> 각 코드 **바로 아래에 그 코드의 실행 결과**를 붙였습니다. 버튼·입력을 직접 조작해 보세요. 전체를 한 화면에서 비교하려면 → [결과 탐색기](/REACT/demo/react-basics/#/lab)

---

## 1. 조건부 렌더링 — step05-if

`return()` 안에서는 `if`문을 못 쓰므로, 변수/삼항/논리연산자를 활용합니다.

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
// 삼항: 조건 ? 참 : 거짓
<p>Status : {isPacked ? '체크 O' : '체크 X'}</p>

// && (AND): 왼쪽이 true면 오른쪽 반환 (왼쪽 숫자 0 주의)
<li>{name} {isPacked && "체크 O"}</li>

// || (OR): 왼쪽이 false/빈문자열이면 오른쪽 반환
<li>{name} {chk || "체크 X"}</li>
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 항목을 눌러 체크 토글</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/cond-render" loading="lazy" title="조건부 렌더링 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step05-if/IfExam02List.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<IfExam02List />`를 렌더합니다.

    ```jsx
    import IfExam02List from './pages/step05-if/IfExam02List';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <IfExam02List />   {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — 조건부 렌더링 목록이 나오고, 항목을 누르면 체크 표시가 토글됩니다.

## 2. 이벤트 처리 — step06-event

`onClick={fn}`은 **함수 참조**(이벤트 시 실행), `onClick={fn()}`은 **즉시 실행**(렌더 시점). 인자를 넘기려면 화살표로 감쌉니다.

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
function handleClick() { console.log("event") }

<Button variant="text" onClick={handleClick}>Text</Button>
<Button variant="contained"
        onClick={() => console.log("event2")}>Contained</Button>
<Button variant="outlined" disabled>Outlined</Button>
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 클릭 후 개발자도구 Console 확인</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/event-handlers" loading="lazy" title="이벤트 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step06-event/Event03.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<Event03 />`를 렌더합니다.

    ```jsx
    import Event03 from './pages/step06-event/Event03';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Event03 />        {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — MUI 버튼이 나오고, 클릭하면 개발자도구 Console에 로그가 찍힙니다.

## 3. CSS 적용 — step07-css

- **외부 CSS 파일**: `import './Board.css'` 후 `className="..."`
- **인라인 스타일**: `style={{ color: 'red', fontSize: 16 }}` (객체, camelCase)

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
import './Board2.css';

export default function Board2() {
  return (
    <div className="board">
      <h3 className="board__title">클릭해 보세요</h3>
      {/* ... className으로 외부 CSS 적용 ... */}
    </div>
  );
}
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 외부 CSS + 클릭</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/css-board" loading="lazy" title="CSS 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step07-css/Board2.jsx` 와 같은 폴더의 `Board2.css` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<Board2 />`를 렌더합니다.

    ```jsx
    import Board2 from './pages/step07-css/Board2';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Board2 />         {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — 외부 CSS가 적용된 보드가 나오고, 클릭 이벤트가 동작합니다.

## 4. state로 만드는 카운터 — step08-event2 (MUI)

값 변경을 화면에 반영하려면 **state**가 필요합니다(일반 변수는 리렌더 X). → [React 03](03-state-list-events.md), [React 05](05-hooks.md)

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
import { Button } from "@mui/material";

const [cnt, setCnt] = useState(0);
<Button variant="outlined" onClick={() => setCnt(cnt + 1)}> + </Button>
<span>{cnt}</span>
<Button variant="outlined" onClick={() => setCnt(cnt - 1)}> - </Button>
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — +/- 로 리렌더 확인</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/state-counter" loading="lazy" title="카운터 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step08-event2/CounterEx02.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<CounterEx02 />`를 렌더합니다.

    ```jsx
    import CounterEx02 from './pages/step08-event2/CounterEx02';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <CounterEx02 />    {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — `+` / `-` 로 state 카운터가 화면에 반영됩니다.

## 5. props 심화 — step09-props

부모가 `props`로 데이터·콜백을 내려주고, 자식이 호출해 상태를 바꿉니다(단방향 + 콜백).

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
// 부모: 사용자 전환 + 상태 콜백 전달
const [user, setUser] = useState(users[0]);
<button onClick={handleSwitch}>Switch User</button>
<Profile3 name={user} status={status} onChangeStatus={setStatus} />
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — Switch User / 상태 변경</p>
<iframe class="cr__frame" src="/REACT/demo/react-basics/#/lab/embed/props-profile" loading="lazy" title="props 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step09-props/ProfileSample3.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<ProfileSample3 />`를 렌더합니다.

    ```jsx
    import ProfileSample3 from './pages/step09-props/ProfileSample3';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <ProfileSample3 />   {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}      {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — Switch User로 사용자를 바꾸고, 자식이 콜백으로 부모 상태를 바꿉니다.

## 6. form 다루기 — step10-form (제어 컴포넌트)

입력값을 **state로 제어**하는 "제어 컴포넌트" 패턴. `value`/`checked`를 state에 묶고 `onChange`로 갱신합니다.

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
const [checked, setChecked] = useState(
  Object.fromEntries(MENU_ITEMS.map((k) => [k.name, false]))
);
const handleChange = (e) =>
  setChecked({ ...checked, [e.target.name]: e.target.checked });

<Checkbox name={k.name} checked={checked[k.name]} onChange={handleChange} />
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 메뉴 체크 → 주문내역 반영</p>
<iframe class="cr__frame" src="/REACT/demo/react-basics/#/lab/embed/form-controlled" loading="lazy" title="form 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step10-form/FormSample03.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<FormSample03 />`를 렌더합니다.

    ```jsx
    import FormSample03 from './pages/step10-form/FormSample03';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <FormSample03 />   {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — 메뉴 체크박스를 고르면 제어 컴포넌트로 주문 내역에 반영됩니다.

| 입력 타입 | 읽는 값 |
|-----------|---------|
| text/select | `e.target.value` |
| checkbox | `e.target.checked` |
| radio | `value` + `checked={state === value}` |

---
### 다음 단계
- [React 05 — Hooks](05-hooks.md)
