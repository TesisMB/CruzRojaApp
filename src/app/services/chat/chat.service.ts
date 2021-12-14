import { EventEmitter} from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Messages } from '../../models/Messages';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends DataService{
  private _hubConnection: HubConnection;

  notificacion: any;

  constructor(http: HttpClient) {
    super(http, '/chatrooms');
    this.createConnection();
    //this.startConnection();
  }

  private createConnection() {
    let builder = new HubConnectionBuilder();
    builder.withUrl(environment +'chat').build();
      console.log('entro createConnection');

      /* this._hubConnection.on("ReceiveMessage", (Messages, user) =>{
        user = 'yoel';


        console.log(user + '' + Messages);

        // let mje : any =JSON.parse(Messages);
        // this.notificacion.emit(mje);

      }); */
      this._hubConnection.start();
  }

  sendMessage(message: Messages, room, user,) {
    room = 'asd';
    user = 'yoel';
    this._hubConnection.invoke('SendMessage', message);
  }


}

