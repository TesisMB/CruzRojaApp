import { ChatRooms } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { CurrentUser } from './../../models/CurrentUser';
import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
import { ChatService } from './../../services/chat/chat.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
})

export class ChatPage implements OnInit, OnDestroy {
  handlerChat: any;
  loadingHandle: any = true;
  observableUser: CurrentUser;
  currentUserHandler: any;
  chatRooms:  ChatRooms[] = [];
  activeTab = 'chats';
  isLoading = true;

  constructor(
    public router: Router,
    public service: ChatService,
    private groupChatService: GroupchatService,
    private ionLoader: LoaderService,
    private services: LoginService
  ) {

  }


 ionViewWillEnter() { // or you can use ionViewWillEnter()
  //  this.getChat();
 }

 async ngOnInit() {
   await this.getChat();
   await this.ionLoader.showLoader();
   await  this.getCurrentUser();
}

  getCurrentUser(){
    this.currentUserHandler = this.services.currentUserObs.subscribe(resp => {
      this.observableUser = resp;
    }, err => {
      console.log(err);
    });
  }

  segmentChange(e){
    this.activeTab = e.target.value;
  }

  navigateToGroupChat(id: number, index: number){
    // this.groupChatService.setChatRoomId(id);

    this.chatRooms[index].quantity = 0;
    this.router.navigate(['groupChat', id]);
  }

  getChat() {
   return this.handlerChat = this.service.getAll()
    .subscribe((x: ChatRooms[]) => {
      this.chatRooms = x;
     this.ionLoader.hideLoader();
    this.isLoading = false;
      console.log('Chat =>', this.chatRooms);
    },
    (err) => {
      console.log('Error');
      this.ionLoader.hideLoader();
      this.isLoading = false;
    });
  }

  ionViewDidLeave(){
  }
  ngOnDestroy(){
    this.handlerChat.unsubscribe();
    this.currentUserHandler.unsubscribe();
 }
}
