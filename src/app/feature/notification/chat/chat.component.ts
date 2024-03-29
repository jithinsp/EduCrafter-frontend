import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import * as Stomp from 'stompjs';
// import * as Stomp from 'stomp-websocket';
import  {Stomp} from '@stomp/stompjs';
// import { RxStompService } from '@stomp/rx-stomp';
import * as SockJS from 'sockjs-client';
import { BASE_URL, USER_SERVICE } from 'src/app/core/constants/baseurls.constant';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { JwtService } from 'src/app/core/services/auth/jwt.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  myGreetings: boolean[] = [];
  disabled = true;
  newmessage: string;
  username: string ='';
 
  private stompClient = null;

  constructor(private authService: JwtService,
    private notificationService: NotificationService){}

  ngOnInit() {
    this.showMessage();
    this.username = this.authService.extractUsername().split('@')[0];
  }
  
  sendMessage() {
    const trimmedMessage = this.newmessage.trim();

    if (trimmedMessage !== '') {
        this.notificationService.sendPrivateMessage(this.username + ': ' + trimmedMessage);
    }
    this.newmessage='';
  }

  showMessage() {
    this.notificationService.greetings$.subscribe((message: string) => {
      if(this.username === message.split(':')[0]){
        this.myGreetings.push(true);
        this.greetings.push(message.split(':')[1]);
      } else{
        this.greetings.push(message);
        this.myGreetings.push(false);
      }
      console.log(message);
    });
  }
}
