#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_DIR="$ROOT_DIR/code/springboot/02-integration-MyProject02"
GENERATED_DIR="${SNAPSHOT_OUTPUT_DIR:-$ROOT_DIR/docs/generated}"
RESULTS_DIR="$GENERATED_DIR/api-results"
SNAPSHOT_MD="$GENERATED_DIR/integration-snapshot.md"
BASE_URL="${SNAPSHOT_BASE_URL:-http://127.0.0.1:8080}"
SERVER_LOG="${SNAPSHOT_SERVER_LOG:-${TMPDIR:-/tmp}/react-integration-snapshot-server.log}"

mkdir -p "$RESULTS_DIR"
rm -f "$RESULTS_DIR"/*.json "$SERVER_LOG"

APP_PID=""
cleanup() {
  if [[ -n "$APP_PID" ]]; then
    kill "$APP_PID" 2>/dev/null || true
    wait "$APP_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

save_json() {
  local filename="$1"
  local body="$2"
  printf '%s\n' "$body" | jq . > "$RESULTS_DIR/$filename"
}

assert_success() {
  local body="$1"
  printf '%s\n' "$body" | jq -e '.success == true' > /dev/null
}

call_json() {
  local method="$1"
  local path="$2"
  local body="${3:-}"
  local token="${4:-}"
  local args=(--fail --silent --show-error --request "$method" "$BASE_URL$path")

  if [[ -n "$body" ]]; then
    args+=(--header "Content-Type: application/json" --data "$body")
  fi
  if [[ -n "$token" ]]; then
    args+=(--header "Authorization: Bearer $token")
  fi
  curl "${args[@]}"
}

(
  cd "$PROJECT_DIR"
  ./gradlew bootRun --no-daemon --args='--spring.profiles.active=snapshot'
) > "$SERVER_LOG" 2>&1 &
APP_PID=$!

for attempt in {1..90}; do
  if curl --fail --silent "$BASE_URL/guestbook/list" > /dev/null; then
    break
  fi
  if [[ "$attempt" -eq 90 ]]; then
    cat "$SERVER_LOG"
    exit 1
  fi
  sleep 2
done

REGISTER_BODY='{"m_id":"snapshot-user","m_pw":"1111","m_name":"Snapshot Learner","m_addr":"Actions H2","m_email":"snapshot@example.com","m_phone":"010-0000-0000"}'
LOGIN_BODY='{"m_id":"snapshot-user","m_pw":"1111"}'
INSERT_BODY='{"g_writer":"Snapshot Learner","g_subject":"Actions snapshot entry","g_content":"inserted by generate-integration-snapshot.sh","g_email":"snapshot@example.com","g_pwd":"1111"}'

REGISTER_RESPONSE="$(call_json POST /members/register "$REGISTER_BODY")"
assert_success "$REGISTER_RESPONSE"
save_json "01-register.json" "$REGISTER_RESPONSE"

LOGIN_RESPONSE="$(call_json POST /members/login "$LOGIN_BODY")"
assert_success "$LOGIN_RESPONSE"
ACCESS_TOKEN="$(printf '%s\n' "$LOGIN_RESPONSE" | jq -r '.data.accessToken')"
MASKED_LOGIN_RESPONSE="$(printf '%s\n' "$LOGIN_RESPONSE" | jq '
  .data.accessToken = "<masked access token>" |
  .data.refreshToken = "<masked refresh token>"
')"
save_json "02-login.json" "$MASKED_LOGIN_RESPONSE"

LIST_BEFORE_RESPONSE="$(call_json GET /guestbook/list)"
assert_success "$LIST_BEFORE_RESPONSE"
save_json "03-list-before.json" "$LIST_BEFORE_RESPONSE"

INSERT_RESPONSE="$(call_json POST /guestbook/insert "$INSERT_BODY" "$ACCESS_TOKEN")"
assert_success "$INSERT_RESPONSE"
save_json "04-insert.json" "$INSERT_RESPONSE"

LIST_AFTER_INSERT_RESPONSE="$(call_json GET /guestbook/list)"
assert_success "$LIST_AFTER_INSERT_RESPONSE"
save_json "05-list-after-insert.json" "$LIST_AFTER_INSERT_RESPONSE"
GUESTBOOK_ID="$(printf '%s\n' "$LIST_AFTER_INSERT_RESPONSE" | jq -r '
  .data[] | select(.g_subject == "Actions snapshot entry") | .g_idx
')"

UPDATE_BODY="$(jq -nc --arg g_idx "$GUESTBOOK_ID" '{
  g_idx: $g_idx,
  g_writer: "Snapshot Learner",
  g_subject: "Actions snapshot entry updated",
  g_content: "updated by generate-integration-snapshot.sh",
  g_pwd: "1111"
}')"
UPDATE_RESPONSE="$(call_json POST /guestbook/update "$UPDATE_BODY" "$ACCESS_TOKEN")"
assert_success "$UPDATE_RESPONSE"
save_json "06-update.json" "$UPDATE_RESPONSE"

LIST_AFTER_UPDATE_RESPONSE="$(call_json GET /guestbook/list)"
assert_success "$LIST_AFTER_UPDATE_RESPONSE"
save_json "07-list-after-update.json" "$LIST_AFTER_UPDATE_RESPONSE"

DELETE_BODY="$(jq -nc --arg g_idx "$GUESTBOOK_ID" '{g_idx: $g_idx, g_pwd: "1111"}')"
DELETE_RESPONSE="$(call_json POST /guestbook/delete "$DELETE_BODY" "$ACCESS_TOKEN")"
assert_success "$DELETE_RESPONSE"
save_json "08-delete.json" "$DELETE_RESPONSE"

LIST_AFTER_DELETE_RESPONSE="$(call_json GET /guestbook/list)"
assert_success "$LIST_AFTER_DELETE_RESPONSE"
save_json "09-list-after-delete.json" "$LIST_AFTER_DELETE_RESPONSE"

{
  cat <<'EOF'
# Actions API 실행 스냅샷

!!! info "검증 환경"
    이 문서는 GitHub Actions가 `MyProject02`를 **임시 H2 메모리 DB**와 `snapshot` 프로필로 실행하여 생성합니다.
    로컬 최종 실습의 기본 DB인 **Oracle XE를 대체하는 배포 환경이 아닙니다.**
    Oracle식 시퀀스와 `sysdate`, Spring Security, JWT, MyBatis CRUD 흐름을 매 실행마다 재현하는 학습용 스냅샷입니다.

JWT 문자열은 공개 문서와 artifact에서 마스킹합니다.

## 실행 시나리오

`회원가입 → 로그인 → 목록 조회 → 등록 → 목록 조회 → 수정 → 목록 조회 → 삭제 → 목록 조회`

EOF

  for result_file in \
    01-register.json \
    02-login.json \
    03-list-before.json \
    04-insert.json \
    05-list-after-insert.json \
    06-update.json \
    07-list-after-update.json \
    08-delete.json \
    09-list-after-delete.json
  do
    printf '### `%s`\n\n```json\n' "$result_file"
    cat "$RESULTS_DIR/$result_file"
    printf '```\n\n'
  done
} > "$SNAPSHOT_MD"

printf 'Generated %s\n' "$SNAPSHOT_MD"
