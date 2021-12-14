import { Messages } from '../../../models/Message';

import { Component } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage  {

  messages = [
    {
      user: 'simon',
      message: 'Hola, ¿como andas?',
      messageState: true,
      createDate: 155408085600
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

  hubConnection: HubConnection;

  constructor() {
    const builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl('https://localhost:5001/chat').build();

    this.hubConnection.on('notificar', (mensaje) =>{

      console.log(mensaje);

    });
    this.hubConnection.start();

  }

  value() {
    const btnSend = (document.getElementById('btnSend').addEventListener('click', (event) =>
    {
          const user = ((document.getElementById('user') as HTMLInputElement).value);
          const message = (( document.getElementById('chat-input') as HTMLInputElement).value);

          console.log(user + ' ' + message);
        })
    );
  };
}


