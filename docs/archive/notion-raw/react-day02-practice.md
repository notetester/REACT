# [RAW] React Day02 (실습) — 출처: 강사 Notion (352b3824...9595)

Title: Day02(실습) | Notion
URL: https://www.notion.so/Day02-352b382469f48035becafeee48579595
(코드 전문은 로컬 my-app01 src/pages/step02~04 에 존재. 여기서는 교육 포인트/주석 위주로 보존)

---

## step02-component
- Clock.jsx: `{new Date().toLocaleTimeString()}` — JSX 안에서 JS 표현식 사용
- Comment.jsx: 인라인 스타일 객체 사용. `const styles = { wrapper:{...}, image:{...} }` → `<div style={styles.wrapper}>`. 스타일 속성은 객체(`{키:값}`), camelCase, 숫자는 px.
- CommentList.jsx: 배열 데이터를 map으로 렌더링.
  - "원래는 spring에서 정보를 가져와야 된다" (실제 데이터는 백엔드)
  - return() 안 {} 규칙: JS 코드 작성 시 사용. **{} 안에서 if문/for문 사용 불가 → for 대신 map 사용**
  - map 사용 시 각 항목 구분용 **key 필요**. 유일값 없으면 index 사용: `comments.map((k,idx)=> <Comment key={idx} ... />)`
- Item.jsx: props 구조분해. `function Item({title, content})` (= props.title, props.content)
- ItemList.jsx: 여러 <Item title content /> 호출

## step03-state — NumberCount.jsx (state의 필요성)
- 일반 변수 cnt를 버튼으로 증감해도 **화면은 안 바뀐다**.
- 교육 핵심 주석:
  "React는 한번 화면이 렌더링 되면 다시 렌더링 될 때까지 화면 변화 없다.
   React에게 현재 화면 상태가 변화 되었다고 지시하면 다시 렌더링하고 그때 변경된 값으로 적용된다.
   React에게 현재상태가 변경되었다고 지시하는 것 → 상태관리(state)"
- console.log로 디버깅(값 확인) 강조.

## step04-map — 배열 고차 메서드
- FilterCommandList.jsx: `filter(k=>k.isAdmin)` 조건에 맞는 항목만 추출 → 보통 filter 후 map. (isAdmin true인 것만 렌더)
- FindCommandList.jsx: `find(k=>k.isAdmin)` 조건에 맞는 **첫 번째 항목** 추출(배열 아닌 값). 삼항연산자로 분기:
  `result ? <Comment .../> : <p>조건 만족 항목 없음</p>`
- ReduceCommandList.jsx: `reduce((acc,k)=>{...}, {total:0, adminCount:0})` 누적 계산.
  - acc: 누적값 저장변수, k: 현재 객체, 두 번째 인자: 초기값
  - 동일 결과를 `comments.map(k=>k.idx).length`, `comments.filter(k=>k.isAdmin).length`로도 계산 가능 비교
- SomeEveryCommandList.jsx:
  - `some` = OR (하나라도 true면 true)
  - `every` = AND (모두 true면 true)

(index.js에서는 학습용으로 각 컴포넌트를 StrictMode 안에 직접 렌더링하며, 이전 것은 주석 처리하며 진행)
