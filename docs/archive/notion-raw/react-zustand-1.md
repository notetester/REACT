# [RAW] Zustand (1) — 출처: 강사 Notion (360b3824...3685)

Title: Zustand(1) | Notion
URL: https://www.notion.so/Zustand-1-360b382469f48007ba1ef3bda5b23685
(코드 전문은 로컬 my-app02 에 존재. 핵심 패턴/주석 위주 보존. 글로벌 다크테마 App.css 전문 포함됨)

---

## 프로젝트 셋업
- pages/: HomePage, LoginPage, MemoPage, ProfilePage, TodoPage (같은 형태 골격)
- components/Navbar.jsx
- App.jsx: BrowserRouter + Routes로 /, /todo, /memo, /profile, /login 연결. App.css 내용은 비우고 새로 작성.

## 글로벌 다크테마 (App.css) — 핵심 토큰
- `*` reset(box-sizing/margin/padding 0), body font 'Segoe UI' 15px
- input/textarea: padding 8/12, radius 6, border #334155, bg #1e293b, color #e2e8f0, focus border #6366f1, width 100%
- button: bg #6366f1(인디고), hover #4f46e5, danger #ef4444/#dc2626, ghost(투명+테두리), sm(작게)
- 레이아웃: .app(min-height 100vh, bg #020c1b), .page(padding 40/32), .row(flex gap8), .col(flex column gap12), .ml-auto
- 카드: .card(radius12, border #1e293b, bg #0f1f35)
- 텍스트: .muted(#94a3b8), .empty(#475569, center, padding32)
- nav: flex, gap20, padding14/28, border-bottom, bg #0f172a, sticky top0 z100, color white bold
- nav a.active: color #6366f1 bold, .nav-logo: #6366f1 bold 16px

## Zustand 기본 (Counter 예제)
import { create } from 'zustand'
const useCounterStore = create((set) => ({
  count: 0,                                              // 상태(State)
  increment: () => set((state) => ({ count: state.count + 1 })),  // 액션: 이전 상태 필요 → 함수형 set
  reset: () => set({ count: 0 }),                        // 이전 상태 불필요 → set({key:값})
}))
- 컴포넌트에서: `const { count, increment, reset } = useCounterStore()` → useState처럼 자동 리렌더링.

## persist 미들웨어 — useAuthStore.jsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
const useAuthStore = create(persist(
  (set) => ({
    user: null,        // { username, bio } | null
    isLoggedIn: false,
    login: (username) => set({ user: { username, bio: '' }, isLoggedIn: true }),
    logout: () => set({ user: null, isLoggedIn: false }),
    updateProfile: (fields) => set((state)=>({ user: { ...state.user, ...fields } })),  // 스프레드로 일부만 변경
  }),
  { name: 'auth-storage' }   // localStorage 키 이름
))
- persist로 감싸면 localStorage에 자동 저장.

## Navbar.jsx — 조건부 렌더링 + NavLink
- `const {isLoggedIn, logout} = useAuthStore();`
- `const cls = ({isActive}) => isActive ? 'active' : ''` (NavLink는 현재 경로면 isActive=true 제공)
- `{isLoggedIn && <NavLink to="/profile">프로필</NavLink>}` 로그인 시에만 노출
- 로그아웃 버튼도 `{isLoggedIn && <button onClick={logout}>로그아웃</button>}`

## LoginPage.jsx
- `const {login} = useAuthStore(); const navigate = useNavigate();`
- handleLogin: `if(!input.trim()) return; login(input); navigate('/')`
- input: onChange로 setInput, `onKeyDown={(e)=> e.key==='Enter' && handleLogin()}`
- 교육 포인트: `onClick={handleLogin}`(함수 참조, 이벤트 시 실행) vs `handleLogin()`(즉시 호출) 구분
