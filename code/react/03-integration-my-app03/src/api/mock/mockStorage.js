const STORAGE_KEYS = {
  users: 'react-spring-demo-users',
  tokens: 'react-spring-demo-tokens',
  guestbooks: 'react-spring-demo-guestbooks',
  nextUserId: 'react-spring-demo-next-user-id',
  nextGuestbookId: 'react-spring-demo-next-guestbook-id',
}

const seedUser = {
  m_idx: 1,
  m_id: 'study',
  m_pw: '1111',
  m_name: '학습자',
  m_addr: '서울시 학습동',
  m_addr2: '',
  m_email: 'study@example.com',
  m_phone: '010-1111-1111',
  m_active: 0,
}

const readJson = (key, fallback) => {
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : fallback
}

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const ensureMockSeedData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    writeJson(STORAGE_KEYS.users, [seedUser])
  }
  if (!localStorage.getItem(STORAGE_KEYS.guestbooks)) {
    writeJson(STORAGE_KEYS.guestbooks, [])
  }
  if (!localStorage.getItem(STORAGE_KEYS.nextUserId)) {
    localStorage.setItem(STORAGE_KEYS.nextUserId, '2')
  }
  if (!localStorage.getItem(STORAGE_KEYS.nextGuestbookId)) {
    localStorage.setItem(STORAGE_KEYS.nextGuestbookId, '1')
  }
}

export const readUsers = () => {
  ensureMockSeedData()
  return readJson(STORAGE_KEYS.users, [])
}

export const writeUsers = (users) => writeJson(STORAGE_KEYS.users, users)

export const readGuestbooks = () => {
  ensureMockSeedData()
  return readJson(STORAGE_KEYS.guestbooks, [])
}

export const writeGuestbooks = (guestbooks) => {
  writeJson(STORAGE_KEYS.guestbooks, guestbooks)
}

const takeNextId = (key) => {
  ensureMockSeedData()
  const nextId = Number(localStorage.getItem(key))
  localStorage.setItem(key, String(nextId + 1))
  return nextId
}

export const takeNextUserId = () => takeNextId(STORAGE_KEYS.nextUserId)
export const takeNextGuestbookId = () => takeNextId(STORAGE_KEYS.nextGuestbookId)

export const publicMember = (member) => {
  if (!member) return null
  const { m_pw, m_active, ...visibleMember } = member
  return visibleMember
}

export const issueMockTokens = (member) => {
  const tokens = {
    accessToken: `mock-access-token-${member.m_id}`,
    refreshToken: `mock-refresh-token-${member.m_id}`,
    user: publicMember(member),
  }
  writeJson(STORAGE_KEYS.tokens, tokens)
  return tokens
}

export const clearMockTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.tokens)
  localStorage.removeItem('tokens')
}

export const currentMockUser = () => {
  const tokens = readJson(STORAGE_KEYS.tokens, null)
  if (!tokens?.user?.m_id) return null
  return readUsers().find(
    (member) => member.m_id === tokens.user.m_id && member.m_active === 0
  ) || null
}

export const mockResponse = (success, message, data = null) =>
  Promise.resolve({ data: { success, message, data } })
