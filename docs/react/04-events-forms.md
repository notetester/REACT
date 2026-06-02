# React 04 — 조건부 렌더링 · 이벤트 · CSS · props · form

> 실습 코드: `my-app01/src/pages/step05-if` ~ `step10-form`
> (강사 필기의 "Day03"은 빈 페이지여서, 이 단원은 **로컬 실습 코드 기준**으로 정리했습니다.)
>
> 각 코드 **오른쪽(모바일은 아래)에 그 코드의 실행 결과**를 바로 붙였습니다. 버튼·입력을 직접 조작해 보세요. 전체를 한 화면에서 비교하려면 → [결과 탐색기](/REACT/demo/react-basics/#/lab)

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

| 입력 타입 | 읽는 값 |
|-----------|---------|
| text/select | `e.target.value` |
| checkbox | `e.target.checked` |
| radio | `value` + `checked={state === value}` |

---
### 다음 단계
- [React 05 — Hooks](05-hooks.md)
