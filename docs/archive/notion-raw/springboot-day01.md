# [RAW] Spring Boot Day01 — 출처: 강사 Notion (35db3824...e6b9)

Title: Day01 | Notion
URL: https://www.notion.so/Day01-35db382469f4805d8c37e2adc5dde6b9
(코드 전문은 로컬 MyProject01 에 존재. 개념/아키텍처/주석 위주 보존)

---

## 빌드 도구
- 빌드 자동화 도구 = 소스코드를 컴파일·테스트·패키징하여 실행 가능한 앱을 만드는 빌드 과정을 자동화 (메이븐, 그래들)
- 자바 기반 프로젝트용: Maven, Gradle

## 중간프로젝트 vs 최종프로젝트
- 중간: SpringMVC + Maven + JSP = 관공서(전자정부프레임워크). java 21, Maven → pom.xml. JSP는 외부 tomcat 필요 → war 파일.
- 최종: SpringBoot + Gradle + React = 민간기업 다수. java 21, Gradle → build.gradle. 내부 tomcat → jar 파일. AWS 실제 배포까지.

## Gradle 파일 역할
- build.gradle — 프로젝트의 "레시피". 어떤 라이브러리/플러그인을 쓸지 선언.
- settings.gradle — 프로젝트의 "이름표". 프로젝트 이름 + 멀티모듈 구조 등록.
- gradle/wrapper/ — Gradle 버전을 팀원 모두 동일하게 맞추는 장치 (Gradle 직접 설치 불필요).
- gradlew — `./gradlew build` 처럼 터미널에서 실행하는 스크립트.
- src/ — 실제 Java 코드 (Maven과 동일 구조).
- build/ — Gradle이 자동 생성. .gitignore에 포함.

## application.yaml
spring.application.name: MyProject01
spring.datasource: MySQL (com.mysql.cj.jdbc.Driver), url jdbc:mysql://localhost:3306/dbstudy?useSSL=false&serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true, username dbuser, password 1234
mybatis.mapper-locations: classpath:mapper/*.xml
mybatis.type-aliases-package: com.study.myproject01.*.vo

## 공통 응답 래퍼 — common/vo/DataVO  (★ 핵심 패턴)
@Data @AllArgsConstructor @NoArgsConstructor
public class DataVO {
  private boolean success;   // 성공 여부
  private String message;    // 메시지
  private Object data;       // 실제 데이터(any)
}
→ 모든 REST 응답을 {success, message, data} 형태로 통일.

## MembersController — REST 기초 (4가지 요청 패턴)
@RestController @RequestMapping("/members")
- @GetMapping("/hello") → "Hello World!"
- @PostMapping("/hi") → "Hi World!"
- @GetMapping("/hello2") @RequestParam String msg → 쿼리파라미터 (msg + "님...")
- @PostMapping("/hi2") @RequestBody Map<String,String> body → JSON 바디 (body.get("msg"))

## GuestBook — 레이어드 아키텍처 (Controller→Service→ServiceImpl→Mapper→XML)
- GuestBookController: /guestbook/list(GET), /insert(POST), /detail(POST). 모두 DataVO로 감싸 try-catch로 success/message 처리.
  - list: 비었으면 "데이터가 없습니다", 있으면 setData(list)
  - insert: result==0 → "등록 실패", else "등록 성공"
- GuestBookMapper(@Mapper interface): guestBookList/Detail/Insert/Delete/Update
- GuestBookService(interface) + GuestBookServiceImpl(@Service, @Autowired Mapper)
- GuestBookVO(@Data): g_idx, g_writer, g_subject, g_email, g_pwd, g_content, g_regdate, g_active, f_name + MultipartFile file_name

## resources/mapper/guestbook-mapper.xml (MyBatis)
- namespace = GuestBookMapper 인터페이스 풀네임
- select guestBookList: `select * from guestbook where g_active = 0`
- insert guestBookInsert: insert into guestbook(...) values(#{...}, now())

## 테스트: Postman으로 members / guestbook 엔드포인트 확인
