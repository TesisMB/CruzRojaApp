import { User } from './../../../models/User';
/* eslint-disable @typescript-eslint/naming-convention */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HubMessage, Messages } from '../../../models/Messages';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChatDate, ChatRooms, Chats } from 'src/app/models/ChatRooms';
import { LoginService } from 'src/app/services/login/login.service';
import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
import { ActionSheetController, IonContent, IonFab, IonFabButton } from '@ionic/angular';
import { finalize, map } from 'rxjs/operators';
import { DatePipe, Location } from '@angular/common';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupChatPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('#fab') scrollButton: IonFab;
  @ViewChild(IonContent) content: IonContent;
  // @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

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
  handlerChat: any;
  chatRooms:  ChatRooms[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    private chatService: ChatService,
    private service: GroupchatService,
    private fb: FormBuilder,
    private route: Router,
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
    //  const chatSection = document.getElementById('chat');
    //  chatSection.scrollTop = chatSection.scrollHeight;
  }

ngAfterViewInit(){
  // this.logScrolling(this.chat.dateMessage[this.chat.dateMessage.length-1].messages.length - 1, 'auto');

}
 get changeFormat(){
    const ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    // console.log('Fecha de hoy', ChangedFormat);
    return ChangedFormat;
  }
  logScrolling(index, mode){
console.log(index);
// this.viewPort.scrollToIndex(index, mode);
  }

  isLast(i,j): boolean{
   if(this.chat.dateMessage[i].messages[j+1]){
   return this.chat.dateMessage[i].messages[j+1].userID === this.currentUser.userID;
   }
return true;
  }

  getById() {
    //GET SALA DE CHAT, TRAE TODO EL CHAT.
    this.chatHandlerId = this.chatService.getById(this.id)
    .pipe(
      finalize(() => {
        // this is called on both success and error
        if( this.content){
          this.content.scrollToBottom(400);
          console.log('Si hay content');
        }
        else {
          console.log('No hay content');
        }
       }))
    .subscribe(data => {
      this.chat = data;
      this.isLoading = false;
      console.log(data);
    }, error => {
      this.isLoading = false;
      console.log(error);

    });
  }

  receivedMessage(){
  //HUB CONNECTION - Trae los mensajes recibidos
  this.messageHandler =  this.service.messageReceived
  .subscribe(
    (data) => {
      this.pushMessage(data);
    },
    (error)=>{
      console.log('Error en Message Received => ', error);
    });
  }

  pushMessage(message: Messages): void{
    const today = this.changeFormat;
    const messageOfToday = this.chat.dateMessage.findIndex(x => x.createdDate === today);
    let lastIndex = -1;
    if(messageOfToday !== -1){
      lastIndex =  this.chat.dateMessage[messageOfToday].messages.push(message);
    }
    else {
      const date: ChatDate = {
        createdDate: today,
        messages: [],
      };
      // date.createdDate = '26/07/2022';
      date.messages.push(message);
      lastIndex = this.chat.dateMessage.push(date) - 1;
    }
      this.content.scrollToBottom(1500);

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
    this.chatForm.get('createdDate').patchValue(this.pipe.transform(this.today, 'HH:mm', '-0300'));
    this.chatForm.get('chatRoomID').patchValue(this.id);
    this.chatForm.get('userID').patchValue(this.currentUser.userID);
    this.chatForm.get('name').patchValue(this.currentUser.persons.firstName +' '+ this.currentUser.persons.lastName);
    document.getElementById('btnSend').style.backgroundColor = '#feacac';

    // Agregamos un nuevo mensaje
    //envia todo los valores del formulario
    const form: Messages = this.chatForm.value;
    console.log('chatForm', form);

   if( this.chatForm.valid){
  const msj: HubMessage = {
  chatRoomID: form.chatRoomID,
  userID: form.userID,
  message: form.message,
  createdDate: this.today
  };

    // this.pushMessage(form);
    this.chatHandlerPost = this.chatService.post(msj).pipe(
      finalize(() => {
        // this is called on both success and error
        console.log('finalize');
        this.content.scrollToBottom(1500);
       }))
    .subscribe(data => {
      this.service.sendMessage(msj);
      console.log('Todo Bien', this.chat);

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
      chatRoomID: ['', Validators.required],
      userID: ['', Validators.required],
      name: ['', Validators.required]
    });
}

infoChat(id: number){
  this.route.navigate(['info', id]);
}

  //Funciones
  goToMembers(){
    this.service.setChatMembers(this.chat.usersChatRooms);
    this.route.navigate(['/members', this.id], {relativeTo: this.aRoute});
  }

  leaveGroup(){
   // this.route.navigate(['tabs','chat']);
    this.leaveChat = this.chatService.leaveGroup(this.currentUser.userID, this.id)
    .subscribe(data => {
    this.route.navigate(['/tabs/chat'], {relativeTo: this.aRoute});
      console.log('Usted a salido exitosamente del grupo!');
      this.chatService.deleteChatRoom(this.id);
    });
  }



  onQueryChange(query: string = ''){
    
    if(query !== ''){
      document.getElementById('btnSend').style.backgroundColor = 'rgb(216, 58, 53)';
    }else{
      document.getElementById('btnSend').style.backgroundColor = '#feacac';
    }

  }


  public handleScroll(event): void {
    if (event.detail.scrollTop >= this.lastScrollTop) {
         document.getElementById('fab-button').style.top = '100%';
         document.getElementById('fab-button').style.display = 'block';
    }else{
      document.getElementById('fab-button').style.top = '75%';
      document.getElementById('fab-button').style.right = '4%';
    }

    this.lastScrollTop = event.detail.scrollTop;
  }

  scrollToBottom() {
     this.content.scrollToBottom(1000);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Ver miembros',
        // role: 'selected',
        icon: 'people-outline',
        id: 'participant-button',
        data: {
          type: 'voluntarios'
        },
        handler: () => {
          this.goToMembers();
        }
      },
      {
        text: 'Abandonar',
        icon: 'trash',
        data: {
          type: 'voluntarios'
        },
        handler: () => {
          console.log('Abandonar clicked');
          this.leaveGroup();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }


  ngOnDestroy() {
    this.service.stopConnection();
    this.messageHandler.unsubscribe();
    this.currentUserHandler.unsubscribe();
    // this.currentGroupChatHandler.unsubscribe();
    this.chatHandlerId.unsubscribe();
  }
}

