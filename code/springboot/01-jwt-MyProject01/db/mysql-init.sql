-- MyProject01 learning DB bootstrap
-- Run once against an empty MySQL schema named dbstudy.
-- Seed account: study / 1111

CREATE DATABASE IF NOT EXISTS dbstudy
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE dbstudy;

CREATE TABLE IF NOT EXISTS members (
  m_idx BIGINT PRIMARY KEY AUTO_INCREMENT,
  m_id VARCHAR(100) NOT NULL UNIQUE,
  m_pw VARCHAR(255) NOT NULL,
  m_name VARCHAR(100),
  m_addr VARCHAR(255),
  m_addr2 VARCHAR(255),
  m_email VARCHAR(255),
  m_phone VARCHAR(100),
  m_reg TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  m_active TINYINT NOT NULL DEFAULT 0,
  m_active_reg TIMESTAMP NULL,
  sns_email_naver VARCHAR(255),
  sns_email_kakao VARCHAR(255),
  sns_provider VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  rt_idx BIGINT PRIMARY KEY AUTO_INCREMENT,
  rt_user_id VARCHAR(100) NOT NULL,
  rt_token VARCHAR(1000) NOT NULL,
  rt_reg TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_refresh_tokens_members
    FOREIGN KEY (rt_user_id) REFERENCES members (m_id)
);

CREATE TABLE IF NOT EXISTS guestbook (
  g_idx BIGINT PRIMARY KEY AUTO_INCREMENT,
  g_writer VARCHAR(100) NOT NULL,
  g_subject VARCHAR(255) NOT NULL,
  g_email VARCHAR(255),
  g_pwd VARCHAR(255),
  g_content TEXT,
  g_regdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  g_active TINYINT NOT NULL DEFAULT 0,
  f_name VARCHAR(255)
);

INSERT IGNORE INTO members (m_id, m_pw, m_name, m_email)
VALUES (
  'study',
  '$2b$12$Pijbbll0EKu8iCp9OzHi7OGyHZOyPUKTJJbX9eVs5g.EF7SaFZ2pW',
  '학습자',
  'study@example.com'
);

