# 최신 공식 문서 감수 기록

이 페이지는 원본 강의 노트를 보존하면서, 현재 공식 문서 기준으로 어떤 내용을 보강했는지 기록합니다.

## 2026-06-02 감수

감수일 기준 공식 사이트에서 확인한 안정 문서 축은 React `19.2`, Spring Boot `4.0.6`, Spring Framework `7.0.7`, Spring Security `7.0.5`입니다. 저장소 코드는 Spring Boot `4.0.6`과 Java 21을 사용합니다.

| 영역 | 확인한 공식 자료 | 교재 반영 |
|---|---|---|
| React 시작 방법 | [Creating a React App](https://react.dev/learn/start-a-new-react-project), [CRA 지원 종료](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) | CRA는 기존 강의 복습용으로 보존하고, 신규 앱은 프레임워크 또는 Vite 계열을 우선 검토하도록 분리 |
| React 상태 | [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure), [Updating Objects](https://react.dev/learn/updating-objects-in-state), [Updating Arrays](https://react.dev/learn/updating-arrays-in-state) | 중복 state 방지, 불변 업데이트, 평평한 상태 구조 추가 |
| React Effect | [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects), [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect), [`<StrictMode>`](https://react.dev/reference/react/StrictMode) | Effect를 외부 시스템 동기화로 설명하고 cleanup, 개발 모드 재실행, 불필요한 Effect 제거 기준 추가 |
| Spring Boot 버전 | [Spring Boot System Requirements](https://docs.spring.io/spring-boot/system-requirements.html) | 현재 코드의 Spring Boot `4.0.6`, Java 17 이상 요구사항, 교재의 Java 21 선택 명시 |
| Spring 설정 | [Externalized Configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) | YAML 기본값, 환경변수 덮어쓰기, Actions H2 profile 역할 정리 |
| Spring MVC 입력 | [`@RequestBody`](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html), [Validation](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-validation.html) | Request DTO, `@Valid`, Bean Validation, 400 응답 학습 경로 추가 |
| Spring MVC 오류 | [Error Responses](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html) | `DataVO` 다음 단계로 RFC 9457 `ProblemDetail`과 전역 오류 처리 소개 |
| Spring Security CORS | [CORS](https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html) | preflight와 필터 순서 설명 보강 |
| Spring Security CSRF | [CSRF](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html) | JWT 자체가 CSRF를 제거하지 않으며 저장·전송 방식에 따라 방어가 달라짐을 명시 |
| 비밀번호 저장 | [Password Storage](https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html) | BCrypt 단방향 적응형 해시와 토큰의 역할 구분 보강 |

## 교재의 의도적인 경계

| 현재 선택 | 이유 | 다음 확장 |
|---|---|---|
| CRA 기반 React 실습 | 원본 강의 코드와 단계별 화면 보존 | Vite로 동일 화면 재구성 |
| `DataVO` 공통 래퍼 | REST 응답 구조를 처음 익히기 쉬움 | `ResponseEntity`, `ProblemDetail` |
| VO를 일부 요청에도 사용 | 레이어 흐름을 짧게 관찰 | Request/Response DTO 분리 |
| localStorage 토큰 | 인터셉터와 재발급 흐름을 관찰 | HTTPS, CSP, 저장 전략 재설계 |
| 로컬 Oracle XE | 원본 최종 연동 환경 보존 | 외부 배포 DB와 Secret Manager |
| Actions H2 snapshot | 무거운 Oracle 없이 API 시나리오 자동 재현 | 별도 Oracle 통합 환경 |

## 읽는 순서

1. 원본 흐름: React 01~11 → Spring Boot 01~03 → 연동 흐름
2. 최신 보강: [React 12](../react/12-modern-react-roadmap.md) → [Spring Boot 04](../springboot/04-rest-api-quality.md)
3. 직접 완성: [최종 홈페이지 로드맵](../integration/final-homepage-roadmap.md)
