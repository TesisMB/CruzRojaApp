import { User } from './../../../models/User';
/* eslint-disable @typescript-eslint/naming-convention */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Messages } from '../../../models/Message';
import { Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ChatRooms } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
import { IonContent, IonFab, IonFabButton } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage implements OnInit, OnDestroy {
  @ViewChild('#fab') scrollButton: IonFab;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  chat: ChatRooms;
  msj: Messages[] = [];
  chatForm: FormGroup;
  messageHandler: any;
  currentUserHandler: any;
  currentGroupChatHandler: any;
  chatHandlerId: any;
  chatHandlerPost: any;
  chatHandlerGet: any;
  id: number;
  observableUser: User;
  currentUser = null;
  lastScrollTop = 0;

  constructor(
    private chatService: ChatService,
    private service: GroupchatService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private services: LoginService
  ) {

    this.id = this.aRoute.snapshot.params.id;
    this.service.setChatRoomId(this.id);

    this.chatForm = this.fb.group({
      message: ['', Validators.required],
      FK_ChatRoomID: ['', Validators.required],
      FK_UserID: ['', Validators.required],
      name: ['', Validators.required]
    });

    this.service.createConnection();
    this.service.connectionStart();
  }

  ngOnInit() {
    this.messageHandler = this.service.messageReceived.subscribe((data) => {
      this.msj.push(data);

    }, (error)=>{

    });
    //Captar el CurrentUser mediante el LocalStorage
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log('LocalStorage', currentUser.userID);

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', this.currentUser.userID);

    this.currentUserHandler = this.services.currentUserObs.subscribe(resp => {
      this.observableUser = resp;
    }, err => {
      console.log(err);
    });

    this.currentGroupChatHandler = this.service.currentGroupChat$.subscribe(data => {
      console.log('currentGroupChat$: ', data);
    });


    console.log('Id ==> ', this.id);
    this.getById();

    /*     this.service.setChatRoomId(30);
     */
    this.service.registerGroup();
    this.service.registerMessage();
  }

  getById() {
    this.chatHandlerId = this.chatService.getById(this.id).subscribe(data => {
      this.chat = data;
      this.msj.push(...this.chat.messages);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  postChat() {
    this.chatForm.get('FK_ChatRoomID').patchValue(this.id);
    this.chatForm.get('FK_UserID').patchValue(this.observableUser.userID);
    this.chatForm.get('name').patchValue(this.observableUser.persons.firstName)

    // Agregamos un nuevo mensaje
    //envia todo los valores del formulario
    const msj = this.chatForm.value;
    console.log('chatForm', msj);

    this.chatHandlerPost = this.chatService.post(msj).pipe(
      finalize(() => {
        // this is called on both success and error
        console.log('finalize');
        this.scrollToBottom();
      }))
    .subscribe(data => {
      console.log('Todo Bien');
      this.service.sendMessage(data);
    },
      error => {
        console.log(error);
      });
    this.chatForm.reset();
  }

  getChat() {
    this.chatHandlerGet = this.chatService.getById(this.id).subscribe(data => {
      this.chat = data;
      console.log(this.chat);
    }, error => {
      console.log(error);
    });
  }

  //Funciones
  public handleScroll(event): void {
    if (event.detail.scrollTop >= this.lastScrollTop) {
         document.getElementById('fab-button').style.top = '100%';
    }else{
      document.getElementById('fab-button').style.top = '75%';
      document.getElementById('fab-button').style.right = '4%';
    }

    this.lastScrollTop = event.detail.scrollTop;
  }

  scrollToBottom() {
    this.content.scrollToBottom(1500);
  }

  ngOnDestroy() {
    this.service.stopConnection();
    this.messageHandler.unsubscribe();
    this.currentUserHandler.unsubscribe();
    this.currentGroupChatHandler.unsubscribe();
    this.chatHandlerId.unsubscribe();
  }
}

