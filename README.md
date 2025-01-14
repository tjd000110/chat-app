# chat-app

<h3>1. 프로젝트 소개 </h3>

- 해당 프로젝트는 양방향 통신 채팅 어플입니다.

- 서버를 실행하고 설정된 포트 4000번으로 접속을 하면, 아래와 같이 유저이름과, 방이름을 작성할 수 있는 화면이 실행됩니다.

 ![index html화면](https://github.com/user-attachments/assets/9713f81a-6db9-4893-8339-c2d0468a2622)
 

- 채팅방 이름을 입력하면, 하나의 채팅방이 개설됩니다. 실행되어있는 서버에 접속후, 다른 유저들도 해당 채팅방에 접속이 가능합니다.

  ![chat html화면](https://github.com/user-attachments/assets/fcc19b2d-fffa-4116-b29d-129775081145)
  

- 하단의 '메세지를 입력하세요' 창에 누구든 메세지를 입력하고 보낼수 있습니다.
 
  ![chatting](https://github.com/user-attachments/assets/0740e922-c74e-458e-bb3a-5582f170dd6e)


- 사용자들은 언제든 방을 퇴장할수 있으며, 입장과 퇴장시 알림을 받습니다.

  ![exit](https://github.com/user-attachments/assets/ddd62dc9-17d6-481a-9f97-398eca79dfca)

<br>

<h3>2. 기능 소개</h3>

- 실시간 양방향 소켓 연결.
  - socket.io라이브러리를 사용하여 서버와 클라이언트간 실시간 통신을 수행.
  - 새로운 사용자가 연결되거나 또는 메세지를 보낼때 실시간 업데이트.
 
- 채팅방 관리
  - join 이벤트를 통하여 특정 채팅방에 입장 가능.
  - 채팅방에 새로운 사용자 입장시, 다른 참가자들에게도 참가 알림 전송.
 
- 메세지 생성
  - generateMessage 함수를 통하여 각 메세지에 사용자 이름, 내용, 전송시각을 포함한 메세지 객체를 생성
 
  
