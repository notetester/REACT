# 보강 기록과 정오표

원본 필기와 로컬 코드를 보존하되, 그대로 따라 했을 때 막히거나 오해하기 쉬운 부분은 정제 노트와 보존 코드에서 보강했습니다.

| 항목 | 보강 내용 |
|---|---|
| React Router | CRA/Jest 호환성을 위해 세 React 앱을 `react-router-dom` v6.30.1로 고정 |
| GitHub Pages | 정적 호스팅 새로고침 404를 피하도록 데모 빌드에서 `HashRouter` 사용 |
| JWT 기본값 | localhost 실습 기본값을 유지하면서 `JWT_SECRET`, DB 설정 환경변수 덮어쓰기 지원 |
| MyProject02 Access Token | `30000ms`는 5분이 아니라 30초이며, 재발급 흐름을 빠르게 확인하기 위한 값 |
| CSRF 설명 | JWT 자체가 CSRF를 없애는 것은 아님. Authorization 헤더 방식과 쿠키 자동 전송 방식을 구분 |
| 응답 데이터 | 회원 비밀번호 해시와 방명록 비밀번호 해시가 목록·로그인 응답으로 노출되지 않도록 제한 |
| 로그 | Access Token, Refresh Token 원문 로그 제거 |
| 회원탈퇴 | 상태 변경 요청을 `GET`에서 `DELETE`로 변경 |
| DB 재현 | MySQL·Oracle 초기화 SQL과 학습용 `study / 1111` 계정 추가 |

`01-jwt-MyProject01`은 JWT 학습 중간 단계라 방명록 상세·수정·삭제가 완성되지 않은 상태입니다. 완성된 CRUD 흐름은 `02-integration-MyProject02`에서 확인합니다.

