import { TypeChatRooms } from './../../../models/TypeChatRooms';
import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage  {


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
          const message = (( document.getElementById('message') as HTMLInputElement).value);

          console.log(user + ' ' + message);
        })
    );
  };
}


