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


  constructor(http: HttpClient) {
    super(http, '/chatrooms');
  }


}

