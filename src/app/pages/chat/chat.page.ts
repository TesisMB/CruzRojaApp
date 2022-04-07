import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
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
  loadingHandle: any;
  constructor(
    public router: Router,
    public service: ChatService,
    private groupChatService: GroupchatService
  ) {
    this.getChat();
  }

  ngOnInit() {

  }

  navigateToGroupChat(id: number){
    this.groupChatService.setChatRoomId(id);
    this.router.navigate(['chat','groupChat', id]);
  }




  getChat() {
    this.handlerChat = this.service.getAll().subscribe((x: TypeChatRooms[]) => {
      this.chatTypeList = x;
      console.log('entro chat');
      console.log(this.chatTypeList);
    });
  }
}
