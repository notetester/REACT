# React 03 — state(상태)와 배열 고차 메서드

> 실습 코드: [`step03-state`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step03-state) · [`step04-map`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step04-map)

---

## 바로 확인하는 실행 결과

카운터의 `+`, `-` 버튼을 누르면 `useState`가 바뀌고 화면도 다시 렌더링됩니다. 오른쪽에는 `filter`와 `map`을 거친 관리자 댓글만 남습니다.

<div class="react-live-preview">
  <iframe class="react-live-frame" src="/REACT/demo/react-basics/#/lab/state-lists" title="state 배열 고차 메서드 실행 결과" loading="lazy"></iframe>
</div>

<p class="react-live-links"><a href="/REACT/demo/react-basics/#/lab/state-lists" target="_blank" rel="noopener">↗ 새 탭에서 크게 보기</a></p>

## 1. 왜 state(상태)가 필요한가? — step03

일반 변수는 값을 바꿔도 **화면이 다시 그려지지 않습니다.**

```jsx
export default function NumberCount() {
  let cnt = 5;
  const increment = () => { cnt = cnt + 1; console.log('cnt:', cnt); };  // 값은 바뀌지만 화면은 그대로
  return (
    <>
      <button onClick={increment}> + </button>
      <span>{cnt}</span>
    </>
  );
}
```

> **핵심:** "React는 한번 렌더링되면 다시 렌더링될 때까지 화면 변화가 없다. React에게 *상태가 변경됐다*고 지시해야 다시 렌더링하고 변경된 값이 반영된다." → 그 지시 수단이 **상태관리(state)** = `useState`.

```jsx
import { useState } from 'react';
const [cnt, setCnt] = useState(5);
const increment = () => setCnt(cnt + 1);   // set함수로 변경 → 자동 리렌더링
```
→ 자세한 Hook 사용법은 [React 05 — Hooks](05-hooks.md).

### state는 렌더링 시점의 스냅샷

각 렌더링 안에서 `cnt`는 고정된 값처럼 동작합니다. 이전 값을 기준으로 연속 업데이트해야 한다면 함수형 업데이트를 사용합니다.

```jsx
setCnt(prev => prev + 1);
```

## 2. 배열 고차 메서드 — step04

리스트 데이터를 다룰 때 자주 쓰는 메서드들. (보통 `filter` 후 `map`)

| 메서드 | 설명 | 반환 |
|--------|------|------|
| `map` | 각 요소를 변환 | 배열 |
| `filter` | 조건에 맞는 요소만 추출 | 배열 |
| `find` | 조건에 맞는 **첫 번째** 요소 | 값(객체) |
| `reduce` | 누적 계산 | 누적값 |
| `some` | 하나라도 true → true (OR) | boolean |
| `every` | 모두 true → true (AND) | boolean |

```jsx
// filter — isAdmin인 것만 렌더링
comments.filter(k => k.isAdmin).map(k => <Comment key={k.idx} name={k.name} comment={k.comment} />)

// find — 첫 관리자 1명 (삼항연산자로 분기)
const result = comments.find(k => k.isAdmin);
{ result ? <Comment name={result.name} comment={result.comment} /> : <p>조건 만족 항목 없음</p> }

// reduce — 누적 통계
const stat = comments.reduce((acc, k) => {
  acc.total++; if (k.isAdmin) acc.adminCount++; return acc;
}, { total: 0, adminCount: 0 });   // 두 번째 인자 = 초기값

// some / every
comments.some(k => k.isAdmin)    // 관리자 댓글이 하나라도 있나?
comments.every(k => k.isAdmin)   // 모두 관리자 댓글인가?
```

## 3. 배열 state는 직접 변경하지 않기

React state에 들어간 배열은 읽기 전용처럼 다룹니다.

| 작업 | 피하기 | 권장 |
|---|---|---|
| 추가 | `push` | `[...prev, newItem]` |
| 삭제 | `splice` | `filter` |
| 수정 | `arr[index] = value` | `map` |
| 정렬 | 원본에 바로 `sort` | 복사 후 `sort` |

```jsx
setComments(prev => prev.map(comment =>
  comment.idx === targetId
    ? { ...comment, isAdmin: true }
    : comment
));
```

상태 구조와 불변 업데이트를 더 깊게 이해하려면 [React 12 — 최신 React 학습 로드맵](12-modern-react-roadmap.md)을 읽으세요.

---
### 다음 단계
- [React 04 — 조건부 렌더링 · 이벤트 · CSS · props · form](04-events-forms.md)
