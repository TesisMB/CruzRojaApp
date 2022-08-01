import { FcmService } from './fcm.service';
/* eslint-disable no-trailing-spaces */
import { CurrentUser } from './models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subject } from 'rxjs';
import { SplashScreen} from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
// import { App } from '@capacitor/app';
// import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  closed$ = new Subject<any>();
  showTabs = false; // <-- show tabs by default
  handler: any;
  constructor(
    private platform: Platform,
    private fcmService: FcmService,
    // private location: Location,
    // private routerOutlet: IonRouterOutlet,
    ) {
      this.initializeApp();
    }
    
    initializeApp(){
      this.platform.ready().then(() => {
        const setStatusBarStyleLight = async () => {
          await StatusBar.setStyle({ style: Style.Light });
        };

        SplashScreen.hide().then(()=>console.log(`SplashScreen hidden`));

         this.fcmService.initPush();

        });
      }
      
      ngOnInit() {
        // this.platform.backButton.subscribeWithPriority(10, () => {
        //  if (this.routerOutlet.canGoBack()) {
        //    this.location.back();
        //  } 
        // });
        //   else {
          //     App.exitApp();
          // }
        // this.handler = this.loginService.currentUserObs.subscribe(
          // (data: CurrentUser) =>{
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // (data) ? this.showTabs = true : this.showTabs = false;
      // });
    }

    ngOnDestroy() {
      // this.closed$.next();
      // this.handler.unsubscribe(); // <-- close subscription when component is destroyed
  }
}
