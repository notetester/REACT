# React 12 — 최신 React 학습 로드맵

> 이 장은 기존 CRA 실습을 지우지 않고, **새 프로젝트를 시작할 때의 최신 선택**과 React 공식 문서가 강조하는 사고방식을 덧붙입니다.
>
> 먼저 [React 01~11](01-intro-setup.md)을 따라 컴포넌트, 상태, Router, Axios, Zustand를 직접 만져 본 뒤 읽으세요.

!!! tip "앞 장의 결과를 다시 비교하세요"
    JSX부터 `useReducer`까지 동작하는 화면은 [React 실습 결과 갤러리](live-results.md)에서 한 번에 비교할 수 있습니다. 이 장에서는 그 결과를 만들 때 지켜야 할 최신 설계 원칙을 정리합니다.

## 1. 왜 CRA 실습을 보존하면서 새 시작 방법을 따로 배우나요?

이 저장소의 `my-app01`, `my-app02`, `my-app03`은 CRA(Create React App, `react-scripts`) 기반입니다. 강의 당시 파일 구조와 단계별 실습을 그대로 따라가기 좋고, 현재도 빌드와 GitHub Pages 배포가 검증됩니다.

하지만 React 팀은 2025년 2월 14일 [Create React App 지원 종료 안내](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)에서 **신규 앱에 CRA를 사용하지 말 것**을 권장했습니다. CRA는 유지보수 모드이며, 새 앱은 목적에 따라 React 프레임워크 또는 Vite 같은 빌드 도구로 시작합니다.

| 상황 | 권장 출발점 | 이유 |
|---|---|---|
| 이 저장소의 강의 실습 복습 | 기존 CRA 코드 | 강의 순서와 코드 이력을 그대로 관찰 |
| React 문법을 작은 SPA로 연습 | Vite | 설정이 단순하고 개발 서버가 빠름 |
| 실제 서비스 신규 개발 | React가 권장하는 프레임워크 검토 | Router, 데이터 로딩, 코드 분할, 렌더링 전략을 함께 설계 |
| Spring Boot REST API와 분리된 사내용 화면 | Vite + Router도 합리적 | CSR SPA가 요구사항에 충분할 수 있음 |

!!! warning "CRA를 새로 설치하는 명령은 역사적 실습입니다"
    [React 01](01-intro-setup.md)의 CRA 명령은 기존 강의 구조를 이해하기 위해 남겨 둡니다. 새 개인 프로젝트를 만들 때는 아래 Vite 흐름을 먼저 선택하세요.

```bash
npm create vite@latest my-homepage -- --template react
cd my-homepage
npm install
npm run dev
```

