# Windows 로컬 DB 설치와 초기화

Spring Boot 실습은 DB가 실행 중이어야 완전히 동작합니다. 새 PC에서는 **MyProject01의 MySQL부터** 준비하고, 최종 연동 단계에서 **MyProject02의 Oracle XE**를 추가합니다.

!!! info "왜 DB가 두 개인가요?"
    강의 흐름을 보존했기 때문입니다. JWT 중간 실습 `MyProject01`은 MySQL을 사용하고, React 연동 최종 실습 `MyProject02`는 Oracle XE를 사용합니다.

## 1. MySQL 8.4: MyProject01

### 설치

1. [MySQL 공식 Windows 설치 문서](https://dev.mysql.com/doc/refman/8.4/en/windows-installation.html)를 참고해 MySQL Community Server 8.4 MSI를 설치합니다.
2. MySQL Configurator에서 Windows 서비스 자동 시작, TCP 포트 `3306`, 관리자 `root` 비밀번호를 설정합니다.
3. MySQL Workbench 또는 `mysql` 명령줄 클라이언트로 `root` 접속을 확인합니다.

MySQL 8.4 MSI와 Configurator는 서버 설치, 옵션 파일 작성과 Windows 서비스 시작을 처리합니다.

### 학습 DB와 사용자 생성

저장소 루트에서 MySQL 클라이언트를 열고 초기화 SQL을 실행합니다.

```text
mysql -u root -p
mysql> source D:/dev/REACT/code/springboot/01-jwt-MyProject01/db/mysql-init.sql
mysql> exit

mysql -u dbuser -p -D dbstudy
Enter password: 1234
mysql> select m_id from members;
```

마지막 조회에서 `study`가 보이면 준비 완료입니다. 초기화 SQL은 다음을 만듭니다.

| 항목 | 값 |
|---|---|
| DB | `dbstudy` |
| 애플리케이션 DB 사용자 | `dbuser` / `1234` |
| 로그인 실습 계정 | `study` / `1111` |
| 테이블 | `members`, `refresh_tokens`, `guestbook` |

### Spring Boot 연결 확인

```bash
cd code/springboot/01-jwt-MyProject01
./gradlew bootRun
```

브라우저에서 <http://localhost:8080/guestbook/list>를 열어 `{"success":true,...}` 응답을 확인합니다.

## 2. Oracle Database XE 21c: MyProject02

### 설치

1. [Oracle 공식 Windows XE 21c 설치 문서](https://docs.oracle.com/en/database/oracle/oracle-database/21/xeinw/installing-oracle-database-xe.html)를 참고해 Windows용 Oracle Database XE를 내려받습니다.
2. 압축을 풀고 관리자 권한으로 `setup.exe`를 실행합니다.
3. 설치 중 `SYS`, `SYSTEM`, `PDBADMIN`에 사용할 관리자 비밀번호를 지정합니다.
4. 설치 후 Windows 서비스에서 `OracleServiceXE`가 실행 중인지 확인합니다.

Oracle XE 21c는 SID `XE`를 사용합니다. 이 실습도 `jdbc:oracle:thin:@localhost:1521:xe`에 연결합니다.

### 학습 사용자와 테이블 생성

저장소 루트에서 SQL*Plus를 실행합니다. `<관리자비밀번호>`는 Oracle XE 설치 중 지정한 값입니다.

```text
sqlplus system/<관리자비밀번호>@localhost:1521/XE
SQL> @D:/dev/REACT/code/springboot/02-integration-MyProject02/db/oracle-create-user.sql
SQL> exit

sqlplus c##dbuser/1111@localhost:1521/XE
SQL> @D:/dev/REACT/code/springboot/02-integration-MyProject02/db/oracle-init.sql
SQL> select m_id from members;
```

마지막 조회에서 `study`가 보이면 준비 완료입니다.

| 항목 | 값 |
|---|---|
| SID | `XE` |
| 애플리케이션 DB 사용자 | `c##dbuser` / `1111` |
| 로그인 실습 계정 | `study` / `1111` |
| 테이블 | `members`, `refresh_tokens`, `guestbook` |
| 시퀀스 | `seq_members`, `seq_refresh_tokens`, `seq_guestbook` |

### 최종 연동 실행

```bash
cd code/springboot/02-integration-MyProject02
./gradlew bootRun

cd code/react/03-integration-my-app03
npm ci
npm start
```

## 3. 다른 환경에서 값 바꾸기

기본값은 localhost 학습용입니다. 기존 DB가 있거나 포트가 다르면 환경변수로 덮어씁니다.

```powershell
$env:DB_URL = 'jdbc:oracle:thin:@localhost:1521:xe'
$env:DB_USERNAME = 'c##dbuser'
$env:DB_PASSWORD = '1111'
$env:JWT_SECRET = 'replace-with-a-long-local-learning-secret'
.\gradlew.bat bootRun
```

실제 서비스 계정이나 외부 DB에는 저장소의 기본 비밀번호를 재사용하지 않습니다.

## 4. Docker는 선택 사항

MySQL은 [GitHub Actions](https://docs.github.com/en/actions/configuring-and-managing-workflows/using-databases-and-service-containers)의 임시 서비스 컨테이너로도 검증합니다. 로컬에서도 Docker를 사용할 수 있지만 필수는 아닙니다.

Oracle XE 컨테이너는 [Oracle 공식 Docker 이미지 안내](https://github.com/oracle/docker-images/blob/main/OracleDatabase/SingleInstance/README.md)에 따라 바이너리 다운로드와 라이선스 확인 과정이 필요합니다. 처음 학습할 때는 Windows 네이티브 XE 설치가 더 단순합니다.

## 5. GitHub Actions는 로컬 DB에 연결하지 않습니다

GitHub Actions runner는 사용자 PC의 `localhost`에 접근할 수 없습니다. 대신 MyProject01은 임시 MySQL 서비스 컨테이너를 사용하고, MyProject02는 `snapshot` 프로필의 임시 H2 메모리 DB를 사용합니다.

H2 스냅샷은 Oracle XE 설치를 생략하라는 뜻이 아닙니다. 자동 검증과 문서 생성을 위한 보조 환경이며, 최종 로컬 연동 학습은 위의 Oracle XE 설정을 따라갑니다.
