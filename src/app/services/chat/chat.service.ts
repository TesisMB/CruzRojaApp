import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends DataService{

  constructor(http: HttpClient) {
    super(http, '/chatrooms');
   }
}
