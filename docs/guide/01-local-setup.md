# 로컬 실습 실행 가이드

이 저장소는 링크가 사라져도 다시 따라 할 수 있도록 코드, 노트, 이미지와 DB 초기화 SQL을 함께 보존합니다.

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

빈 DB에서 [`mysql-init.sql`](https://github.com/notetester/REACT/blob/main/code/springboot/01-jwt-MyProject01/db/mysql-init.sql)을 한 번 실행한 뒤:

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

빈 DB에서 [`oracle-init.sql`](https://github.com/notetester/REACT/blob/main/code/springboot/02-integration-MyProject02/db/oracle-init.sql)을 한 번 실행한 뒤 백엔드와 프론트를 순서대로 실행합니다.

```bash
cd code/springboot/02-integration-MyProject02
./gradlew bootRun

cd code/react/03-integration-my-app03
npm ci
npm start
```

`my-app03`은 기본적으로 `http://localhost:8080`을 호출합니다. 다른 주소가 필요하면 `.env.example`을 참고해 `.env.development`에 `REACT_APP_API_BASE_URL`을 설정합니다.

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

