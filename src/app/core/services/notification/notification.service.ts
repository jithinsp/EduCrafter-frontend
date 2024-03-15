import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { CustomMessage } from '../../interfaces/user.model';
import { API_NOTIFICATION_SERVICE, API_USER_SERVICE } from '../../constants/baseurls.constant';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../auth/jwt.service';
import { webSocket } from 'rxjs/webSocket';
import * as SockJS from 'sockjs-client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient,
    private authService: JwtService,
    private snackBar: MatSnackBar) { }

  BASE_URI = API_NOTIFICATION_SERVICE;
  USER_URI = API_USER_SERVICE;

  getAllNotifications(): Observable<any> {
    return this.http.get(this.BASE_URI + 'notification/getAll');
  }

  publishNotifications(payload: any): Observable<any> {
    return this.http.post(this.BASE_URI + 'notification/publish', payload);
  }

  // greetings: string[] = [];
  disabled = true;

  private stompClient = null;

  // ngOnInit() {
  //   this.connect();
  // }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      // this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS(this.USER_URI + 'ws/testchat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect(
      {
        headers: this.authService.createAuthorizationHeader()
      }
      , function (frame) {
        console.log('Connected Hi: ' + frame);
        _this.stompClient.subscribe('/all/messages', function (hello) {
          console.log(hello.body);
          // _this.showMessage(JSON.parse(hello.body));
          _this.showMessage(hello.body);
        });
        _this.stompClient.subscribe('/all/sendToAll', function (hello) {
          console.log(hello.body);
          // _this.showMessage(JSON.parse(hello.body));
          _this.showChat(hello.body);
        });
      });
  }

  sendMessage(newmessage:string) {
    this.stompClient.send(
      '/ws/app/application',
      {},
      // JSON.stringify(this.newmessage)
      newmessage
    );
    console.log(newmessage);
    newmessage = "";
  }

  sendPrivateMessage(newmessage) {
    const currentUser = this.authService.extractUsername();
    if (!currentUser) {
      console.log('Cannot extract current username');
    }
  
    const username = currentUser.split('@')[0];
    const messageToSend = `${username}: ${newmessage}`;

    this.stompClient.send(
      '/ws/app/sendToAll',
      {},
      // JSON.stringify(messageToSend)
      newmessage
    );
    console.log(newmessage);
    // this.greetingsSubject.next(newmessage);
    newmessage = "";
  }

  private greetingsSubject: Subject<string> = new Subject<string>();
  greetings$ = this.greetingsSubject.asObservable();

  showMessage(message: string) {
    console.log(message);
    // this.greetingsSubject.next(message);
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
    });
  }

  showChat(message: string) {
    console.log(message);
    this.greetingsSubject.next(message);
  }
}