import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Capacitor} from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
path = '/sendDevice';
deviceToken = null;
  constructor(private router: Router, private http: HttpClient) { }
  public initPush(){
    if(Capacitor.getPlatform() !== 'web'){
      this.registerPush();
    }

  }
  public sendToken(emptyToken?){
    const deviceToken = this.deviceToken;
    if(emptyToken){
      return this.http.put(environment.apiURL+this.path, {emptyToken});
    } else {
       return this.http.put(environment.apiURL+this.path, {deviceToken});
  }
}

  private registerPush(){
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        this.deviceToken = token.value;
        console.log('token: ' + this.deviceToken);
      }
    );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
        (error: any) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        });
    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
     async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      });
      // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
    async (notification: ActionPerformed) => {
      const data = notification.notification.data;
      console.log('Push action performed: ' + JSON.stringify(notification.notification));
      this.notificationData(data);
    }
  );
  }

  private notificationData(data){
    if(data.alertId){
      console.log('Data de alerta => ', data.alertId);
      this.router.navigateByUrl(`/tabs/alertas/alerta/${data.alertId}`);
    }else if(data.chatId){
      console.log('Data de Chat => ', data.chatId);
      this.router.navigateByUrl(`/groupChat/${data.chatId}`);
    }else if(data.chatRoomId){
      console.log('Data de Solicitud => ', data.chatRoomId);
      this.router.navigateByUrl(`/tabs/chat`);
    }
    else if(data.JoinGroup){
      console.log('Data de Nueva solicitud => ', data.JoinGroup);
      this.router.navigateByUrl(`/memberlist/${data.JoinGroup}`);
    }else{
      console.log('Data de finalizacion de alerta => ', data.EndAlert);
      this.router.navigateByUrl(`/tabs/alertas`);
    }
  }

}
