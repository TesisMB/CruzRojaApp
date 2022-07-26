import { User } from './../../../models/User';
/* eslint-disable @typescript-eslint/naming-convention */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Messages } from '../../../models/Messages';
import { Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ChatDate, ChatRooms, Chats } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
import { IonContent, IonFab, IonFabButton } from '@ionic/angular';
import { finalize, map } from 'rxjs/operators';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupChatPage implements OnInit, OnDestroy {
  @ViewChild('#fab') scrollButton: IonFab;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  isLoading = true;
  chat: Chats;
  msj: Messages[] = [];
  chatForm: FormGroup;
  messageHandler: any;
  currentUserHandler: any;
  currentGroupChatHandler: any;
  chatHandlerId: any;
  chatHandlerPost: any;
  chatHandlerGet: any;
  leaveChat: any;
  id: number;
  observableUser: User;
  currentUser = null;
  lastScrollTop = 0;
  pipe = new DatePipe('en-US');
  today = new Date();

  constructor(
    private chatService: ChatService,
    private service: GroupchatService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private services: LoginService,
    ) {

    this.id = this.aRoute.snapshot.params.id;
     this.service.setChatRoomId(this.id);

    this.service.createConnection();
    this.service.connectionStart();
  }

  async ngOnInit() {

    await this.getForm();
    await this.getById();
    await this.service.registerGroup();
    await this.service.registerMessage();
    await this.receivedMessage();
    await this.getCurrentUser();
    //Captar el CurrentUser mediante el LocalStorage
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log('LocalStorage', currentUser.userID);

    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('LocalStorage', this.currentUser.userID);



    // this.currentGroupChatHandler = this.service.currentGroupChat$.subscribe(data => {
    //   console.log('currentGroupChat$: ', data);
    // });


    // console.log('Id ==> ', this.id);

    /*     this.service.setChatRoomId(30);
     */
  }

  ionViewWillEnter(){
    // const chatSection = document.getElementById('chat');
    // chatSection.scrollTop = chatSection.scrollHeight;
   }


  changeFormat(){
    const ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    console.log('Fecha de hoy', ChangedFormat);
    return ChangedFormat;
  }

   getById() {
    //GET SALA DE CHAT, TRAE TODO EL CHAT.
    this.chatHandlerId = this.chatService.getById(this.id)
    .subscribe(data => {
      this.chat = data;
      this.isLoading = false;
      console.log(data);
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

 async receivedMessage(){
  //HUB CONNECTION - Trae los mensajes recibidos
  this.messageHandler = await this.service.messageReceived
  .subscribe(
    (data) => {
      this.pushMessage(data);
  },
   (error)=>{
    console.log('Error en Message Received => ', error);
  });
  }

  pushMessage(message: Messages): void{
    const today = this.changeFormat();
    const messageOfToday = this.chat.dateMessage.findIndex(x => x.createdDate === today);
    if(messageOfToday !== -1){
      this.chat.dateMessage[messageOfToday].messages.push(message);
    }
    else {
      const date: ChatDate = {
        createdDate: today,
        messages: [],
      };
      // date.createdDate = '26/07/2022';
      date.messages.push(message);
      this.chat.dateMessage.push(date);
    }
  }

   getCurrentUser(){
    this.currentUserHandler =  this.services.currentUserObs.subscribe(resp => {
      this.currentUser = resp;
    }, err => {
      console.log(err);
    });
  }

  postChat() {
    //POST DE MENSAJES.
    this.chatForm.get('id').patchValue(null);
    this.chatForm.get('messageState').patchValue(false);
    this.chatForm.get('createdDate').patchValue(this.pipe.transform(this.today, 'HH:mm'));
    this.chatForm.get('FK_ChatRoomID').patchValue(this.id);
    this.chatForm.get('fK_UserID').patchValue(this.currentUser.userID);
    this.chatForm.get('name').patchValue(this.currentUser.persons.firstName +' '+ this.currentUser.persons.lastName);

    // Agregamos un nuevo mensaje
    //envia todo los valores del formulario
    const msj = this.chatForm.value;
    console.log('chatForm', msj);

   if( this.chatForm.valid){
    this.pushMessage(msj);
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
}
  getForm(){
    this.chatForm = this.fb.group({
      id: [''],
      message: ['', Validators.required],
      messageState: ['', Validators.required],
      createdDate: ['', Validators.required],
      FK_ChatRoomID: ['', Validators.required],
      fK_UserID: ['', Validators.required],
      name: ['', Validators.required]
    });

}
  //Funciones

  // leaveGroup(){
  //   this.leaveChat = this.chatService.leaveGroup(this.currentUser.userID, this.id).subscribe(data => {
  //     console.log('Usted a salido exitosamente del grupo!');
  //   });
  // }

  // public handleScroll(event): void {
  //   if (event.detail.scrollTop >= this.lastScrollTop) {
  //        document.getElementById('fab-button').style.top = '100%';
  //   }else{
  //     document.getElementById('fab-button').style.top = '75%';
  //     document.getElementById('fab-button').style.right = '4%';
  //   }

  //   this.lastScrollTop = event.detail.scrollTop;
  // }

  scrollToBottom() {
    // this.content.scrollToBottom(1500);
  }

  ngOnDestroy() {
    this.service.stopConnection();
    this.messageHandler.unsubscribe();
    this.currentUserHandler.unsubscribe();
    // this.currentGroupChatHandler.unsubscribe();
    this.chatHandlerId.unsubscribe();
  }
}

