import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chats, HubMessage, Messages, UserChatRooms } from 'src/app/models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupchatService {

  public hubConnection: HubConnection;
  messageReceived: EventEmitter<Messages> = new EventEmitter();

  groupChatId: number = null;
  public currentChatID$: Observable<number>;
  public currentUserChat$: Observable<UserChatRooms[]>;
  private currentGroupChatSubject: BehaviorSubject<Chats>;
  private currentUserChatSubject: BehaviorSubject<UserChatRooms[]>;
  private currentGroupChatID: BehaviorSubject<number>;

  constructor() {
    //Inicializo el BehaviorSubject como null
    this.currentGroupChatID = new BehaviorSubject<number>(null);
    this.currentUserChatSubject = new BehaviorSubject<UserChatRooms[]>(null);

    //Conversion del BehaviorSubject a un observable(Escucha todo el tiempo y toma el ultimo valor)
    this.currentChatID$ = this.currentGroupChatID.asObservable();
    this.currentUserChat$ = this.currentUserChatSubject.asObservable();
    this.currentGroupChatID = new BehaviorSubject<number>(null);
  }

  public setChatRoomId(chatId: number) {
    this.currentGroupChatID.next(chatId);
  }

  sendMessage(message: HubMessage) {
    this.hubConnection.invoke('NewMessage', message);
  }

  groupConnection(connection: any) {
    //Tomo el valor que le paso a connection;
    this.groupChatId = connection;
    this.hubConnection.invoke('AddToGroup', connection);
  }
  setChatMembers(members: UserChatRooms[]){
    this.currentUserChatSubject.next(members);
  }
  //Me conecto al hub
  public createConnection() {
    const builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(environment.hubURL).build();
  }

  //Inicio la conexion
  public  connectionStart() {
    this.hubConnection.start()
      //Les paso el valor nuevo desde el groupchatpage.ts valor1 = null - valor2 = sala
      .then(() => this.groupConnection(this.currentGroupChatID.value))
      .catch(() => console.log('Error'));
  }

  public registerGroup() {
    this.hubConnection.on('ShowWho', (connection) => {
      console.log(connection);
    });
  }

  public registerMessage() {

    this.hubConnection.on('ReceiveMessage', (mensaje: Messages) => {
      //const not: Messages = JSON.parse(mensaje);
      this.messageReceived.emit(mensaje);
      console.log(mensaje);
    });
  }

  //Detengo las conexiones
  public stopConnection() {
    this.hubConnection.stop();
    this.currentGroupChatID.next(null);
  }

}
