import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ChatService extends DataService {
  chatsSubjects : BehaviorSubject<any> = null;
  chats$ : Observable<any>;

  constructor(http: HttpClient) {
    super(http, '/chatrooms');
  }

  joinGroup(id: number): Observable<any> {
    const FK_ChatRoomID = id;
    const coords = this.getPosition;
    const chatPatch = '/chatrooms/joingroup';
    return this.http.post(environment.apiURL + chatPatch, {FK_ChatRoomID, coords});
  }

  leaveGroup(userID: number, id: number){
    const FK_UserID = userID;
    const FK_ChatRoomID = id;
    const chatPatch = `/chatrooms/leavegroup/${FK_UserID}/${FK_ChatRoomID}`;
    return this.http.delete(environment.apiURL + chatPatch);
  }

  get getPosition(){
    let coords = {latitude: -66.764252, longitude: -70.184845};
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
