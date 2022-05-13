# anonymous_forum

### 설치 및 설정

#### 1. 패키지 설치
npm install

#### 2. DB 커넥션 설정 
config/config.json 파일에 이메일로 공유드린 username, password, database, host, dialect을 입력해주세요.

#### 3. 서버 시작
npm run server


### DB 스키마
- 게시글 테이블, 댓글 테이블, 키워드 테이블로 구성되어 있습니다.
- schema_script 폴더를 참고해주세요.


### API 테스트
포스트맨을 통해 API 테스트를 할 수 있습니다.

1. 게시글 조회: 
- GET /community/post
- 쿼리스트링 키는 limit, offset, writer, title입니다.

2. 게시글 생성
- POST /community/post
- 요청 바디에는 title, content, writer, pw 가 들어갑니다.

3. 게시글 수정
- PATCH /community/post/:idx
- 요청 파라미터 idx는 게시글의 고유키입니다.
- 요청 바디에는 title, content, pw가 들어갑니다.

4. 게시글 삭제
- DELETE /community/post/:idx
- 요청 파라미터 idx는 게시글의 고유키입니다.

5. 댓글 조회
- GET /community/comment/:idx
- 요청 파라미터 idx는 게시글의 고유키입니다.
- 쿼리스트링 키는 limit, offset 입니다.

6. 댓글 생성
- POST /community/comment/:idx
- 요청 파라미터 idx는 게시글의 고유키입니다.
- 요청 바디에는 parentIdx, comment, writer 가 들어갑니다.
- 댓글은 parentIdx가 0이며, 댓글의 댓글은 parentIdx에 상위 댓글의 고유키를 입력합니다.
