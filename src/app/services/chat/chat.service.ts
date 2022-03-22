import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ChatService extends DataService {
  constructor(http: HttpClient) {
    super(http, '/chatrooms');
  }

  joinGroup(id: number): Observable<any> {
    const FK_ChatRoomID = id;
    const coords = this.getPosition;
    const chatPatch = '/chatrooms/joingroup';
    return this.http.post(environment.apiURL + chatPatch, {FK_ChatRoomID, coords});
  }

  get getPosition(){
    let chatGroup = {latitude: 31.0870016, longitude: 64.4907008, FK_ChatRoomID: 29};
    const coordsOptions = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
    /* if(!navigator.geolocation){ */
      const location = navigator.geolocation.watchPosition(data => {
        chatGroup.latitude = data.coords.latitude;
          console.log(chatGroup.latitude);
          chatGroup.longitude = data.coords.longitude;
          console.log(chatGroup.longitude);
      }, error=>{
        console.log('Error de Current Position: ', error);
      },
        coordsOptions
      );
   /*  } */
    return chatGroup;
  }

}
