import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeChatRooms } from 'src/app/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
})

export class ChatPage implements OnInit {

  handlerChat: any;
  chatTypeList: TypeChatRooms[] = [];

  constructor(
    public router: Router,
    public service: ChatService
  ) { }

  ngOnInit() {
    this.getChat();
  }

  getChat(){
    this.handlerChat = this.service.getAll().subscribe((x: TypeChatRooms[]) =>{
    this.chatTypeList = x;
    console.log('entro chat')
    console.log(this.chatTypeList);
   });
  }

}
