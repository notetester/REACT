# Spring Boot 03 — JWT 인증

> 실습 코드: [`code/springboot/01-jwt-MyProject01`](https://github.com/notetester/REACT/tree/main/code/springboot/01-jwt-MyProject01) · 참조: <https://jwt.io/>

---

## 1. JWT(JSON Web Token) 란?

JSON 포맷으로 데이터를 **안전하고 간결하게** 전송하는 토큰. 세 부분이 점(`.`)으로 구분됩니다: `Header.Payload.Signature`

![JWT 구조](../assets/img/springboot-jwt/sbjwt_00.png)

| 부분 | 내용 |
|------|------|
| **Header** | `alg`(서명 알고리즘, 예 HS256), `typ`("JWT") |
| **Payload** | 클레임(Claims). 등록(`iss`,`sub`,`exp`)·공개(userId 등)·비공개 클레임 |
| **Signature** | `HMACSHA256(base64(header)+"."+base64(payload), secretKey)` — 변조 방지. secretKey는 **서버만** 보관 |

## 2. JWT 동작 원리 (Access / Refresh 토큰)

![JWT 동작 원리 시퀀스](../assets/img/springboot-jwt/sbjwt_01.png)

1. 사용자 로그인 → 2. 서버가 회원 DB 확인 → 3. **Access Token + Refresh Token 발급** → 4. 응답
5. 이후 데이터 요청에 Access Token 동봉 → 6. 서버가 Access Token 검증 → 7. 응답
8. Access Token **만료** → 9. (만료된 채) 요청 → 10. 서버가 만료 확인(401)
11~13. 클라이언트가 **Refresh Token으로 재발급 요청** → 서버가 확인 후 **새 Access/Refresh 발급**

> **왜 두 개인가?** Access Token은 수명이 짧아(탈취 위험↓) 자주 쓰이고, Refresh Token은 수명이 길어(예: 1일) Access 재발급에만 사용합니다.

## 3. JWT 필터의 위치

JWT 필터는 **요청이 컨트롤러에 도달하기 전**에 동작합니다. 모든 요청마다 실행되어 `Authorization` 헤더의 토큰을 검사하고, 유효하면 `Authentication` 객체를 만들어 `SecurityContextHolder`에 저장합니다.

![필터 위치](../assets/img/springboot-jwt/sbjwt_02.png)

## 4. 설정

### build.gradle (jjwt 0.11.5)
```gradle
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'
```

### application.yaml
```yaml
jwt:
  secret: ${JWT_SECRET:learning-only-local-jwt-secret-32bytes}
  access-token-validity: ${JWT_ACCESS_TOKEN_VALIDITY:300000}      # 5분 (MyProject01)
  refresh-token-validity: ${JWT_REFRESH_TOKEN_VALIDITY:86400000}  # 1일
```
> ⚠️ 프로젝트별로 값이 다릅니다: **MyProject01** `access=300000`(5분), **MyProject02** `access=30000`(30초, 리프레시 흐름을 빨리 테스트하려는 값). refresh는 둘 다 1일.

## 5. `JwtConfig` — 설정값 주입 + JwtUtil 빈 등록
```java
@Configuration
public class JwtConfig {
    @Value("${jwt.secret}")                 private String secret;
    @Value("${jwt.access-token-validity}")  private long accessTokenValidity;
    @Value("${jwt.refresh-token-validity}") private long refreshTokenValidity;

    @Bean
    public JwtUtil jwtUtil() { return new JwtUtil(secret, accessTokenValidity, refreshTokenValidity); }
}
```

## 6. `JwtUtil` — 토큰 생성·검증
```java
public class JwtUtil {
    private final Key secretKey;
    private long accessToken, refreshToken;

    public JwtUtil(String secret, long accessToken, long refreshToken) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());   // 32바이트 시크릿
        this.accessToken = accessToken; this.refreshToken = refreshToken;
    }
    public String generateAccessToken(String userId) {
        return Jwts.builder().setSubject(userId)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + accessToken))
            .signWith(secretKey, SignatureAlgorithm.HS256).compact();
    }
    // generateRefreshToken: 동일하되 만료에 refreshToken 사용
    public String validateAndExtractuserId(String token) {     // 서명·만료 검증 후 subject(userId) 반환
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build()
                            .parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    public String validateToken(String token) {                // 유효하면 userId, 아니면 null
        try { return validateAndExtractuserId(token); } catch (Exception e) { return null; }
    }
    public boolean isTokenExpired(String token) {              // 만료시간 < 현재 → true
        return extractExpiration(token).before(new Date());
    }
}
```

## 7. `JwtRequestFilter` — 매 요청 토큰 검증 (`OncePerRequestFilter`)
```java
@Slf4j @Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
        String authHeader = req.getHeader("Authorization");
        // ① 토큰 없거나 Bearer 형식 아니면 통과 (공개 엔드포인트는 SecurityConfig가 권한 체크)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) { chain.doFilter(req, res); return; }
        String token = authHeader.substring(7);                       // ② "Bearer " 제거
        try {
            String userId = jwtUtil.validateToken(token);
            if (userId != null) {                                     // ③ 유효 → SecurityContext에 등록
                var auth = new UsernamePasswordAuthenticationToken(userId, null, List.of());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else { /* 위조 → 401 JSON */ return; }
        } catch (ExpiredJwtException e) { /* 만료 → 401 {"message":"token expired"} */ return; }
        chain.doFilter(req, res);                                     // ④ 검증 완료 → 컨트롤러로
    }
}
```

> 만료 시 401 `token expired`를 받은 클라이언트는 `POST /members/refresh`로 재발급을 시도합니다. (→ [연동 흐름](../integration/react-springboot-jwt-flow.md))

## 8. Postman 테스트

| 케이스 | 응답 |
|--------|------|
| 없는 아이디 | `{success:false, message:"없는 아이디 입니다.", data:null}` |
| 비밀번호 틀림 | `{success:false, message:"비밀번호가 틀렸습니다.", data:null}` |
| 정상 로그인 | `{success:true, message:"로그인 성공", data:{accessToken, refreshToken, membersVO}}` |

![로그인 실패 - 없는 아이디](../assets/img/springboot-jwt/sbjwt_03.png)
![로그인 실패 - 비밀번호 틀림](../assets/img/springboot-jwt/sbjwt_04.png)

---

### 다음 단계
- [★ React ↔ Spring Boot JWT 연동 흐름](../integration/react-springboot-jwt-flow.md)
