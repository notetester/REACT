# React 02 — JSX와 컴포넌트, props, 리스트 렌더링

> 실습 코드: [`my-app01/src/pages/step01-jsx`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step01-jsx) · [`step02-component`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages/step02-component)

---

## 바로 확인하는 실행 결과

props로 전달한 값이 책 정보로 표시되고, 배열 데이터가 댓글 카드 목록으로 반복 렌더링됩니다.

<div class="react-live-preview">
  <iframe class="react-live-frame" src="/REACT/demo/react-basics/#/lab/jsx-components" title="JSX 컴포넌트 props 실행 결과" loading="lazy"></iframe>
</div>

<p class="react-live-links"><a href="/REACT/demo/react-basics/#/lab/jsx-components" target="_blank" rel="noopener">↗ 새 탭에서 크게 보기</a></p>

## 1. step01 — 첫 컴포넌트와 props

**props(properties)**: 부모가 자식에게 전달하는 데이터. (단방향)

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
