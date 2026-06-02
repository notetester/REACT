# 📚 React + Spring Boot 풀스택 학습 아카이브

React 기초부터 **Spring Boot + JWT 백엔드 연동**까지, 강의 필기와 실습 코드를 하나로 정리한 학습 자료입니다.
정제된 **학습 노트([`docs/`](docs/))** 와 **실습 코드([`code/`](code/))** 를 함께 보며 이론·흐름을 따라갈 수 있도록 구성했습니다.

> 필기(Notion)와 실습 코드를 분석·취합·보강하여 작성했습니다. 강사 노트의 다이어그램/스크린샷은 [`docs/assets/img/`](docs/assets/img/)에 원본 그대로 보존했습니다.
> 추출한 원문 Markdown도 [`docs/archive/notion-raw/`](docs/archive/notion-raw/)에 보존했습니다. 취합 범위는 [`docs/reference/source-coverage.md`](docs/reference/source-coverage.md)에서 확인할 수 있습니다.

---

## 🗺️ 학습 로드맵

```mermaid
flowchart TD
  subgraph R["① React 기초 (my-app01)"]
    R1[JSX·컴포넌트·props] --> R2[state·배열렌더] --> R3[이벤트·조건부·form]
    R3 --> R4[Hooks] --> R5[Context·useReducer] --> R6[Router·Fetch·Axios]
  end
  subgraph Z["② 상태관리 (my-app02)"]
    Z1[Zustand 기초] --> Z2[인증·로그인흐름·CRUD]
  end
  subgraph S["③ 백엔드 (MyProject01)"]
    S1[Spring Boot 구조·MyBatis] --> S2[Spring Security] --> S3[JWT]
  end
  subgraph I["④ 풀스택 연동 (my-app03 ↔ MyProject02)"]
    I1[Axios 인터셉터 + JWT] --> I2[로그인·토큰 재발급·CRUD]
  end
  R --> Z --> S --> I
```

## 🏛️ 전체 아키텍처 (최종 응용)

```mermaid
flowchart LR
  subgraph FE["React (localhost:3000)"]
    UI[페이지/컴포넌트] --> ST[Zustand]
    UI --> AX[Axios + 인터셉터]
    AX <--> LS[(localStorage 'tokens')]
  end
  subgraph BE["Spring Boot (localhost:8080)"]
    FCH[SecurityFilterChain<br/>CORS · STATELESS] --> JF[JwtRequestFilter]
    JF --> CT[Controller] --> SV[Service] --> MP[MyBatis] --> DB[(DB)]
  end
  AX -- "Authorization: Bearer accessToken" --> FCH
```

자세한 흐름 → **[★ React ↔ Spring Boot JWT 연동 흐름](docs/integration/react-springboot-jwt-flow.md)**

---

## 📖 목차 — 노트 ↔ 코드

### React
| # | 학습 노트 | 실습 코드 |
|---|-----------|-----------|
| 01 | [소개·설치·구조](docs/react/01-intro-setup.md) | [my-app01](code/react/01-basics-my-app01) |
| 02 | [JSX·컴포넌트·props](docs/react/02-jsx-components.md) | `step01~02` |
| 03 | [state·배열 고차메서드](docs/react/03-state-list-events.md) | `step03~04` |
| 04 | [조건부·이벤트·CSS·props·form](docs/react/04-events-forms.md) | `step05~10` |
| 05 | [Hooks](docs/react/05-hooks.md) | `step11-hook` |
| 06 | [Context API](docs/react/06-context.md) | `step12~13` |
| 07 | [useReducer](docs/react/07-usereducer.md) | `step14-Reducer` |
| 08 | [React Router](docs/react/08-router.md) | `step15~16` |
| 09 | [Fetch·Axios](docs/react/09-fetch-axios.md) | `step17~18` |
| 10 | [Zustand 기초](docs/react/10-zustand-basics.md) | [my-app02](code/react/02-zustand-my-app02) |
| 11 | [Zustand 인증·CRUD](docs/react/11-zustand-auth-crud.md) | [my-app02](code/react/02-zustand-my-app02) |

### Spring Boot
| # | 학습 노트 | 실습 코드 |
|---|-----------|-----------|
| 01 | [구조·레이어드·MyBatis](docs/springboot/01-intro-architecture.md) | [MyProject01](code/springboot/01-jwt-MyProject01) |
| 02 | [Spring Security](docs/springboot/02-spring-security.md) | [MyProject01](code/springboot/01-jwt-MyProject01) |
| 03 | [JWT](docs/springboot/03-jwt.md) | [MyProject01](code/springboot/01-jwt-MyProject01) |

### 🔗 연동 (최종 응용)
| 학습 노트 | 실습 코드 |
|-----------|-----------|
| [★ React ↔ Spring Boot JWT 연동 흐름](docs/integration/react-springboot-jwt-flow.md) | [my-app03](code/react/03-integration-my-app03) ↔ [MyProject02](code/springboot/02-integration-MyProject02) |

---

## 🧰 기술 스택

| 영역 | 스택 |
|------|------|
| Frontend | React 19, React Router v6, Zustand 5, Axios, MUI (CRA / react-scripts) |
| Backend | Spring Boot, Spring Security, JWT(jjwt 0.11.5), MyBatis, Java 21, Gradle |
| DB | MySQL(MyProject01) / Oracle(MyProject02) |

## 📁 폴더 구조
```
REACT/
├── docs/                       # 학습 노트 (이 문서들)
│   ├── react/        01~11
│   ├── springboot/   01~03
│   ├── integration/  연동 흐름
│   ├── guide/        로컬 실행·시크릿
│   ├── reference/    취합 범위·이미지·정오표
│   ├── archive/      추출 당시 원문 Markdown
│   └── assets/img/   강사 노트 원본 캡처(다이어그램·스크린샷)
├── code/                       # 실습 코드 (소스만, node_modules 제외)
│   ├── react/        01-basics / 02-zustand / 03-integration
│   └── springboot/   01-jwt / 02-integration
└── .github/workflows/          # CI · GitHub Pages · 데모 배포
```

## ▶️ 로컬 실행
```bash
# React (각 my-app 폴더에서)
npm install && npm start          # http://localhost:3000

# Spring Boot (각 MyProject 폴더에서)
./gradlew bootRun                 # http://localhost:8080
```
> 연동 실행은 백엔드(8080) 먼저 기동 후 프론트(3000)를 실행하세요. DB 초기화 SQL, 접속 정보와 환경변수는 **[로컬 실습 실행 가이드](docs/guide/01-local-setup.md)** 에 정리했습니다.

## ⚠️ 보안 주의
실습 코드에는 클론 직후 실행을 위한 **localhost 전용 기본값**이 있습니다. 외부 환경에서는 `DB_PASSWORD`, `JWT_SECRET` 환경변수나 GitHub Actions Repository secrets로 덮어써야 합니다. 자세한 구분은 **[실습용 시크릿과 GitHub Actions](docs/guide/02-security-and-actions-secrets.md)** 를 참고하세요.

## 🙏 출처
강의 필기(Notion)와 실습 코드를 학습 목적으로 분석·정리·보강한 자료입니다. 다이어그램·스크린샷의 원저작권은 원 강의에 있습니다.