React 공식 문서의 현재 출발점은 [Creating a React App](https://react.dev/learn/start-a-new-react-project)과 [Installation](https://react.dev/learn/installation)입니다.

## 2. React의 핵심 정신 모델: 화면은 상태의 결과입니다

React에서는 화면 요소를 직접 찾아 바꾸는 방식보다, **현재 props와 state로 어떤 UI가 보여야 하는지 선언**합니다.

```jsx
function LoginStatus({ user }) {
  return user
    ? <p>{user.name}님, 환영합니다.</p>
    : <p>로그인이 필요합니다.</p>
}
```

중요한 흐름은 다음과 같습니다.

```text
이벤트 발생 → 상태 업데이트 요청 → React가 다시 렌더링
          → 이전 화면과 새 화면 비교 → 필요한 DOM 변경 반영(commit)
```

state는 일반 변수와 다릅니다. 각 렌더링은 당시 state 값을 기준으로 만들어진 **스냅샷**처럼 동작합니다. 이벤트 핸들러가 보는 값도 그 렌더링 시점의 값입니다. 연속 업데이트에서 이전 값이 필요하면 함수형 업데이트를 사용합니다.

```jsx
// 이전 값을 기준으로 1씩 세 번 증가
setCount(prev => prev + 1)
setCount(prev => prev + 1)
setCount(prev => prev + 1)
```

## 3. 상태 구조를 먼저 설계하세요

상태가 많아질수록 코드 양보다 **상태의 모양**이 버그를 좌우합니다. React 공식 문서 [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)는 다음 원칙을 강조합니다.

| 원칙 | 나쁜 예 | 더 나은 방향 |
|---|---|---|
| 함께 바뀌는 값은 묶기 | 입력 필드마다 무관한 로직 반복 | `form` 객체로 묶기 |
| 서로 모순되는 상태 피하기 | `isLoading=true`, `isSuccess=true` 동시 가능 | `status: 'loading' | 'success' | 'error'` |
| 계산 가능한 값은 저장하지 않기 | `todos`와 `doneCount`를 둘 다 state로 저장 | 렌더링 중 `filter`로 계산 |
| 같은 값을 중복 저장하지 않기 | 선택한 객체 전체를 별도 state에 복제 | `selectedId`만 저장 |
| 깊은 중첩 줄이기 | 여러 단계 객체를 매번 복사 | 가능한 한 평평하게 정규화 |

예를 들어 완료 개수는 별도 state가 아닙니다.

```jsx
const [todos, setTodos] = useState([])
const doneCount = todos.filter(todo => todo.done).length
```

`doneCount`를 state로도 저장하면 `todos`를 수정할 때마다 두 값을 맞춰야 합니다. 한 번이라도 놓치면 화면에 서로 다른 진실이 생깁니다.

## 4. 객체와 배열 state는 읽기 전용처럼 다룹니다

JavaScript 객체와 배열은 변경할 수 있지만, React state에 들어간 값은 **불변(immutable)** 값처럼 취급합니다. 기존 객체를 직접 바꾸지 말고 새 객체를 만들어 교체합니다.

```jsx
// 잘못된 예: 기존 객체 직접 변경
user.name = '새 이름'
setUser(user)

// 권장: 새로운 객체 생성
setUser(prev => ({ ...prev, name: '새 이름' }))
```

배열도 같습니다.

```jsx
// 추가
setTodos(prev => [...prev, newTodo])

// 삭제
setTodos(prev => prev.filter(todo => todo.id !== targetId))

// 일부 수정
setTodos(prev => prev.map(todo =>
  todo.id === targetId ? { ...todo, done: !todo.done } : todo
))
```

`push`, `pop`, `splice`, 배열 요소 직접 대입은 기존 배열을 바꾸므로 피합니다. 자세한 기준은 React 공식 문서 [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)와 [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)를 참고하세요.

## 5. Effect는 만능 후처리 함수가 아닙니다

`useEffect`는 렌더링 후 아무 코드나 넣는 공간이 아닙니다. React 바깥의 시스템과 동기화할 때 사용합니다.

| Effect가 어울리는 경우 | Effect가 대개 필요 없는 경우 |
|---|---|
| 네트워크 요청 | props/state로 계산 가능한 값 만들기 |
| 타이머 시작·해제 | 버튼 클릭으로 발생한 로직 |
| 브라우저 이벤트 구독·해제 | 한 state가 바뀔 때 다른 state를 억지로 맞추기 |
| 외부 위젯 연결·정리 | 리스트 필터링·정렬 결과 계산 |

타이머나 구독은 cleanup이 필요합니다.

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('tick')
  }, 1000)

  return () => clearInterval(timerId)
}, [])
```

개발 모드의 `<StrictMode>`는 Effect cleanup 누락을 찾기 위해 Effect를 한 번 더 실행할 수 있습니다. “왜 개발 중 요청이 두 번 보이지?”라고 바로 Effect를 막기보다, cleanup 또는 요청 취소가 필요한지 먼저 점검합니다.

공식 문서:

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [`<StrictMode>`](https://react.dev/reference/react/StrictMode)

## 6. 네트워크 요청은 상태 네 가지를 함께 설계합니다

서버 데이터를 가져오는 화면은 최소한 다음 상태를 구분합니다.

```text
idle → loading → success
              ↘ error
```

```jsx
const [items, setItems] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

useEffect(() => {
  const controller = new AbortController()

  async function load() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/items', {
        signal: controller.signal,
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      setItems(await response.json())
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  load()
  return () => controller.abort()
}, [])
```

이 패턴은 학습용으로 유용합니다. 규모가 커지면 라우터의 loader 또는 TanStack Query, SWR 같은 데이터 도구를 검토합니다. React 팀도 [CRA 지원 종료 안내](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)에서 Effect 안의 단순 fetch만으로는 네트워크 waterfall, 캐싱, 재검증, pending UI를 직접 해결해야 한다고 설명합니다.

## 7. 이 교재를 마친 뒤의 확장 순서

| 순서 | 확장 주제 | 지금 배운 내용과의 연결 |
|---|---|---|
| 1 | Vite로 같은 화면 다시 만들기 | CRA 파일 구조와 차이 비교 |
| 2 | 접근성 점검 | `label`, `htmlFor`, `alt`, 키보드 탐색 |
| 3 | Router loader와 오류 화면 | `useEffect` fetch의 한계 이해 |
| 4 | TanStack Query 등 서버 상태 도구 | 로딩·오류·캐싱·재검증 분리 |
| 5 | 테스트 | 사용자 관점의 화면 동작 검증 |
| 6 | 프레임워크 검토 | CSR, SSG, SSR을 요구사항에 맞게 선택 |

!!! tip "처음부터 모든 도구를 넣지 마세요"
    이 교재의 목표는 React의 원리를 직접 경험하는 것입니다. 기본 상태와 Effect를 이해한 뒤, 반복되는 문제를 발견했을 때 다음 도구를 도입하면 각 도구가 해결하는 문제가 선명해집니다.

### 다음 단계

- [Spring Boot 01 — 구조와 레이어드 아키텍처](../springboot/01-intro-architecture.md)
- [최종 프로젝트 — 간단한 홈페이지 완성 로드맵](../integration/final-homepage-roadmap.md)
