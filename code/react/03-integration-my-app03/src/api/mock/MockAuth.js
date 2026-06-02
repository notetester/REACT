import {
  clearMockTokens,
  currentMockUser,
  issueMockTokens,
  mockResponse,
  publicMember,
  readUsers,
  takeNextUserId,
  writeUsers,
} from './mockStorage'

export const register = (member) => {
  const users = readUsers()
  if (users.some((user) => user.m_id === member.m_id)) {
    return mockResponse(false, '이미 사용 중인 아이디입니다.')
  }

  users.push({
    ...member,
    m_idx: takeNextUserId(),
    m_active: 0,
  })
  writeUsers(users)
  return mockResponse(true, '회원가입 성공')
}

export const login = (m_id, m_pw) => {
  const member = readUsers().find(
    (user) => user.m_id === m_id && user.m_active === 0
  )
  if (!member) return mockResponse(false, '없는 아이디 입니다')
  if (member.m_pw !== m_pw) return mockResponse(false, '비밀번호가 틀렸습니다.')

  const { accessToken, refreshToken } = issueMockTokens(member)
  return mockResponse(true, '로그인 성공', {
    accessToken,
    refreshToken,
    membersVO: publicMember(member),
  })
}

export const logout = () => {
  clearMockTokens()
  return mockResponse(true, '로그아웃 성공')
}

export const myPage = () => {
  const member = currentMockUser()
  return member
    ? mockResponse(true, '마이페이지 성공', publicMember(member))
    : mockResponse(false, '인증이 필요합니다.')
}

export const deleteMember = () => {
  const member = currentMockUser()
  if (!member) return mockResponse(false, '인증이 필요합니다.')

  writeUsers(readUsers().map((user) =>
    user.m_id === member.m_id ? { ...user, m_active: 1 } : user
  ))
  clearMockTokens()
  return mockResponse(true, '회원탈퇴 성공')
}

export const updateMember = (changes) => {
  const member = currentMockUser()
  if (!member) return mockResponse(false, '인증이 필요합니다.')

  const users = readUsers().map((user) =>
    user.m_id === member.m_id ? { ...user, ...changes, m_id: member.m_id } : user
  )
  writeUsers(users)
  return mockResponse(true, '회원수정 성공')
}
