# 원본 자료 수집 범위

정제 노트는 Notion 링크가 없어져도 읽을 수 있도록 저장소 안에서 완결되게 작성했습니다. 추출 당시 원문 Markdown도 [`docs/archive/notion-raw/`](https://github.com/notetester/REACT/tree/main/docs/archive/notion-raw)에 별도로 보존합니다.

| 원본 필기 | 보존 원문 | 정제 노트 |
|---|---|---|
| React Day01 이론 | [react-day01-theory.md](../archive/notion-raw/react-day01-theory.md) | [React 01~04](../react/01-intro-setup.md) |
| React Day01 실습 | [react-day01-practice.md](../archive/notion-raw/react-day01-practice.md) | [React 01~04](../react/01-intro-setup.md) |
| React Day02 실습 | [react-day02-practice.md](../archive/notion-raw/react-day02-practice.md) | [React 05~09](../react/05-hooks.md) |
| React Hook | [react-hook-theory.md](../archive/notion-raw/react-hook-theory.md) | [React 05](../react/05-hooks.md) |
| React Context | [react-context-theory.md](../archive/notion-raw/react-context-theory.md) | [React 06](../react/06-context.md) |
| useReducer | [react-usereducer-theory.md](../archive/notion-raw/react-usereducer-theory.md) | [React 07](../react/07-usereducer.md) |
| Zustand 1 | [react-zustand-1.md](../archive/notion-raw/react-zustand-1.md) | [React 10](../react/10-zustand-basics.md) |
| Zustand 2 | [react-zustand-2.md](../archive/notion-raw/react-zustand-2.md) | [React 11](../react/11-zustand-auth-crud.md) |
| Spring Boot Day01 | [springboot-day01.md](../archive/notion-raw/springboot-day01.md) | [Spring Boot 01](../springboot/01-intro-architecture.md) |
| Spring Security | [springboot-day02-security.md](../archive/notion-raw/springboot-day02-security.md) | [Spring Boot 02](../springboot/02-spring-security.md) |
| Spring Boot JWT | [springboot-day02-jwt.md](../archive/notion-raw/springboot-day02-jwt.md) | [Spring Boot 03](../springboot/03-jwt.md) |

React Day03는 별도 텍스트 추출본이 남아 있지 않아 로컬 `my-app01`의 `step15~18` 코드를 기준으로 Router, Fetch, Axios 노트를 복원했습니다. Zustand 2는 이미지 중심 원본이라 이미지와 실제 `my-app02` 코드를 함께 대조했습니다.

## 실습 코드 수집 범위

| 로컬 원본 | 저장소 보존 위치 |
|---|---|
| `D:\dev\my-app01` | [`code/react/01-basics-my-app01`](https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01) |
| `D:\dev\my-app02` | [`code/react/02-zustand-my-app02`](https://github.com/notetester/REACT/tree/main/code/react/02-zustand-my-app02) |
| `D:\dev\my-app03` | [`code/react/03-integration-my-app03`](https://github.com/notetester/REACT/tree/main/code/react/03-integration-my-app03) |
| `D:\dev\springboot\MyProject01` | [`code/springboot/01-jwt-MyProject01`](https://github.com/notetester/REACT/tree/main/code/springboot/01-jwt-MyProject01) |
| `D:\dev\springboot\MyProject02` | [`code/springboot/02-integration-MyProject02`](https://github.com/notetester/REACT/tree/main/code/springboot/02-integration-MyProject02) |

보존 코드에는 재현성을 높이기 위한 DB 초기화 SQL, 환경변수 폴백, 테스트 호환성 수정과 보안 보강이 추가되어 있습니다.

원본 강의 이후의 최신 공식 문서 대조와 추가 학습 경로는 [최신 공식 문서 감수 기록](official-reference-audit.md), [React 12](../react/12-modern-react-roadmap.md), [Spring Boot 04](../springboot/04-rest-api-quality.md), [최종 홈페이지 로드맵](../integration/final-homepage-roadmap.md)에 정리했습니다.
