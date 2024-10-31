# <img src="https://github.com/Nabi-06/Nabi/blob/develop/src/app/favicon.ico" width=25 height=25 alt="nabi logo" /> Nabi
[나비 서비스 바로가기](https://nabi-psi.vercel.app, "나비 서비스")

나비는 경제적으로 어려움을 겪고 있는 아동과 후원자들을 연결하여 따뜻한 사회적 지원을 가능하게 하는 웹 서비스입니다. 나비는 아동급식카드 가맹점 위치 기반 검색, 후원아동을 위한 봉사자 모집과 커뮤니티 서비스, 정기 결연 등 다양한 후원자와 후원아동을 위한 서비스을 제공하여 아동과 후원자의 소통을 돕습니다.

### ⏰ 개발 기간
`2024.10.08 ~ 2024.11.01`

### 👥 개발자 소개
- __양은석(팀장)__ : 정기 후원, 후원기금 모금, 지도 표시 및 검색, 알림, 토스트 , 로딩 애니메이션, DB 설계, 백엔드 개발, 반응형 구현, 데스크탑 UI 및 로고 디자인 등
- __심우섭(팀원)__ : 프로필 화면, 후원 리포트 애니메이션 및 차트, 로그인, 회원가입, 봉사자 모집글 신청자 관리, 반응형 구현 등 
- __조은진(팀원)__ : 홈 화면, 봉사자 모집글(CRUD), 감사인사(CRUD), 반응형 UI 디자인 및 구현 등

### 📊 Database ERD
![DatabaseERD](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/DatabaseERD)
  
### 🚀 배포 환경
- 프론트엔드 서버 : `Vercel`
- 백엔드 서버 : `CloudType`

### 📚 기술 스택
- 언어 : `JavaScript & TypeScript`
- 프론트엔드 프레임워크 : `next.js`
- 백엔드 프레임워크 : `express.js`

|📕 라이브러리|
|-------|
|Tanstack-query|
|zustand|
|tailwind CSS|
|axios|
|socket.io|
|chart.js|
|class-variance-authority|
|react-spring|
|dayjs|

|🌎 API|
|------|
|[Kakao Map](https://apis.map.kakao.com/web/)|
|[Tosspayments](https://developers.tosspayments.com/)|
|[서울시 아동급식카드 가맹점 정보](https://data.seoul.go.kr/dataList/OA-15812/F/1/datasetView.do)|

|🫂 Collaboration|
|------|
|Github|
|Notion|
|Slack|

### 📝 주요 기능

#### 카카오맵 API와 공공데이터를 결합한 아동급식카드 가맹점 지도 검색 및 무상식사 지원 [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%EC%95%84%EB%8F%99%EA%B8%89%EC%8B%9D%EC%B9%B4%EB%93%9C-%EA%B0%80%EB%A7%B9%EC%A0%90-%EC%A7%80%EB%8F%84-%EA%B2%80%EC%83%89-%EB%B0%8F-%EB%AC%B4%EC%83%81%EC%8B%9D%EC%82%AC-%EC%A7%80%EC%9B%90-WIKI, "WIKI 링크")

  - Kakao Map API 활용한 지도 표시 및 장소 검색
  - 서울시 아동급식카드 가맹점 정보 데이터를 기반으로 지도에 매장 표시
  - 가맹점 점주 등록 및 해제
  - 점주의 무상식사 제공 글 생성

#### 토스페이먼츠 API를 활용한 정기 후원 및 후원기금 모금 [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%ED%86%A0%EC%8A%A4%ED%8E%98%EC%9D%B4%EB%A8%BC%EC%B8%A0-API-%ED%99%9C%EC%9A%A9%ED%95%9C-%EA%B2%B0%EC%A0%9C%EA%B8%B0%EB%8A%A5-WIKI, "WIKI 링크")

  - Tosspayments 정기결제 API를 활용한 기능 구현
  - Express를 활용한 백엔드 구현 및 Axios를 통한 HTTP 통신
  - node-cron 패키지로 정기적인 결제 구현 (매달 1일)
  - Tosspayments 결제위젯 API를 활용한 후원기금 모금 결제창 구현

#### Socket.io를 활용한 유저 간 실시간 채팅 [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%EC%9C%A0%EC%A0%80-%EA%B0%84-%EC%B1%84%ED%8C%85-WIKI, "WIKI 링크")

  - Socket.io를 활용한 채팅 기능 구현
  - 채팅내역 백엔드에서 실시간 데이터 처리

#### Chart.js를 활용한 후원 리포트 [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%ED%9B%84%EC%9B%90-%EB%A6%AC%ED%8F%AC%ED%8A%B8-WIKI, "WIKI 링크")

  - Chart.js를 활용한 수입, 지출, 후원내역 등 차트 구현


### 📝 세부 기능

#### zustand를 활용한 로그인 상태 관리 (로그인 / 회원가입) [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%EB%A1%9C%EA%B7%B8%EC%9D%B8---%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-WIKI, "WIKI 링크")

  - zustand를 활용해 전역적으로 유저 데이터와 로그인 여부를 관리

#### 컴포넌트의 생애주기를 활용한 토스트 구현 [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%ED%86%A0%EC%8A%A4%ED%8A%B8-WIKI, "WIKI 링크")

  - zustand를 활용한 전역적으로 토스트 목록 관리
  - 컴포넌트의 생애주기를 활용한 토스트 생성 및 삭제

#### supabase의 realtime을 활용한 알림 [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%EC%95%8C%EB%A6%BC-WIKI, "WIKI 링크")

  - Supabase의 realtime 기능을 활용한 푸쉬알림 기능 구현
  - 알림 이벤트 목록 
    - 채팅 알림 
    - 무상식사 공지 알림 (후원아동)
    - 정기 결제 알림 (후원자)
    - 정기 결연 등록 알림

#### react-spring을 활용한 로딩 화면 애니메이션 [WIKI 링크](https://github.com/Nabi-06/Nabi/wiki/%EB%A1%9C%EB%94%A9-%ED%99%94%EB%A9%B4-WIKI, "WIKI 링크")

  - react-spring를 활용한 나비 애니메이션 구현
  - next.js의 loading.tsx로 로딩화면 구현

#### 모바일, 태블릿 사용자를 위한 반응형 디자인

<details>
  <summary>반응형 디자인 Views</summary>

  ![home](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-home.png)
  ![recruits](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-recruits.png)
  ![profile](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-profile.png)
  ![freemeal](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-freemeal.png)
  ![map](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-map.png)
  ![storeInfo](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-storeInfo.png)
  ![chatlist](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-chatlist.png)
  ![chatscreen](https://github.com/Nabi-06/Nabi/blob/develop/ScreenShots/Views/Responsive/responsive-chatscreen.png)
</details>

