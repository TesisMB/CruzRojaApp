import { ChatRooms } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { CurrentUser } from './../../models/CurrentUser';
import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeChatRooms, User } from 'src/app/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
})

export class ChatPage implements OnInit {
  handlerChat: any;
  chatTypeList: TypeChatRooms[] = [];
  loadingHandle: any;
  observableUser: CurrentUser;
  currentUserHandler: any;
  chatRooms:  ChatRooms[];

  constructor(
    public router: Router,
    public service: ChatService,
    private groupChatService: GroupchatService,
    private services: LoginService
  ) {
    this.getChat();
  }

  ngOnInit() {
    this.currentUserHandler = this.services.currentUserObs.subscribe(resp => {
      this.observableUser = resp;
    }, err => {
      console.log(err);
    });
  }

  navigateToGroupChat(id: number){
    this.groupChatService.setChatRoomId(id);
    this.router.navigate(['chat','groupChat', id]);
  }

  getChat() {
    this.handlerChat = this.service.getAll().subscribe((x: TypeChatRooms[]) => {
      this.chatTypeList = x;


      this.chatTypeList.forEach(item => {
        if(item.isGroupChat === true){
             this.chatRooms =  item.chatRooms.filter(a => a.emergenciesDisasters.locations.locationCityName == this.observableUser.estates.locationCityName);
        }
        });

        console.log('entro chat');
        console.log("ChatRooms => ", this.chatRooms);
        console.log("TypeChat =>", this.chatTypeList);
    });
  }
}
