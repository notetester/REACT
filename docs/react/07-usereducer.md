# React 07 — useReducer

> 실습 코드: [`step14-Reducer`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step14-Reducer)

---

> 각 코드 **바로 아래에 그 코드의 실행 결과**를 붙였습니다. 직접 조작해 보세요. 전체를 한 화면에서 비교하려면 → [결과 탐색기](/REACT/demo/react-basics/#/lab)

## useReducer 란?

복잡한 상태관리를 더 **체계적이고 예측 가능하게** 처리하는 Hook. `useState`의 대체제로, 상태 변화 로직이 복합적일 때 더 명확합니다.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```
| 요소 | 설명 |
|------|------|
| `state` | 현재 상태 |
| `dispatch` | 상태 변경을 **요청**하는 함수 |
| `reducer` | 상태를 **어떻게** 바꿀지 결정하는 함수 |
| `initialState` | 초기 상태값 |
| `action` | 변경 요청 객체 `{ type, payload }` (`type`=동작 이름, `payload`=데이터) |

## 동작 흐름

```mermaid
flowchart LR
  C[컴포넌트] -- "dispatch(action)" --> R["reducer<br/>state, action을 받아 새 state 반환"]
  R -- "새 state" --> C
```

## 예제 (카운터)
<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'SET':       return { count: action.payload };
    default:          return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>10으로</button>
    </>
  );
}
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 같은 dispatch→reducer→state 패턴의 실습 은행 예제(금액 입력 후 예금·출금)</p>
<iframe class="cr__frame" src="/REACT/demo/react-basics/#/lab/embed/reducer-bank" loading="lazy" title="useReducer 결과"></iframe>
</div>
</div>

> **useState vs useReducer**: 단순 상태는 `useState`, 여러 값이 함께 바뀌거나 변경 규칙이 복잡하면 `useReducer`가 깔끔합니다. (reducer의 `action` 패턴은 이후 Redux/Zustand 이해에도 도움)

---
### 다음 단계
- [React 08 — React Router](08-router.md)
