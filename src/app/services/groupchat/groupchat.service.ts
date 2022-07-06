import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Messages } from 'src/app/models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupchatService {

  public hubConnection: HubConnection;
  messageReceived: EventEmitter<Messages> = new EventEmitter();

  groupChatId: number = null;
  public currentGroupChat$: Observable<number>;
  private currentGroupChatSubject: BehaviorSubject<number>;
  private currentGroupChatID: BehaviorSubject<number>;

  constructor() {
    //Inicializo el BehaviorSubject como null
    this.currentGroupChatSubject = new BehaviorSubject<number>(null);
    //Conversion del BehaviorSubject a un observable(Escucha todo el tiempo y toma el ultimo valor)
    this.currentGroupChat$ = this.currentGroupChatSubject.asObservable();
    this.currentGroupChatID = new BehaviorSubject<number>(null);
  }

  public setChatRoomId(chatId: number) {
    this.currentGroupChatSubject.next(chatId);
  }

  sendMessage(message: Messages) {
    this.hubConnection.invoke('NewMessage', message);
  }

  groupConnection(connection: any) {
    //Tomo el valor que le paso a connection;
    this.groupChatId = connection;
    this.hubConnection.invoke('AddToGroup', connection);
  }

  //Me conecto al hub
  public createConnection() {
    const builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(environment.hubURL).build();
  }

  //Inicio la conexion
  public connectionStart() {
    this.hubConnection.start()
      //Les paso el valor nuevo desde el groupchatpage.ts valor1 = null - valor2 = sala
      .then(() => this.groupConnection(this.currentGroupChatSubject.value))
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
    this.currentGroupChatSubject.next(null);
  }

}
