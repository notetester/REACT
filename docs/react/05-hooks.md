# React 05 — Hooks

> 실습 코드: [`step11-hook`](../../code/react/01-basics-my-app01/src/pages/step11-hook)

---

## Hook 이란?

원래 React는 클래스 기반이었으나, 함수형 컴포넌트로 전환되면서 클래스에서 쓰던 기능을 함수형에서도 쓰기 위해 **Hook**이 도입됐습니다. 즉, 함수형 컴포넌트에서 React 기능을 **"갈고리처럼 끌어다 쓰는 함수"**.

**규칙:** 이름은 `useXXX`로 시작, 함수형 컴포넌트 전용, **반드시 컴포넌트 최상단에서만 호출**.

## 1. `useState` — 상태관리
```jsx
const [상태값, set함수] = useState(초기값);
// set함수로 변경 → 컴포넌트 자동 리렌더링
```

## 2. `useEffect` — 사이드 이펙트
렌더링 외의 작업(서버 데이터 요청, DOM 수정, 타이머 등)을 처리.
```jsx
useEffect(() => { /* 실행 코드 */ }, [의존성배열]);
```
| 의존성배열 | 실행 시점 |
|-----------|-----------|
| 생략 | 렌더링 될 때마다 |
| `[]` | **최초 1회만** (마운트 시) |
| `[특정값]` | 특정값이 변경될 때만 |

### React 생명주기(Lifecycle)
- **마운트**(처음 등장): 컴포넌트 생성 → `useState` 초기화 → 렌더링 → `useEffect` 실행
- **업데이트**(state/props 변경): 리렌더링
- **언마운트**(제거)

## 3. `useMemo` — 계산 결과 캐싱(메모이제이션)
값을 다시 계산하지 않고 이전 계산값을 재사용 → 불필요한 재계산 방지.
```jsx
const cached = useMemo(() => 무거운계산(a, b), [a, b]);
```
용도: 무거운 계산(반복문/정렬/필터), 자식에 전달하는 복잡한 값.

## 4. `useCallback` — 함수 자체를 캐싱
`useMemo`는 *값*을, `useCallback`은 *함수*를 캐싱. 자식 컴포넌트에 함수를 props로 전달할 때 불필요한 리렌더를 막습니다.
```jsx
const memoizedFn = useCallback(() => doSomething(a), [a]);
```

## 5. `useRef` — 리렌더 없이 값 보관 / DOM 접근
값이 바뀌어도 **리렌더링하지 않는** 상자.
- DOM 직접 접근, 이전값 기억, 타이머 ID 보관 등
```jsx
const inputRef = useRef(null);
// <input ref={inputRef} />  → inputRef.current.focus()
```

## 6. `useId` — 고유 ID 자동 생성
같은 컴포넌트를 여러 번 써도 ID가 겹치지 않음. `label`의 `htmlFor`와 `input`의 `id`를 묶으면 label 클릭 시 input 포커스.
```jsx
const id = useId();
<label htmlFor={id}>이름</label><input id={id} />
```

---
### 다음 단계
- [React 06 — Context API](06-context.md) · [React 07 — useReducer](07-usereducer.md)
