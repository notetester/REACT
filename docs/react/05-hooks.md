# React 05 — Hooks

> 실습 코드: [`step11-hook`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step11-hook)

---

> 각 코드 **바로 아래에 그 코드의 실행 결과**를 붙였습니다. 직접 조작해 보세요. 전체를 한 화면에서 비교하려면 → [결과 탐색기](/REACT/demo/react-basics/#/lab)

## Hook 이란?

원래 React는 클래스 기반이었으나, 함수형 컴포넌트로 전환되면서 클래스에서 쓰던 기능을 함수형에서도 쓰기 위해 **Hook**이 도입됐습니다. 즉, 함수형 컴포넌트에서 React 기능을 **"갈고리처럼 끌어다 쓰는 함수"**.

**규칙:** 이름은 `useXXX`로 시작, 함수형 컴포넌트 전용, **반드시 컴포넌트 최상단에서만 호출**.

## 1. `useState` — 상태관리
```jsx
const [상태값, set함수] = useState(초기값);
// set함수로 변경 → 컴포넌트 자동 리렌더링
```

## 2. `useEffect` — 외부 시스템과 동기화

Effect는 React 바깥의 시스템과 동기화할 때 사용합니다. 서버 데이터 요청, 브라우저 이벤트 구독, 타이머, 외부 위젯 연결 등이 대표 예입니다. 렌더링 중 계산할 수 있는 값을 다시 state로 맞추는 용도에는 대개 필요하지 않습니다.

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
useEffect(() => {
  const timerId = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(timerId);  // cleanup
}, []);
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 첫 카운터를 바꿀 때만 Effect 실행(Console 확인)</p>
<iframe class="cr__frame" src="/REACT/demo/react-basics/#/lab/embed/effect-deps" loading="lazy" title="useEffect 의존성 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step11-hook/EffectTest03.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<EffectTest03 />`를 렌더합니다.

    ```jsx
    import EffectTest03 from './pages/step11-hook/EffectTest03';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <EffectTest03 />   {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000` (Console도 함께 열기)

    **④ 결과** — 두 카운터 중 첫 번째를 바꿀 때만 Console에 Effect 로그가 찍힙니다.

| 의존성배열 | 실행 시점 |
|-----------|-----------|
| 생략 | 렌더링 될 때마다 |
| `[]` | 마운트와 연결. 개발 StrictMode에서는 cleanup 검사를 위해 추가 실행 가능 |
| `[특정값]` | 특정값이 변경될 때만 |

React는 Effect가 다시 실행되기 전과 컴포넌트가 사라질 때 cleanup 함수를 호출합니다. 구독 해제, 타이머 해제, 요청 취소가 필요하다면 cleanup을 빠뜨리지 않습니다.

### React 생명주기(Lifecycle)
- **마운트**(처음 등장): 컴포넌트 생성 → `useState` 초기화 → 렌더링 → `useEffect` 실행
- **업데이트**(state/props 변경): 리렌더링
- **언마운트**(제거)

## 3. `useMemo` — 계산 결과 캐싱(메모이제이션)
값을 다시 계산하지 않고 이전 계산값을 재사용 → 불필요한 재계산 방지.
<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
const cached = useMemo(() => 무거운계산(a, b), [a, b]);
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 의존성이 그대로면 재계산 생략(캐싱)</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/usememo" loading="lazy" title="useMemo 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step11-hook/UseMemo02.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<UseMemo02 />`를 렌더합니다.

    ```jsx
    import UseMemo02 from './pages/step11-hook/UseMemo02';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <UseMemo02 />      {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — 의존성이 그대로면 무거운 계산을 건너뛰는(캐싱) 동작을 확인합니다.

용도: 무거운 계산(반복문/정렬/필터), 자식에 전달하는 복잡한 값.

## 4. `useCallback` — 함수 자체를 캐싱
`useMemo`는 *값*을, `useCallback`은 *함수*를 캐싱. 자식 컴포넌트에 함수를 props로 전달할 때 불필요한 리렌더를 막습니다.
<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
const memoizedFn = useCallback(() => doSomething(a), [a]);
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 함수 참조 유지로 자식 불필요 리렌더 방지</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/usecallback" loading="lazy" title="useCallback 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step11-hook/UseCallBack02.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<UseCallBack02 />`를 렌더합니다.

    ```jsx
    import UseCallBack02 from './pages/step11-hook/UseCallBack02';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <UseCallBack02 />   {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}     {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — 함수 참조가 유지되어 자식의 불필요한 리렌더가 줄어듭니다.

!!! note "메모이제이션은 정확성을 위한 필수 문법이 아닙니다"
    `useMemo`, `useCallback`은 성능 최적화 도구입니다. 모든 값과 함수를 습관적으로 감싸면 의존성 관리만 복잡해질 수 있습니다. 먼저 코드가 정확하게 동작하게 만들고, 실제로 반복 계산이나 불필요한 렌더링이 문제가 될 때 적용하세요.

## 5. `useRef` — 리렌더 없이 값 보관 / DOM 접근
값이 바뀌어도 **리렌더링하지 않는** 상자.
- DOM 직접 접근, 이전값 기억, 타이머 ID 보관 등
```jsx
const inputRef = useRef(null);
// <input ref={inputRef} />  → inputRef.current.focus()
```

## 6. `useId` — 고유 ID 자동 생성
같은 컴포넌트를 여러 번 써도 ID가 겹치지 않음. `label`의 `htmlFor`와 `input`의 `id`를 묶으면 label 클릭 시 input 포커스.
<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
const id = useId();
<label htmlFor={id}>이름</label><input id={id} />
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — label 클릭 시 연결된 input에 포커스</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/useid" loading="lazy" title="useId 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step11-hook/UseIdTest02.jsx` (위 코드를 저장).

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<UseIdTest02 />`를 렌더합니다.

    ```jsx
    import UseIdTest02 from './pages/step11-hook/UseIdTest02';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <UseIdTest02 />    {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — label을 클릭하면 `useId`로 연결된 input에 포커스가 갑니다.

---
### 다음 단계
- [React 06 — Context API](06-context.md) · [React 07 — useReducer](07-usereducer.md)
- [React 12 — 최신 React 학습 로드맵](12-modern-react-roadmap.md)
