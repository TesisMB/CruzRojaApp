import { ChatRooms } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { CurrentUser } from './../../models/CurrentUser';
import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
})

export class ChatPage implements OnInit {
  handlerChat: any;
  loadingHandle: any;
  observableUser: CurrentUser;
  currentUserHandler: any;
  chatRooms:  ChatRooms[];
  activeTab: string = 'chats';

  constructor(
    public router: Router,
    public service: ChatService,
    private groupChatService: GroupchatService,
    private services: LoginService
  ) {

  }

  ngOnInit() {
    this.getChat();
    this.currentUserHandler = this.services.currentUserObs.subscribe(resp => {
      this.observableUser = resp;
    }, err => {
      console.log(err);
    });
  }

  segmentChange(e){
    this.activeTab = e.target.value;
  }

  navigateToGroupChat(id: number){
    this.groupChatService.setChatRoomId(id);
    this.router.navigate(['chat','groupChat', id]);
  }

  getChat() {
    this.handlerChat = this.service.getAll()
    .subscribe((x: ChatRooms[]) => {
      this.chatRooms = x;
      console.log('entro chat');
      //console.log("ChatRooms => ", this.chatRooms);
      console.log("Chat =>", this.chatRooms);
    });
  }
}
