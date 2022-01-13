import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Messages } from '../../../models/Message';
import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { TypeChatRooms } from 'src/app/models';
import { ChatRooms } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage implements OnInit {



  /*   chat =
  [
    {
      user: 'simon',
      message: 'Hola, ¿como andas?',
      messageState: true,
      createdDate: new Date(155408085600)
    },
    {
      user: 'max',
      message: 'Todo bien, y vos?',
      messageState: true,
      createdDate: 155408085600,
    },
    {
      //user: 'simon',
      message: 'sa',
      messageState: true,
      createdDate: 155408085600
    },
  ]; */

  chat: ChatRooms;
  chatForm: FormGroup;
  chatHandler: any;
  id: number;
  currentChat: any;
  handler: any;
  identificador: 0;

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

  // eslint-disable-next-line @typescript-eslint/member-ordering

  /*   console.log('Get', user.userID);
   */

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.id = +this.aRoute.snapshot.params.id;
    this.getById();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', currentUser.userID);

    /* const user = this.services.currentUserValue;

    console.log('Get', user.userID); */
    /*   this.chatForm = this.form.group({
         user: ['yoel', [Validators.required]],
         messages: [],
         messageState: [false, [Validators.required]],
         createDate: ['20/12/21 - 20:00 pm', [Validators.required]],
       });
       this.chatService.eventMessage.subscribe(mjs => {
         console.log('Evento recibido', mjs);
       }); */
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      FK_ChatRoomID: this.chatForm.get('FK_ChatRoomID').value

    };

    this.chatHandler = this.chatService.post(msj)
      .subscribe(data => {
        console.log(data);

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
    console.log(this.chatForm.value);
    this.chatForm.controls.messages.reset();
  }

  /*  getColor(id: number) {
     const userId = this.services.currentUserValue.userID;
 
     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
     (id === userId) ? '#e4e415dc' : '#c93636';
   } */

}
