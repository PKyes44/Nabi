# Nabi
[나비 서비스](https://nabi-psi.vercel.app, "나비 서비스")

나비는 경제적으로 어려움을 겪고 있는 아동과 후원자들을 연결하여 따뜻한 사회적 지원을 가능하게 하는 웹 서비스입니다. 나비는 아동급식카드 가맹점 위치 기반 검색, 후원아동을 위한 봉사자 모집과 커뮤니티 서비스, 정기 결연 등 다양한 후원자와 후원아동을 위한 서비스을 제공하여 아동과 후원자의 소통을 돕습니다.

### 개발 기간

### 개발자
- __양은석(팀장)__ : 정기 후원, 후원기금 모금, 지도 표시 및 검색, 알림, 토스트 , 로딩 애니메이션, DB 설계, 백엔드 개발, 반응형 구현, 데스크탑 UI 및 로고 디자인 등
- __심우섭(팀원)__ : 프로필 화면, 후원 리포트 애니메이션 및 차트, 로그인, 회원가입, 봉사자 모집글 신청자 관리, 반응형 구현 등 
- __조은진(팀원)__ : 홈 화면, 봉사자 모집글(CRUD), 감사인사(CRUD), 반응형 UI 디자인 및 구현 등

### Database ERD
![DatabaseERD](https://github.com/Nabi-06/Nabi/blob/develop/DatabaseERD)
  
### 개발 환경
- `Javascript`
- `TypeScript`
- Framework: NextJS
- Database: supabase

### 배포 환경
- 프론트엔드 서버 : Vercel
- 백엔드 서버 : CloudType

### 기술 스택
- 프론트엔드 프레임워크 : NextJS
- 백엔드 프레임워크 : Express

|라이브러리|||
|------|---|--|
|Tanstack-query|zustand|axios|
|tailwindCSS|socket.io|class-variance-authority|
|dayjs|react-spring|chart.js|

||API||
|------|---|---|
|[Kakao Map](https://apis.map.kakao.com/web/)|[Tosspayments](https://developers.tosspayments.com/)|[서울시 아동급식카드 가맹점 정보](https://data.seoul.go.kr/dataList/OA-15812/F/1/datasetView.do)|

|Tools||
|------|---|
|Git|Figma|

|Collaboration|||
|------|---|---|
|Github|Notion|Slack|


### 주요 기능

<details>
  <summary>봉사자 구인 커뮤니티</summary>

  - 봉사자 구인글 생성, 수정, 삭제
  - 홈화면에 피드형식으로 구인글 표시 (Infinite Scroll)
  - 봉사자 구인 신청자 관리
</details>

<details>
  <summary>아동급식카드 가맹점 지도 검색 및 무상식사 지원</summary>

  - Kakao Map API 활용한 지도 표시 및 장소 검색
  - 서울시 아동급식카드 가맹점 정보 데이터를 기반으로 지도에 매장 표시

  - 가맹점 점주 등록 및 해제
  - 점주의 무상식사 제공 글 생성
</details>

<details>
  <summary>정기 후원</summary>

  - Tosspayments 정기결제 API를 활용한 기능 구현
  - Express를 활용한 백엔드 구현 및 Axios를 통한 HTTP 통신
  - node-cron 패키지로 정기적인 결제 구현 (매달 1일)
</details>

<details>
  <summary>유저 간 채팅</summary>

  - Socket.io를 활용한 채팅 기능 구현
</details>

<details>
  <summary>후원기금 모금</summary>

  - Tosspayments 결제위젯 API를 활용한 결제창 구현
</details>

<details>
  <summary>후원 리포트</summary>

  - Chart.js를 활용한 차트 구현
</details>

### 세부 기능

<details>
  <summary>로그인 / 회원가입</summary>

  - zustand를 활용해 전역적으로 유저 데이터와 로그인 여부를 관리
</details>

<details>
  <summary>토스트</summary>

  - zustand를 활용한 전역적인 토스트들 관리
  - 컴포넌트의 생애주기를 활용한 토스트 생성 및 삭제
</details>

<details>
  <summary>알림</summary>

  - Supabase의 realtime 기능을 활용한 푸쉬알림 기능 구현
  - 채팅 알림 
  - 무상식사 공지 알림 (후원아동)
  - 정기 결제 알림 (후원자)
  - 정기 결연 등록 알림
</details>

<details>
  <summary>로딩 화면 애니메이션</summary>

  - react-spring를 활용한 나비 애니메이션 구현
  - NextJS의 loading.tsx로 로딩화면 구현
</details>
