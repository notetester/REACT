-- Same seed credentials as the local Oracle learning database: study / 1111
INSERT INTO members (m_idx, m_id, m_pw, m_name, m_email)
VALUES (
  seq_members.NEXTVAL,
  'study',
  '$2b$12$Pijbbll0EKu8iCp9OzHi7OGyHZOyPUKTJJbX9eVs5g.EF7SaFZ2pW',
  '학습자',
  'study@example.com'
);
