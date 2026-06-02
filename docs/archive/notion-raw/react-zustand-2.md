# [RAW] Zustand (2) — 출처: 강사 Notion (360b3824...8839) — **이미지 8장 OCR 인식**

Title: Zustand(2) | Notion
URL: https://www.notion.so/Zustand-2-360b382469f4805c9c07c1fbdb798839
본문이 코드/다이어그램 이미지로 구성됨. 이미지 원본: D:\dev\.notion-raw\img\zustand2\zustand2_00~07.png
(번호가 "5","6"으로 이어짐 → Zustand-1에 1~4 이미지 존재 추정)

---

## [img00] 5. Zustand 핵심 개념
- **스토어(Store)란?** 여러 컴포넌트가 함께 사용하는 **전역 상태 보관함**. React의 useState와 유사하지만 어느 컴포넌트에서든 직접 접근 가능.
- **가장 단순한 예제 — 카운터** (예시 코드, 설명용):
  import { create } from 'zustand'
  const useCounterStore = create((set) => ({
    count: 0,                                                   // 상태(State): 보관할 데이터
    increment: () => set((state) => ({ count: state.count + 1 })), // 액션: set()으로 상태 업데이트
    reset: () => set({ count: 0 }),                              // 이전 상태 필요 없으면 set({key:값})
  }))
  export default useCounterStore

## [img01] Counter 컴포넌트 (스토어 소비)
  function Counter() {
    const { count, increment, reset } = useCounterStore()  // 필요한 상태/액션을 꺼내 씀. useState처럼 자동 리렌더링
    return (<div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={reset}>초기화</button>
    </div>)
  }

## [img02] 핵심 문법 정리 (표)
| 문법 | 설명 |
|---|---|
| `create((set) => ({ ... }))` | 스토어 생성 |
| `set({ key: value })` | 상태를 새 값으로 교체 |
| `set((state) => ({ ... }))` | 이전 상태를 참조해서 업데이트 |
| `const { 상태, 액션 } = useStore()` | 스토어 전체 구조 분해 |
| `const x = useStore((state) => state.x)` | 필요한 값만 선택적으로 구독 |

## [img03] ★ Zustand 동작 원리 (다이어그램)
① 컴포넌트(useStore() 호출) ──구독──▶ ② 스토어(전역 상태 보관함)
① 컴포넌트 ──액션 호출(add/toggle/remove)──▶ ② 스토어
② 스토어 ──set()으로 상태 변경──▶ ③ 새로운 State
③ 새로운 State ──자동 리렌더링──▶ ① 컴포넌트 (순환)

## [img04] persist 미들웨어
- persist를 사용하면 스토어의 상태가 **localStorage에 자동 저장**되어 새로고침해도 데이터 유지.
  import { create } from 'zustand'
  import { persist } from 'zustand/middleware'
  const useStore = create(
    persist(
      (set) => ({ /* 상태와 액션 */ }),
      { name: '저장될-키-이름' }   // localStorage에 이 이름으로 저장
    )
  )

## [img05] 6. 스토어 ① — useAuthStore (표) / 파일: src/store/useAuthStore.js
로그인 여부와 사용자 정보를 관리하는 스토어. 앱 전체에서 "지금 로그인되어 있는가?" 확인용.
| 상태/액션 | 타입 | 설명 |
|---|---|---|
| user | 객체 or null | 로그인한 사용자 정보. 로그아웃 시 null |
| isLoggedIn | boolean | 로그인 여부 |
| login(username) | 함수 | 이름을 받아 로그인 처리 |
| logout() | 함수 | 상태 초기화 |
| updateProfile(fields) | 함수 | user 객체의 일부 필드 수정 |

## [img06] useAuthStore.js 전체 코드
  import { create } from 'zustand'
  import { persist } from 'zustand/middleware'
  const useAuthStore = create(
    persist(
      (set) => ({
        user: null,         // 로그인한 사용자 { username, bio }. 미로그인 시 null
        isLoggedIn: false,  // 로그인 여부 플래그
        login: (username) => set({ user: { username, bio: '' }, isLoggedIn: true }),
        logout: () => set({ user: null, isLoggedIn: false }),
        updateProfile: (fields) => set((state) => ({ user: { ...state.user, ...fields } })),
      }),
      { name: 'auth-storage' }   // localStorage 키 이름
    )
  )
  export default useAuthStore

## [img07] ★ 로그인/로그아웃 흐름 (플로우차트)
사용자가 LoginPage 접속 → **isLoggedIn?**
- false(미로그인): 이름 입력 폼 표시 → 이름 입력 후 로그인 버튼 클릭 → **login(username) 호출** → store 업데이트(user={username,bio:''}, isLoggedIn=true) → 홈 화면으로 이동 navigate('/') + Navbar에 프로필 링크·로그아웃 버튼 자동 표시
- true(이미 로그인): 사용자 정보 표시/프로필 편집/로그아웃 버튼 → 로그아웃 버튼 클릭 → **logout() 호출** → user=null, isLoggedIn=false
