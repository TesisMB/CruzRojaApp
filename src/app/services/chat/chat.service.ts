import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Messages } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})

export class ChatService extends DataService {


  constructor(http: HttpClient) {
    super(http, '/chatrooms');
  }
}
