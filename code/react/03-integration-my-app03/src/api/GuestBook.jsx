import {api} from "./Http"
import * as mockGuestBook from "./mock/MockGuestBook"

const isMockMode = process.env.REACT_APP_API_MODE === 'mock'

export const guestbookList = () =>
    isMockMode ? mockGuestBook.guestbookList() : api.get("/guestbook/list")

export const guestbookInsert = (gvo) =>
    isMockMode ? mockGuestBook.guestbookInsert(gvo) : api.post("/guestbook/insert", gvo)

export const guestbookUpdate = (gvo) =>
    isMockMode ? mockGuestBook.guestbookUpdate(gvo) : api.post("/guestbook/update" ,gvo)

export const guestbookDelete = (g_idx, g_pwd) =>
    isMockMode ? mockGuestBook.guestbookDelete(g_idx, g_pwd) : api.post(`/guestbook/delete`, {g_idx, g_pwd})
