# [RAW] React Hook (이론) — 출처: 강사 Notion (359b3824...83b3)

Title: React-Hook (이론) | Notion
URL: https://www.notion.so/React-Hook-359b382469f480198c20c21e6b4883b3

---

React-Hook (이론)
배경: 원래 React도 클래스 기반이었음. 발전하면서 함수형 컴포넌트 사용 시작.
클래스 컴포넌트에서 쓰던 기능이 함수형에서 제한 → 이를 해결하려고 hook 도입.
즉, hook은 함수형 컴포넌트에서 React 기능을 "갈고리처럼 끌어다 쓰는 함수".
규칙: 이름 useXXXX로 시작, 함수형 컴포넌트 전용, **반드시 컴포넌트 최상단에서만 호출**.

1. useState — 상태관리
   const [상태값, 상태변경함수(set함수)] = useState(초기값)
   set함수로 상태값 변경 시 컴포넌트가 자동 리렌더링.

2. useEffect — 사이드 이펙트 처리
   사이드 이펙트 = 렌더링 외의 작업(서버 데이터 가져오기, DOM 수정 등)
   useEffect(()=>{ /* 실행 코드 */ }, [의존성배열]);
   - 의존성배열 생략 → 렌더링 될 때마다 실행
   - [] → 최초 1회만 실행
   - [특정값] → 특정값 변경될 때만 실행
   React 생명주기:
   - 마운트(처음 나타날 때): 컴포넌트 생성 → useState 초기화 → 렌더링 → useEffect 실행
   - 업데이트(state/props 변경): 변경 → 리렌더링
   - 언마운트(컴포넌트 제거)

3. useMemo — 계산 결과 캐싱(메모이제이션)
   값을 다시 계산하지 말고 이전 계산값 재사용(불필요한 재계산 방지)
   const cachedValue = useMemo(()=>{ return 계산할_내용 }, [의존성배열])
   용도: 무거운 계산(반복문/정렬/필터), 부모→자식 props 복잡한 값(자식 불필요 리렌더 방지)

4. useCallback — 함수 자체를 캐싱
   useMemo는 계산된 "값"을 캐싱, useCallback은 "함수"를 캐싱.
   자식 컴포넌트에 함수 전달 시 사용.

5. useRef — 값을 저장하는 상자 (값이 바뀌어도 리렌더링 안 함)
   용도: DOM 직접 접근, 리렌더 없이 값 보관, 이전값 기억, 타이머

6. useId — 고유 ID 자동 생성
   같은 컴포넌트를 여러 번 써도 ID 안 겹침.
   label의 htmlFor와 input의 id가 같으면 → label 클릭 시 input에 자동 포커스
