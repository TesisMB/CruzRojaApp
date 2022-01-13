import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})

export class ChatService extends DataService{

  hubConnection: HubConnection;
  eventMessage: EventEmitter<any> = new EventEmitter();

  constructor(http: HttpClient) {
    super(http, '/chatrooms');

    const builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl('https://localhost:5001/chat').build();

    this.hubConnection.on('notificar', (mensaje) =>{

      console.log(mensaje);
      const messages = JSON.parse(mensaje);
      this.eventMessage.emit(messages);
    });

    this.hubConnection.start();
  }

}

