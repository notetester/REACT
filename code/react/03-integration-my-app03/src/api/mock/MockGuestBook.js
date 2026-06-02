import {
  currentMockUser,
  mockResponse,
  readGuestbooks,
  takeNextGuestbookId,
  writeGuestbooks,
} from './mockStorage'

const publicGuestbook = ({ g_pwd, g_active, ...guestbook }) => guestbook

export const guestbookList = () => {
  const guestbooks = readGuestbooks()
    .filter((guestbook) => guestbook.g_active === 0)
    .sort((a, b) => a.g_idx - b.g_idx)
    .map(publicGuestbook)
  return mockResponse(
    true,
    guestbooks.length ? '데이터 불러오기 성공' : '데이터가 없습니다',
    guestbooks.length ? guestbooks : null
  )
}

export const guestbookInsert = (guestbook) => {
  if (!currentMockUser()) return mockResponse(false, '인증이 필요합니다.')

  const guestbooks = readGuestbooks()
  guestbooks.push({
    ...guestbook,
    g_idx: takeNextGuestbookId(),
    g_regdate: new Date().toLocaleString('ko-KR'),
    g_active: 0,
  })
  writeGuestbooks(guestbooks)
  return mockResponse(true, '등록 성공')
}

export const guestbookUpdate = (changes) => {
  if (!currentMockUser()) return mockResponse(false, '인증이 필요합니다.')

  const guestbooks = readGuestbooks()
  const target = guestbooks.find((guestbook) =>
    guestbook.g_idx === changes.g_idx && guestbook.g_active === 0
  )
  if (!target || target.g_pwd !== changes.g_pwd || target.g_writer !== changes.g_writer) {
    return mockResponse(false, '작성자 또는 비밀번호를 확인해 주세요.')
  }

  writeGuestbooks(guestbooks.map((guestbook) =>
    guestbook.g_idx === changes.g_idx
      ? { ...guestbook, g_subject: changes.g_subject, g_content: changes.g_content }
      : guestbook
  ))
  return mockResponse(true, '수정 성공')
}

export const guestbookDelete = (g_idx, g_pwd) => {
  if (!currentMockUser()) return mockResponse(false, '인증이 필요합니다.')

  const guestbooks = readGuestbooks()
  const target = guestbooks.find((guestbook) =>
    guestbook.g_idx === g_idx && guestbook.g_active === 0
  )
  if (!target || target.g_pwd !== g_pwd) {
    return mockResponse(false, '비밀번호를 확인해 주세요.')
  }

  writeGuestbooks(guestbooks.map((guestbook) =>
    guestbook.g_idx === g_idx ? { ...guestbook, g_active: 1 } : guestbook
  ))
  return mockResponse(true, '삭제 성공')
}
