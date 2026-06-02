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

현재 CI는 선택적으로 `CI_JWT_SECRET`을 사용합니다. 등록하지 않아도 localhost 전용 폴백으로 빌드와 테스트가 동작합니다.

```text
CI_JWT_SECRET = 충분히 긴 임의 문자열
```

향후 실제 DB를 Actions에서 연결할 때만 `CI_DB_URL`, `CI_DB_USERNAME`, `CI_DB_PASSWORD` 같은 별도 시크릿을 추가합니다. 현재 CI는 DB 연결 없이 애플리케이션 컨텍스트를 검증하므로 DB 시크릿을 요구하지 않습니다.

## 프론트엔드 주의점

`REACT_APP_*` 값은 빌드 결과물에 포함되어 브라우저에서 읽을 수 있습니다. API 주소처럼 공개 가능한 설정에만 사용하고, DB 비밀번호나 JWT 서명 키를 넣지 않습니다.

이 실습은 토큰을 `localStorage`에 보관해 인터셉터 흐름을 눈에 보이게 학습합니다. 실서비스에서는 XSS 대응, 토큰 저장 위치, CSP, HTTPS, 쿠키 사용 시 CSRF 방어를 별도로 설계해야 합니다.

