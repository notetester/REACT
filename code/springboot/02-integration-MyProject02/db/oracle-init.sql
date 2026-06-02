-- MyProject02 learning DB bootstrap
-- Run once as c##dbuser against an empty Oracle schema.
-- Seed account: study / 1111

CREATE TABLE members (
  m_idx NUMBER PRIMARY KEY,
  m_id VARCHAR2(100) NOT NULL UNIQUE,
  m_pw VARCHAR2(255) NOT NULL,
  m_name VARCHAR2(100),
  m_addr VARCHAR2(255),
  m_addr2 VARCHAR2(255),
  m_email VARCHAR2(255),
  m_phone VARCHAR2(100),
  m_reg DATE DEFAULT SYSDATE NOT NULL,
  m_active NUMBER(1) DEFAULT 0 NOT NULL,
  m_active_reg DATE,
  sns_email_naver VARCHAR2(255),
  sns_email_kakao VARCHAR2(255),
  sns_provider VARCHAR2(50)
);

CREATE TABLE refresh_tokens (
  rt_idx NUMBER PRIMARY KEY,
  rt_user_id VARCHAR2(100) NOT NULL,
  rt_token VARCHAR2(1000) NOT NULL,
  rt_reg DATE DEFAULT SYSDATE NOT NULL,
  CONSTRAINT fk_refresh_tokens_members
    FOREIGN KEY (rt_user_id) REFERENCES members (m_id)
);

CREATE TABLE guestbook (
  g_idx NUMBER PRIMARY KEY,
  g_writer VARCHAR2(100) NOT NULL,
  g_subject VARCHAR2(255) NOT NULL,
  g_email VARCHAR2(255),
  g_pwd VARCHAR2(255),
  g_content CLOB,
  g_regdate DATE DEFAULT SYSDATE NOT NULL,
  g_active NUMBER(1) DEFAULT 0 NOT NULL,
  f_name VARCHAR2(255)
);

CREATE SEQUENCE seq_members START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_refresh_tokens START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_guestbook START WITH 1 INCREMENT BY 1;

INSERT INTO members (m_idx, m_id, m_pw, m_name, m_email)
VALUES (
  seq_members.NEXTVAL,
  'study',
  '$2b$12$Pijbbll0EKu8iCp9OzHi7OGyHZOyPUKTJJbX9eVs5g.EF7SaFZ2pW',
  '학습자',
  'study@example.com'
);

COMMIT;

