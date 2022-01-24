import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Messages } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})

export class ChatService extends DataService {
  public hubConnection: HubConnection;
  messageReceived: EventEmitter<Messages> = new EventEmitter();

  constructor(http: HttpClient) {
    super(http, '/chatrooms');

    console.log('Inicio el servicio signal con cambio');

    const builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl('https://localhost:5001/chat').build();

    this.hubConnection.on('ReceiveMessage', (mensaje) => {
      const not: Messages = JSON.parse(mensaje);
      this.messageReceived.emit(not);

      console.log(mensaje);
    });


    this.hubConnection.start();
  }




}



