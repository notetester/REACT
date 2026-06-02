# 실습용 시크릿과 GitHub Actions

## 원칙

이 저장소는 클론 직후 로컬 실습이 가능해야 하므로 `application.yaml`에 localhost 전용 기본값을 둡니다. 동시에 모든 값은 환경변수로 교체할 수 있습니다.

```yaml
password: ${DB_PASSWORD:1111}
jwt:
  secret: ${JWT_SECRET:learning-only-local-jwt-secret-32bytes}
```

콜론 뒤 값은 환경변수가 없을 때만 쓰는 학습용 기본값입니다.

## GitHub Repository secrets가 해결하는 범위

GitHub 저장소의 `Settings → Secrets and variables → Actions → Repository secrets`는 Actions 실행 환경에만 주입됩니다. 로컬에서 클론한 앱이나 GitHub Pages 브라우저 코드에는 자동 전달되지 않습니다.

현재 CI는 선택적으로 `CI_JWT_SECRET`을 사용합니다. 등록하지 않아도 CI 전용 폴백으로 빌드와 테스트가 동작합니다.

```text
CI_JWT_SECRET = 충분히 긴 임의 문자열
```

## Actions에서 DB는 어떻게 검증하나요?

GitHub-hosted runner는 개발 PC의 localhost DB에 접근하지 않습니다. 대신 CI가 실행될 때만 임시 MySQL 8.4 서비스 컨테이너를 시작합니다.

| CI 작업 | 검증 범위 |
|---|---|
| React 3개 | `npm ci`, 테스트, production build |
| Spring Boot 2개 | 컴파일, `contextLoads`, Gradle build |
| MyProject01 MySQL smoke | 임시 MySQL 시작, 스키마 초기화, Spring Boot 실행, `GET /guestbook/list` 실제 호출 |
| MyProject02 H2 snapshot | 임시 H2 Oracle mode 시작, 회원가입·로그인·JWT 인증·방명록 CRUD 실제 호출 |

MySQL 컨테이너의 비밀번호는 해당 CI 실행이 끝나면 함께 사라지는 학습용 값입니다. Repository secret이 필요하지 않습니다.

MyProject02의 Oracle XE 자체는 CI에 포함하지 않습니다. XE 초기화가 무겁고 Oracle 이미지 준비 과정에 라이선스 확인이 필요하기 때문입니다. 대신 Pages workflow가 `snapshot` 프로필의 H2 메모리 DB에서 실제 Spring Boot API 흐름을 호출합니다. H2는 Oracle XE를 대체하는 운영 DB가 아니라 자동 재현용 보조 환경입니다.

GitHub Pages에는 문서와 React 데모 3개를 배포합니다. `my-app03` 데모는 브라우저 localStorage mock API를 사용하므로 서버와 DB 없이 UI 흐름을 체험할 수 있습니다. 실제 Spring Boot 결과는 [Actions API 스냅샷](../generated/integration-snapshot.md)에서 구분해 확인합니다.

## 프론트엔드 주의점

`REACT_APP_*` 값은 빌드 결과물에 포함되어 브라우저에서 읽을 수 있습니다. API 주소처럼 공개 가능한 설정에만 사용하고, DB 비밀번호나 JWT 서명 키를 넣지 않습니다.

이 실습은 토큰을 `localStorage`에 보관해 인터셉터 흐름을 눈에 보이게 학습합니다. 실서비스에서는 XSS 대응, 토큰 저장 위치, CSP, HTTPS, 쿠키 사용 시 CSRF 방어를 별도로 설계해야 합니다.
