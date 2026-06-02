# [RAW] Spring Boot Day02 - Spring Security — 출처: 강사 Notion (35eb3824...25a8)

Title: Day02 - Spring Security | Notion
URL: https://www.notion.so/Day02-Spring-Security-35eb382469f480c5b0bed777148525a8
참조: https://docs.spring.io/spring-security/reference/servlet/configuration/java.html
(코드 전문은 로컬 MyProject01 에 존재. 개념/주석 위주 보존. ※ build.gradle 버전 표기는 로컬 실제값과 교차검증 필요)

---

## Spring Security 개념
보안 강화 프레임워크. 핵심 두 축:
### Authentication (인증) — 사용자의 신원을 확인하는 과정
- AuthenticationManager : 인증 처리 핵심 인터페이스
- UserDetailsService : 사용자 정보를 로드하는 인터페이스
- PasswordEncoder : 비밀번호 암호화/검증 인터페이스
- SecurityContextHolder : 인증된 사용자 정보 저장 및 관리
### Authorization (인가) — 인증된 사용자가 특정 리소스 접근 권한이 있는지 확인
- SecurityFilterChain : HTTP 요청에 대한 보안 규칙을 정의하는 필터 체인
- GrantedAuthority : 사용자의 권한 정보
- MethodSecurityExpressionOperations : 메서드 단위 보안
- AccessDecisionManager : 접근 권한을 결정하는 인터페이스

## Spring Security 필터 실행 순서 (먼저 실행된 필터가 다음에 영향)
1. SecurityContextPersistenceFilter : 로그인 정보 유지 (인증 정보 유지)
2. UsernamePasswordAuthenticationFilter : ID/비밀번호 확인
3. BasicAuthenticationFilter : HTTP Basic 인증(팝업 로그인) 처리
4. BearerTokenAuthenticationFilter : JWT 토큰 검증 필터
5. SessionManagementFilter : 세션관리(같은 계정 여러 곳 로그인 차단)
6. ExceptionTranslationFilter : 적절한 에러 처리
7. FilterSecurityInterceptor : 요청 URL이 허용된 경로인지 확인

## build.gradle 의존성 (security 추가)  ※버전 표기 원문 그대로 — 로컬과 교차검증
plugins: java, org.springframework.boot, io.spring.dependency-management
java toolchain languageVersion 21
dependencies:
- spring-boot-starter-jdbc
- spring-boot-starter-web(mvc)
- mybatis-spring-boot-starter
- lombok(compileOnly/annotationProcessor)
- spring-boot-devtools(developmentOnly)
- mysql-connector-j(runtimeOnly)
- **spring-boot-starter-security**  ← 보안 추가
- spring-boot-starter-test

## config/SecurityConfig.java  (★ JWT용 보안 설정)
@Slf4j @Configuration @EnableWebSecurity
- @Configuration: 설정 클래스(부팅 시 함께 실행), @EnableWebSecurity: 웹 보안 설정 활성화
@Bean SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource ...):
  1. .cors(cors -> cors.configurationSource(corsConfigurationSource()))
     - CORS = 출처가 다른 서버 간 리소스 공유 허용 (서버↔클라이언트 출처 다름)
  2. .csrf(csrf -> csrf.disable())
     - CSRF = 로그인된 상태를 악용해 악성 사이트가 사용자 권한으로 요청 보내는 공격. JWT 사용 시 위험 없음 → 비활성
  3. .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
     - 세션 생성 안 함(무상태). JWT 사용 시 권장
  4. .authorizeHttpRequests(...):
     - .requestMatchers("/members/**").permitAll()
     - .requestMatchers("/guestbook/**").permitAll()
     - .anyRequest().authenticated()
  return http.build();

@Bean CorsConfigurationSource corsConfigurationSource():
- setAllowedOrigins(["http://localhost:3000"])  ← 리액트
- setAllowedMethods(["GET","POST","PUT","DELETE","OPTIONS"])
- setAllowedHeaders(["*"]); setAllowCredentials(true)
- UrlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration)

## config/AppConfig.java
@Configuration
@Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
→ 비밀번호 BCrypt 해시 암호화/검증
