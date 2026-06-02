-- Run once as SYSTEM against the XE container database.
-- This creates the localhost-only learning account used by application.yaml.

DECLARE
  user_count NUMBER;
BEGIN
  SELECT COUNT(*)
    INTO user_count
    FROM all_users
   WHERE username = 'C##DBUSER';

  IF user_count = 0 THEN
    EXECUTE IMMEDIATE 'CREATE USER c##dbuser IDENTIFIED BY "1111"';
  END IF;
END;
/

ALTER USER c##dbuser IDENTIFIED BY "1111";
GRANT CREATE SESSION, RESOURCE TO c##dbuser;
ALTER USER c##dbuser QUOTA UNLIMITED ON USERS;

