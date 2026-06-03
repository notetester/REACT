# React 02 — JSX와 컴포넌트, props, 리스트 렌더링

> 실습 코드: [`my-app01/src/pages/step01-jsx`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step01-jsx) · [`step02-component`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step02-component)

---

> 각 코드 **바로 아래에 그 코드의 실행 결과**를 붙였습니다. 직접 조작해 보세요. 전체를 한 화면에서 비교하려면 → [결과 탐색기](/REACT/demo/react-basics/#/lab)

!!! tip "이 컴포넌트는 어디에 붙나요?"
    `Book`·`Library` 같은 조각도 혼자 뜨는 게 아니라, [앱 골격](01-intro-setup.md#app-skeleton)의 `App.js` 트리에 `<컴포넌트 />`로 꽂혀 `#root`에 그려집니다. 코드를 볼 때 **"이게 트리의 어디에 들어가서 화면이 되는가"**를 함께 떠올리면 이해가 빨라집니다.

## 1. step01 — 첫 컴포넌트와 props

**props(properties)**: 부모가 자식에게 전달하는 데이터. (단방향)

<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
// Book.jsx — 파일명과 function명을 같게, 대문자 시작
export default function Book(props) {
  return (
    <>
      <h1>책이름은 {props.name} 입니다.</h1>
      <h1>{`책은 총 ${props.numOfPage} 페이지로 만들어졌음`}</h1>
    </>
  );
}

// Library.jsx — 컴포넌트가 다른 컴포넌트를 호출, 속성으로 정보 전달
import Book from "./Book";
export default function Library() {
  return (
    <>
      <Book name="홍길동 전" numOfPage="105" />
      <Book name="구운몽 전" numOfPage="1024" />
    </>
  );
}
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — props로 전달한 책 정보가 표시됨</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/jsx-library" loading="lazy" title="props 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step01-jsx/Book.jsx` 와 `src/pages/step01-jsx/Library.jsx` 에 위 코드를 각각 저장합니다.

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<Library />`를 렌더합니다.

    ```jsx
    import Library from './pages/step01-jsx/Library';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Library />        {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — `props`로 넘긴 책 제목·페이지 수가 화면에 표시됩니다.

> JSX 안에서 `{ }`는 **자바스크립트 표현식** 영역. `{`\`${객체.변수}\`}` 템플릿 리터럴도 가능.

## 2. step02 — 다양한 컴포넌트 패턴

### Clock — JSX 안 JS 표현식
```jsx
export default function Clock() {
  return <div><p>시간표시 : {new Date().toLocaleTimeString()}</p></div>;
}
```

### Comment — 인라인 스타일(객체)
스타일은 **객체**로 정의(`{키:값}`), 속성은 camelCase, 숫자는 px.
```jsx
const styles = { wrapper: { margin: 8, padding: 8, display: "flex", border: "1px solid grey", borderRadius: 16 },
                 image: { width: 50, height: 50, borderRadius: 25 } };
export default function Comment(props) {
  return (
    <div style={styles.wrapper}>
      <img src="..." style={styles.image} alt="" />
      <span>{props.name}</span><span>{props.comment}</span>
    </div>
  );
}
```

### CommentList — 배열을 `map`으로 렌더링 (★ key)
`return()` 안의 `{ }`에서는 **`if`/`for` 사용 불가** → 반복은 **`map`** 사용. 각 항목엔 구분용 **`key`** 필요(유일값 없으면 index).
<div class="cr" markdown="1">
<div class="cr__code" markdown="1">

```jsx
const comments = [{name:"홍길동", comment:"방가 방가"}, {name:"둘리", comment:"호이~"}];
export default function CommentList() {
  return (
    <div>
      {comments.map((k, idx) => (
        <Comment key={idx} name={k.name} comment={k.comment} />
      ))}
    </div>
  );
}
```

</div>
<div class="cr__view">
<p class="cr__label">▶ 결과 — 배열을 map + key로 반복 렌더</p>
<iframe class="cr__frame cr__frame--short" src="/REACT/demo/react-basics/#/lab/embed/jsx-comments" loading="lazy" title="map 렌더 결과"></iframe>
</div>
</div>

??? note "👉 직접 따라 하기 — 어느 파일을 어떻게 고치면 이 화면이 나오나"
    **① 컴포넌트 파일** — `src/pages/step02-component/Comment.jsx` 와 `src/pages/step02-component/CommentList.jsx` 에 위 코드를 저장합니다.

    **② `src/index.js` 수정** — `import` 한 줄을 추가하고, `<App />` 대신 `<CommentList />`를 렌더합니다.

    ```jsx
    import CommentList from './pages/step02-component/CommentList';   // ← 추가
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <CommentList />    {/* ← 이 줄이 화면에 뜬다 */}
        {/* <App /> */}    {/* ← 전체 앱은 잠시 끔 */}
      </React.StrictMode>
    );
    ```

    **③ 실행** — 터미널에서 `npm start` → 브라우저 `http://localhost:3000`

    **④ 결과** — 배열의 댓글들이 `map`+`key`로 카드 목록으로 반복 렌더됩니다.

> "원래는 Spring에서 정보를 가져와야 한다" — 실제 데이터는 백엔드에서. (→ [연동 편](../integration/react-springboot-jwt-flow.md))

### Item — props 구조분해
```jsx
export default function Item({ title, content }) {   // = props.title, props.content
  return <ul><li>과목 : {title}</li><li>내용 : {content}</li></ul>;
}
```

---
### 다음 단계
- [React 03 — state와 배열 렌더링 기법](03-state-list-events.md)
