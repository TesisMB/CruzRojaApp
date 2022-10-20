import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatRooms } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})

export class ChatService extends DataService {
  chatRooms: any [] = [];
  private chats$: BehaviorSubject<ChatRooms[]> = new BehaviorSubject<ChatRooms[]>([]);
  //chats$: Observable<any>;


  constructor(http: HttpClient) {
    super(http, '/chatrooms');
  }


get chatRoomsObservable$(){
  return this.chats$.asObservable();
}

setChatRooms(chat: ChatRooms[]){
  this.chats$.next(chat);
}

searchChat(id){
  const chat = this.chatRooms.find(x => x.id === id);
  console.log('SearchChat => ', chat);

  return chat;
}

postVolunteerConfirmation(id, chatroomid, s?){
  const params = {
    status: s || undefined,
  };
  params.status = s;
  this.options.params  = new HttpParams({fromObject: params});
  // eslint-disable-next-line max-len
  return this.http.post<any>(environment.apiURL + this.patch + '/AcceptRejectRequest' + '/' + chatroomid + '?' + 'status=', s  + '&userId=', id);
  //https://localhost:5001/api/chatrooms/AcceptRejectRequest/5?status=true&userId=5
}

getVolunteers(id, s?){
  const params = {
    status: s || undefined
  };
  params.status = s;
  this.options.params  = new HttpParams({fromObject: params});
  return this.http.get<any>(environment.apiURL + this.patch + '/' + id,this.options);
  // return this.http.get<any>(environment.apiURL + this.patch + '/' + id, + '?status=' + s);
  //https://localhost:5001/api/chatrooms/20?status=false&userId=5
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
