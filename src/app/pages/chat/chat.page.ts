import { UserChatRooms } from './../../models/UserChatRooms';
import { map, tap } from 'rxjs/operators';
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
    const user: UserChatRooms = {
      name: this.observableUser.persons.firstName + ' ' + this.observableUser.persons.lastName,
      userID: this.observableUser.userID,
      userDni: this.observableUser.userDni,
      roleName: null
    };

    this.handlerChat = this.service.getAll()
    .pipe(map(x =>{
      var chats = x;
      x.forEach(item => {
        if(item.isGroupChat === true){
          chats =  item.chatRooms.filter(a => a.emergenciesDisasters.locations.locationCityName == this.observableUser.estates.locationCityName && a.userChatRooms.includes(user));
      }
    });
      console.log(chats);
      return chats;
    }

    ))
    .subscribe((x: TypeChatRooms[]) => {
      this.chatTypeList = x;
      console.log('entro chat');
      //console.log("ChatRooms => ", this.chatRooms);
      console.log("TypeChat =>", this.chatTypeList);
    });
  }
}
