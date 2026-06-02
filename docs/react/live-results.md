# React 실습 결과 갤러리

React는 화면을 만드는 라이브러리입니다. 코드만 읽지 말고 **결과를 직접 클릭하고 입력하면서** 확인하세요.

아래 탐색기는 `my-app01`에 보존된 단계별 실습 컴포넌트를 실제로 실행합니다. 상단 탭을 누르면 JSX·props부터 Context API와 `useReducer`까지 결과가 바뀝니다. 각 결과의 **GitHub에서 코드 보기** 링크를 열면 실행 중인 컴포넌트의 소스 폴더를 함께 볼 수 있습니다.

<div class="react-live-preview">
  <iframe
    class="react-live-frame react-live-frame--tall"
    src="/REACT/demo/react-basics/#/lab"
    title="React 단계별 실습 결과 탐색기"
    loading="lazy">
  </iframe>
</div>

<p class="react-live-links">
  <a href="/REACT/demo/react-basics/#/lab" target="_blank" rel="noopener">↗ 결과 탐색기를 새 탭에서 크게 보기</a>
</p>

## 어떻게 사용하나요?

1. 먼저 각 React 노트의 설명과 핵심 코드를 읽습니다.
2. 노트 상단의 라이브 결과에서 버튼, 입력창, 체크박스를 직접 조작합니다.
3. 탐색기의 **GitHub에서 코드 보기**를 눌러 화면과 소스를 나란히 비교합니다.
4. 로컬에서 같은 코드를 실행한 뒤 문구, 초기값, 조건을 바꾸어 결과를 예상해 봅니다.

| 노트 | 탐색기 탭 | 확인할 변화 |
|------|-----------|-------------|
| [React 02](02-jsx-components.md) | JSX · 컴포넌트 · props · map | props에 따라 책 정보가 달라지고, 배열이 댓글 카드로 반복 렌더링됩니다. |
| [React 03](03-state-list-events.md) | state · 배열 고차 메서드 | 카운터 버튼을 누르면 화면의 숫자가 바뀌고, `filter` 결과만 남습니다. |
| [React 04](04-events-forms.md) | 조건부 렌더링 · 이벤트 · CSS · form | 토글, 사용자 전환, 체크박스를 조작하면 화면이 즉시 바뀝니다. |
| [React 05](05-hooks.md) | Hooks · useEffect 의존성 | 두 state를 바꾸며 Console의 Effect 로그 차이를 확인합니다. |
| [React 06](06-context.md) | Context API · 테마 공유 | `Mode` 버튼 하나로 여러 하위 영역의 테마가 함께 바뀝니다. |
| [React 07](07-usereducer.md) | useReducer · 은행 상태 변경 | 예금·출금 action이 reducer를 거쳐 잔고 state를 변경합니다. |
| [React 08](08-router.md) | Router · Axios 데모 | 주소가 바뀌어도 전체 페이지 새로고침 없이 화면이 전환됩니다. |
| [React 09](09-fetch-axios.md) | Axios02 | 외부 API에서 받은 영화 목록과 상세 링크가 렌더링됩니다. |
| [React 10~11](10-zustand-basics.md) | Zustand 데모 | 로그인, Todo, 메모, 프로필 데이터가 `localStorage`에 유지됩니다. |

!!! note "정적 Pages에서도 동작하는 이유"
    이 갤러리는 GitHub Pages에 함께 배포한 React 빌드입니다. JSX를 브라우저에서 즉석 컴파일하는 것이 아니라, Actions가 미리 빌드한 정적 JavaScript가 실제 컴포넌트를 렌더링합니다.

