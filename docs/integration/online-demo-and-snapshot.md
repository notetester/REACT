# 온라인 mock 데모와 Actions API 스냅샷

최종 연동 실습은 목적에 따라 세 가지 환경으로 나뉩니다.

| 환경 | DB | 목적 | 확인 위치 |
|---|---|---|---|
| GitHub Pages mock 데모 | 브라우저 `localStorage` | 설치 없이 React 화면과 CRUD 흐름 체험 | [온라인 integration 데모](/REACT/demo/integration/) |
| GitHub Actions API 스냅샷 | 임시 H2 메모리 DB | Spring Security + JWT + MyBatis API가 실제로 동작하는지 자동 재현 | [Actions API 실행 결과](../generated/integration-snapshot.md) |
| 로컬 최종 실습 | Oracle XE 21c | 강의 코드의 실제 DB 연결과 프론트·백엔드 연동 학습 | [로컬 실행 가이드](../guide/01-local-setup.md) |

## 1. GitHub Pages mock 데모

[온라인 integration 데모](/REACT/demo/integration/)는 정적 파일만 제공하는 GitHub Pages에서 실행됩니다. Pages는 Spring Boot나 Oracle XE 프로세스를 실행할 수 없으므로, 이 빌드에서만 `REACT_APP_API_MODE=mock`을 설정합니다.

```text
React UI → api/Auth.jsx 또는 api/GuestBook.jsx
         → REACT_APP_API_MODE=mock 이면 api/mock/*
         → localStorage
```

- 학습 계정: `study` / `1111`
- 회원가입, 로그인, 프로필 수정, 회원탈퇴, 방명록 CRUD를 브라우저에서 체험할 수 있습니다.
- mock 데이터는 브라우저별로 저장되며 실제 서버나 DB로 전송되지 않습니다.
- localStorage 키는 `react-spring-demo-*` 네임스페이스를 사용합니다.

!!! warning "mock은 백엔드 검증이 아닙니다"
    온라인 데모는 UI 흐름을 쉽게 살펴보기 위한 보조 수단입니다. Spring Security 필터, JWT 검증, MyBatis SQL은 실행하지 않습니다.

## 2. GitHub Actions API 스냅샷

Pages 배포 workflow는 `MyProject02`를 `snapshot` 프로필로 실행합니다.

```text
MyProject02 → H2 mem DB (Oracle mode)
            → register → login → list → insert → update → delete
            → 마스킹된 JSON artifact + Markdown 문서
```

H2는 Actions job이 끝나면 사라지는 임시 DB입니다. 기본 Oracle 설정을 덮어쓰지 않습니다. JWT 문자열은 공개 문서와 artifact에서 마스킹합니다.

- 최신 문서: [Actions API 실행 결과](../generated/integration-snapshot.md)
- 원본 JSON: GitHub Actions의 `integration-api-results` artifact
- 생성 스크립트: [`scripts/generate-integration-snapshot.sh`](https://github.com/notetester/REACT/blob/main/scripts/generate-integration-snapshot.sh)

## 3. 로컬 Oracle XE 최종 실습

실제 연동 학습에서는 기본값 그대로 `MyProject02`와 `my-app03`을 실행합니다. 이때 `REACT_APP_API_MODE`를 설정하지 않습니다.

```bash
cd code/springboot/02-integration-MyProject02
./gradlew bootRun

cd code/react/03-integration-my-app03
npm ci
npm start
```

Oracle XE 설치와 초기화는 [Windows 로컬 DB 설치](../guide/02-local-db-setup.md)를 먼저 따라갑니다.
