import { Component, Input, OnInit } from '@angular/core';
import { Chats, UserChatRooms } from 'src/app/models';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.css'],
})
export class InfoPage implements OnInit {
  @Input() chatInfo: string;
  isLoading = true;
  chat: Chats;
  id: number;


  constructor(
    private chatService: ChatService,
    private aRoute: ActivatedRoute,
    public service: GroupchatService,
    private route: Router,

  ) { 
    this.id = this.aRoute.snapshot.params.id;

  }

  ngOnInit() {
    this.getById();
  }


  goToUser(id: number){
    this.route.navigate(['/members/details',id], {relativeTo: this.aRoute});
  }
   
  
  goToMembers(){
    this.service.setChatMembers(this.chat.usersChatRooms);
    this.route.navigate(['/members', this.id], {relativeTo: this.aRoute});
  }


  getById() {
    this.chat = this.chatService.searchChat(this.id);

    console.log("Aca estoy!!! ", this.chat)
  }

}
