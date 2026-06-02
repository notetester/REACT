# [RAW] Spring Boot Day02 - JWT — 출처: 강사 Notion (35db3824...af30)

Title: Day02-JWT | Notion
URL: https://www.notion.so/Day02-JWT-35db382469f48036b68ee61c399baf30
참조: https://jwt.io/
(코드 전문은 로컬 MyProject01 에 존재. ※ application.yaml access-token-validity 값/주석 불일치는 로컬과 교차검증 필요)

---

## JWT(JSON Web Token) 개념
JSON 포맷으로 데이터를 안전·간결하게 전송하는 토큰. 인증 및 정보 교환에 사용.
세 부분이 점(.)으로 구분: Header.Payload.Signature

### 구조
- Header(헤더): JWT 메타데이터. alg(서명 알고리즘 예: HS256), typ(토큰 타입 "JWT")
- Payload(페이로드): 실제 데이터(클레임, Claims). 3유형:
  - 등록된 클레임: 표준 필드 (iss 발급자, sub 주제, exp 만료시간)
  - 공개 클레임: 사용자 정의 데이터 (사용자 ID, 권한 등)
  - 비공개 클레임: 클라이언트-서버 간 비공개 데이터
- Signature(서명): 토큰 변조 방지. secretKey는 서버에서 관리, 서명 유효성 확인에 사용.

### JWT 필터 위치
- "요청(Request)이 컨트롤러에 가기 전에" 작동
- 모든 요청마다 실행(로그인 여부 무관)
- Authorization 헤더에서 JWT 토큰 확인
- 유효하면 → Authentication 객체 생성 후 SecurityContextHolder 저장
- 없거나 무효하면 → 인증 없이 다음 필터로 진행

## build.gradle JWT 의존성 (jjwt 0.11.5)
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'
(+ Day02 Security의 spring-boot-starter-security 포함)

## application.yaml JWT 설정
jwt:
  secret: mysecretmy1secretmys3ecretmysecr   # 32바이트(32글자) — HS256용
  access-token-validity: 30000     # 원문 주석 "5분" 이나 30000ms=30초 (주석/값 불일치, 로컬 확인)
  refresh-token-validity: 86400000 # 1일 (1000*60*60*24)

## common/jwt/JwtConfig.java
@Configuration
- @Value로 jwt.secret / access-token-validity / refresh-token-validity 주입
- @Bean JwtUtil jwtUtil() → new JwtUtil(secret, accessTokenValidity, refreshTokenValidity)

## common/jwt/JwtUtil.java (핵심 토큰 유틸)
- 생성자: secretKey = Keys.hmacShaKeyFor(secret.getBytes()); accessToken/refreshToken 유효시간 저장
- generateAccessToken(userId): Jwts.builder().setSubject(userId).setIssuedAt(now).setExpiration(now+accessToken).signWith(secretKey, HS256).compact()
- generateRefreshToken(userId): 동일, 만료에 refreshToken 사용
- validateAndExtractuserId(token): Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody() → claims.getSubject() (= userId). 실패 시 IllegalArgumentException("Token Error")
  - 주석: 넘어온 token이 "Bearer 토큰내용"이면 substring(7)로 Bearer 제거. 페이로드=클레임(JSON)
- validateToken(token): 위 메서드 호출해 userId 반환, 예외 시 null
- extractExpiration(token): 만료일 추출
- isTokenExpired(token): 만료시간 < 현재 → true(만료)

## 테스트 시나리오 (Postman/실습)
1) 아이디가 틀린 경우
2) 패스워드가 틀린 경우
3) 모두 맞는 경우
4) 토큰으로 마이페이지 불러오기 (정상)
5) 토큰 없이 마이페이지 (토큰 없는 경우)
6) 유효시간 지난 토큰으로 마이페이지 (만료된 경우)
