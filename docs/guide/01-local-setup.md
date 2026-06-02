# 로컬 실습 실행 가이드

이 저장소는 링크가 사라져도 다시 따라 할 수 있도록 코드, 노트, 이미지와 DB 초기화 SQL을 함께 보존합니다.

!!! warning "Spring Boot 실행 전 확인"
    새 PC라면 먼저 [Windows 로컬 DB 설치와 초기화](02-local-db-setup.md)를 따라 MySQL 또는 Oracle XE를 준비합니다. 아래 명령은 DB가 이미 설치되어 있다는 전제입니다.

## 1. 프론트 단독 실습

```bash
cd code/react/01-basics-my-app01
npm ci
npm start

cd code/react/02-zustand-my-app02
npm ci
npm start
```

- `01-basics-my-app01`: JSX부터 Router, Fetch, Axios까지 단계별 예제
- `02-zustand-my-app02`: Zustand 로그인, Todo, Memo, Profile 예제

## 2. MyProject01: MySQL + JWT

기본값은 로컬 학습용입니다.

| 항목 | 기본값 |
|---|---|
| DB URL | `jdbc:mysql://localhost:3306/dbstudy?...` |
| DB 사용자 | `dbuser` |
| DB 비밀번호 | `1234` |
| 로그인 실습 계정 | `study` / `1111` |

관리자 계정으로 [`mysql-init.sql`](https://github.com/notetester/REACT/blob/main/code/springboot/01-jwt-MyProject01/db/mysql-init.sql)을 한 번 실행한 뒤:

```bash
cd code/springboot/01-jwt-MyProject01
./gradlew bootRun
```

## 3. MyProject02 + my-app03: Oracle 연동

| 항목 | 기본값 |
|---|---|
| DB URL | `jdbc:oracle:thin:@localhost:1521:xe` |
| DB 사용자 | `c##dbuser` |
| DB 비밀번호 | `1111` |
| 로그인 실습 계정 | `study` / `1111` |

`SYSTEM` 계정으로 [`oracle-create-user.sql`](https://github.com/notetester/REACT/blob/main/code/springboot/02-integration-MyProject02/db/oracle-create-user.sql)을 실행하고, 생성된 `c##dbuser` 계정으로 [`oracle-init.sql`](https://github.com/notetester/REACT/blob/main/code/springboot/02-integration-MyProject02/db/oracle-init.sql)을 한 번 실행합니다. 이후 백엔드와 프론트를 순서대로 실행합니다.

```bash
cd code/springboot/02-integration-MyProject02
./gradlew bootRun

cd code/react/03-integration-my-app03
npm ci
npm start
```

`my-app03`은 기본적으로 `http://localhost:8080`을 호출합니다. 다른 주소가 필요하면 `.env.example`을 참고해 `.env.development`에 `REACT_APP_API_BASE_URL`을 설정합니다.

GitHub Pages의 [온라인 integration 데모](/REACT/demo/integration/)는 설치 없이 UI 흐름을 둘러보기 위한 localStorage mock입니다. 로컬 Oracle 연동을 실습할 때는 `REACT_APP_API_MODE`를 설정하지 않습니다.

## 4. 환경변수로 기본값 덮어쓰기

두 Spring Boot 앱은 다음 값을 환경변수로 덮어쓸 수 있습니다.

| 환경변수 | 역할 |
|---|---|
| `DB_URL` | JDBC URL |
| `DB_USERNAME` | DB 사용자 |
| `DB_PASSWORD` | DB 비밀번호 |
| `JWT_SECRET` | HS256 서명 키, 32바이트 이상 |
| `JWT_ACCESS_TOKEN_VALIDITY` | Access Token 수명(ms) |
| `JWT_REFRESH_TOKEN_VALIDITY` | Refresh Token 수명(ms) |

로컬 기본값은 실습 편의를 위한 값입니다. 외부 서버, 공유 DB, 실제 계정에는 재사용하지 않습니다.

## 5. 자동 검증 환경과 로컬 DB의 차이

GitHub Actions는 사용자의 로컬 DB에 연결하지 않습니다.

| 자동 검증 | DB | 검증 범위 |
|---|---|---|
| MyProject01 smoke | Actions MySQL 서비스 컨테이너 | DB 초기화와 조회 API |
| MyProject02 snapshot | Actions H2 메모리 DB, Oracle mode | 회원가입·로그인·JWT 인증·방명록 CRUD |

MyProject02의 로컬 기본값은 여전히 Oracle XE입니다. Actions H2는 문서용 실행 결과를 만들기 위한 임시 프로필입니다. 최신 결과는 [Actions API 실행 스냅샷](../generated/integration-snapshot.md)에서 확인합니다.
