# [RAW] React Context (이론) — 출처: 강사 Notion (358b3824...46f6)

Title: React-Context(이론) | Notion
URL: https://www.notion.so/React-Context-358b382469f4808d90c0d892cceb46f6

---

React-Context(이론) — Context API를 사용한 상태관리

- React 컴포넌트 구조는 계층 구조(트리). 루트 컴포넌트에서 모든 하위 컴포넌트를 렌더링.
- 컴포넌트 간 데이터 전달은 상위→하위로 props(properties)로 전달.
- 상태(state): 컴포넌트 내부에서 관리되는 값. 사용자 입력, 서버 데이터, 상호작용 등으로 동적으로 변함.
- 상태관리 = 컴포넌트 간 데이터 전달과 관리.

## 문제점: Props Drilling
- 부모→자식→그 하위 자식으로 데이터를 계속 전달해야 하는 상황.
- 매번 props를 전달해야 해서 코드가 복잡해지고 유지보수 어려움.
- 해결: 상태관리 라이브러리나 Context API로 전역 상태 관리, 또는 상위에서 미리 가공해 전달.

## Context API
- React에서 상태를 전역적으로 관리하는 방법 중 하나.
- `createContext` 메소드로 생성된 객체.
- 상위→하위로 데이터를 일일이 전달할 필요 없이, 어떤 컴포넌트에서든 값을 공유 가능.

## 상태관리 라이브러리 종류
- Redux (Redux Toolkit), Zustand, Recoil, Jotai
