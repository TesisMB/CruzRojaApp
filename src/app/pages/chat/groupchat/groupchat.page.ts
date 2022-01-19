import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Messages } from '../../../models/Message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ChatRooms } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage implements OnInit {
  chat: ChatRooms;
  chatForm: FormGroup;
  chatHandler: any;
  id: number;
  currentChat: any;
  handler: any;
  identificador: 0;

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private services: LoginService,
  ) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      FK_ChatRoomID: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = + this.aRoute.snapshot.params.id;
    this.getById();
    this.hubConnection();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', currentUser.userID);
  }

  value() {
    const btnSend = (document.getElementById('btnSend').addEventListener('click', (event) => {
      const user = ((document.getElementById('user') as HTMLInputElement).value);
      const message = ((document.getElementById('chat-input') as HTMLInputElement).value);

      console.log('user' + 'message');
    })
    );
  };

  getById() {
    this.handler = this.chatService.getById(this.id).subscribe(data => {
      this.chat = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  postChat() {
    this.chatForm.get('FK_ChatRoomID').patchValue(this.id);
    // Agregamos un nuevo mensaje
    const msj: Messages = {
      message: this.chatForm.get('message').value,
      FK_ChatRoomID : this.chatForm.get('FK_ChatRoomID').value,
     // createdDate: Date.now()
    };


    this.chatHandler = this.chatService.post(msj)
      .subscribe(data => {
        console.log(data);
        this.chat.messages.push(data.messages);


        //this.messages = data;
      }, error => {
        console.log(error);
      });
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
    this.postChat();
    this.chatForm.reset();
    this.content.scrollToBottom(0);
  }

  hubConnection(){
    this.chatService.eventMessage.subscribe(messageReception => {
      console.log('Mensaje recibido del Hub', messageReception);
      this.chat.messages.push(messageReception);
      console.log('Mensaje after push', this.chat);

    },
    error => {
      console.log('Se pikó el hub', error);
    });
  }
  /*  getColor(id: number) {
     const userId = this.services.currentUserValue.userID;

     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
     (id === userId) ? '#e4e415dc' : '#c93636';
   } */

}
