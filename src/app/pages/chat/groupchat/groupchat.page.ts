import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Messages } from '../../../models/Message';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { TypeChatRooms } from 'src/app/models';
import { ChatRooms } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { IonContent, IonFab, IonFabButton } from '@ionic/angular';

const CURRENT_USER_STYLE = "my-message";
const OTHER_MESSAGE_STYLE = "other-message";

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage implements OnInit {

  @ViewChild('#fab') scrollButton: IonFab;
  @ViewChildren(IonContent) content: IonContent;

  chat: ChatRooms;
  chatForm: FormGroup;
  chatHandler: any;
  id: number;
  handler: any;
  msj: Messages[] = [];
  currentUser = null;
  offset = 0;

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private services: LoginService
  ) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      FK_ChatRoomID: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.chatService.messageReceived.subscribe((data) => {
      this.msj.push(data);
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.id = +this.aRoute.snapshot.params.id;
    this.getById();

   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   console.log('LocalStorage', this.currentUser.userID);
  }

  getById() {
    this.handler = this.chatService.getById(this.id).subscribe(data => {
      this.chat = data;
      this.msj.push(...this.chat.messages);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  postChat() {
    this.chatForm.get('FK_ChatRoomID').patchValue(this.id);
    this.offset = 3;
    const msj: Messages = {
      message: this.chatForm.get('message').value,
      FK_ChatRoomID: this.chatForm.get('FK_ChatRoomID').value

    };

    this.chatHandler = this.chatService.post(msj)
      .subscribe(data => {
        console.log('Todo Bien', data);
      }, error => {
        console.log(error);
      });
      this.chatForm.reset();
      document.getElementById("message").focus();
  }

  getChat() {
    this.chatService.getById(this.id).subscribe(data => {
      this.chat = data;
      console.log(this.chat);
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    console.log(this.chatForm.value);
  }

  //Declaro callbacks para utilizar el scroll

  logScrollStart(event) {
    console.log("logScrollStart : When Scroll Starts", event);
  }

  logScrolling(event) {
    console.log("logScrolling : When Scrolling", event);
  }

  logScrollEnd(event) {
    console.log("logScrollEnd : When Scroll Ends", event);
  }

  //Funciones

  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }

}
