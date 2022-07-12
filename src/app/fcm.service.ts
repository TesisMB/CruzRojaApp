import { Injectable } from '@angular/core';
import {  Capacitor, Plugins} from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router) { }
public initPush(){
    if(Capacitor.getPlatform() !== 'web'){
      this.registerPush();
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
        console.log('token: ' + JSON.stringify(token.value));
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
      if(data.alertId){
        this.router.navigateByUrl(`/tabs/alertas/alerta/${data.alertId}`);
      }
    }
  );
  }
}
