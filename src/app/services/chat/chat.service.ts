import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatRooms, UserChatRooms } from 'src/app/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatService extends DataService {
  chatRooms: any [] = [];
  userChatRooms: any [] = [];
  private chats$: BehaviorSubject<ChatRooms[]> = new BehaviorSubject<ChatRooms[]>([]);
  public quantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public usersChatRooms$: BehaviorSubject<UserChatRooms[]> = new BehaviorSubject<UserChatRooms[]>([]);

  //chats$: Observable<any>;
  params = {
    status: null,
    UserID: null,
    chatroomid: null
  };

  constructor(http: HttpClient) {
    super(http, '/chatrooms');
  }


get userChatRoomsObservable$(){
  return this.usersChatRooms$.asObservable();
}

get quantityObservable$(){
  return this.quantity$.asObservable();
}

setQuantity(quantity: number){
  // quantity = quantity - 1;
  console.log("CANTIDAD!! ", quantity);
 this.quantity$.next(quantity);
}

 setUserChatRooms(userChatRooms: UserChatRooms[]){
   console.log("Servicio!! ", userChatRooms);
  this.usersChatRooms$.next(userChatRooms);
}


WithoutFalse(userChatRooms: UserChatRooms[]){
userChatRooms = userChatRooms.filter(x => x.status === false);
return userChatRooms;
}


searchUser(id){
  const index =  this.userChatRooms.findIndex(x => x.userID == id);

  const deleteUser = this.userChatRooms.splice(index, 1);

  console.log('deleteChatRooms =>', deleteUser);

  this.uploadUser(this.userChatRooms);
}

uploadUser(userChatRooms: UserChatRooms[]){
  this.userChatRooms = userChatRooms;
  this.usersChatRooms$.next(userChatRooms);
}


get chatRoomsObservable$(){
  return this.chats$.asObservable();
}

setChatRooms(chat: ChatRooms[]){
  this.chats$.next(chat);
}

searchChat(id){
  const chat = this.chatRooms.find(x => x.id == id);
  console.log('SearchChat => ', chat);

  return chat;
}

postVolunteerConfirmation(id, chatRoomID, s?){
   this.params = {
     UserID: id || undefined,
     chatroomid: chatRoomID || undefined,
     status: s || undefined,
  };



  this.options.params  = new HttpParams({fromObject: this.params});

  console.log('headers ', this.options.headers);
  // eslint-disable-next-line max-len
  return this.http.post<any>(environment.apiURL + this.patch + '/AcceptRejectRequest/', {}, this.options);
}

getVolunteers(id, s?){
  const params = {
    status: s || undefined
  };
  params.status = s;
  this.options.params  = new HttpParams({fromObject: params});
  return this.http.get<any>(environment.apiURL + this.patch + '/' + id,this.options).pipe(map(x => {
    this.userChatRooms = x.usersChatRooms;
    this.usersChatRooms$.next(x.usersChatRooms);

    return x;
  }));
  // return this.http.get<any>(environment.apiURL + this.patch + '/' + id, + '?status=' + s);
}

public deleteChatRoom(id){
 const iD = Number(id);
  const index =  this.chatRooms.findIndex(x => x.id === iD);

  const deleteChatRooms= this.chatRooms.splice(index, 1);

  console.log('deleteChatRooms =>', deleteChatRooms);

  this.uploadChatRooms(this.chatRooms);
}


public uploadChatRooms(chatRooms: ChatRooms[]) {
  this.chatRooms = chatRooms;
  this.chats$.next(this.chatRooms);
}



  joinGroup(id: number): Observable<any> {
    const FK_CHATROOMID = id;
    const coords = this.getPosition;
    const chatPatch = '/chatrooms/joingroup';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post(environment.apiURL + chatPatch, {FK_CHATROOMID, coords});
  }

  leaveGroup(userID: number, id: number){
    const FK_USERID = userID;
    const FK_CHATROOMID = id;
    const chatPatch = `/chatrooms/leavegroup/${FK_USERID}/${FK_CHATROOMID}`;
    return this.http.delete(environment.apiURL + chatPatch);
  }

  get getPosition(){
    const coords = {latitude: -66.764252, longitude: -70.184845};
    const coordsOptions = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
    /* if(!navigator.geolocation){ */
      const location = navigator.geolocation.watchPosition(data => {
        coords.latitude = data.coords.latitude;
          console.log(coords.latitude);
          coords.longitude = data.coords.longitude;
          console.log(coords.longitude);
      }, error=>{
        console.log('Error de Current Position: ', error);
      },
        coordsOptions
      );
   /*  } */
    return coords;
  }

}
