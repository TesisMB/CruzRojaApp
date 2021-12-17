import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Messages } from '../../../models/Message';
import { Component } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage  {

 mensajes =
 [
    {
      user: 'simon',
      message: 'Hola, ¿como andas?',
      messageState: true,
      createDate: new Date(155408085600)
    },
     {
      user: 'max',
      message: 'Todo bien, y vos?',
      messageState: true,
      createDate: 155408085600,
    },
    {
      user: 'simon',
      message: 'sa',
      messageState: true,
      createDate: 155408085600
    },
  ];

  chatForm: FormGroup;
  chatHandler: any;
  chat: Messages[] = [];

  constructor(
    private chatService: ChatService,
    private form: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.chatForm = this.form.group({
      user: ['yoel',[Validators.required]],
      messages: [],
      messageState: [false,[Validators.required]],
      createDate: ['20/12/21 - 20:00 pm',[Validators.required]],
    });
    this.chatService.eventMessage.subscribe(mjs =>{
      console.log('Evento recibido' , mjs);
    });
  }

  value() {
    const btnSend = (document.getElementById('btnSend').addEventListener('click', (event) =>
    {
          const user = ((document.getElementById('user') as HTMLInputElement).value);
          const message = (( document.getElementById('chat-input') as HTMLInputElement).value);

          console.log('user' + 'message');
        })
    );
  };

  postChat(){
    this.chatHandler = this.chatService.post(this.chatForm.value)
    .subscribe(data => {
      console.log(data);
      //this.messages = data;
    })
  }

   onSubmit(){
    console.log(this.chatForm.value);
    this.chatForm.controls.messages.reset();

   }
  }
