# [RAW] useReducer (이론) — 출처: 강사 Notion (359b3824...28ad)

Title: useReducer(이론) | Notion
URL: https://www.notion.so/useReducer-359b382469f480fd9f3adbbabebe28ad

---

useReducer(이론)
- React에서 복잡한 상태관리를 더 체계적이고 예측 가능하게 처리하기 위한 상태관리 Hook.
- useState의 대체제이며, 상태 변화 로직이 복합적일 때 사용하면 더 명확하고 깔끔하게 관리 가능.

형식) const [state, dispatch] = useReducer(reducer, initialState);
- state : 현재 상태
- dispatch : 상태를 변경하는 요청(함수)
- reducer : 상태(state)를 어떻게 변경할지 결정하는 함수
- initialState : 초기 상태값
- action : 상태 변경을 요청하는 객체 ({type, payload})
  - type : 무엇을 할지(동작 이름)
  - payload : 무엇을 가지고 할지(상태를 바꾸기 위한 데이터)
