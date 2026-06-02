# [PENDING] 이미지형 Notion 페이지 2개 — 자동 추출 불가

백그라운드 Chrome 탭에서 아래 2개 페이지는 본문 추출이 불가했음.

## 1) React Day03 (실습) — https://www.notion.so/Day03-353b382469f48011bef3febead6eeb19
- 증상: 자동화 탭에서 본문 데이터 블록 4개만 로드(제목만), 이미지/figure 0, 스크린샷 렌더러 freeze.
- 추정 내용: Day02(step02~04) 다음 단계 = my-app01 의 step05-if ~ step10-form 부근 실습 (if/event/css/event2(counter)/props/form).
- 대응: 로컬 my-app01/src/pages/step05~step10(필요시 그 이상) 코드로부터 노트 재구성.

## 2) Zustand (2) — https://www.notion.so/Zustand-2-360b382469f4805c9c07c1fbdb798839
- 증상: 본문이 코드 스크린샷 이미지(figure ×9)로 구성. get_page_text는 제목+"로그인/로그아웃 흐름" 헤딩만. 이미지 URL은 서명 쿼리스트링이라 보안 가드 차단. 스크린샷 렌더러 freeze.
- 확인된 헤딩: "로그인/로그아웃 흐름"
- 추정 내용: Zustand(1) 이후 = my-app02 의 TodoPage/MemoPage/ProfilePage + useTodoStore/useMemoStroe(persist) + 로그인/로그아웃 흐름.
- 대응: 로컬 my-app02 코드로부터 노트 재구성.

## 선택지(사용자)
- (기본) 로컬 코드로부터 재구성 + 최종 repo에 "코드 기반 작성" 명시
- (옵션) 사용자가 이 2페이지를 직접 복사해 채팅/파일로 제공하면 강사 원문/다이어그램까지 반영 가능
