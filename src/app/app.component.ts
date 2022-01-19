/* eslint-disable no-trailing-spaces */
import { CurrentUser } from './models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  closed$ = new Subject<any>();
  showTabs: boolean = false; // <-- show tabs by default
  handler: any;
  constructor(
    private router: Router,
    private platform: Platform,
    private loginService: LoginService) {
    }

    ngOnInit() {
      this.handler = this.loginService.currentUserObs.subscribe(
      (data: CurrentUser) =>{
        (data) ? this.showTabs = true : this.showTabs = false;
      });
    }

    ngOnDestroy() {
      this.closed$.next();
      this.handler.unsubscribe(); // <-- close subscription when component is destroyed
    }

  //    initializeApp() {
  //     this.platform.ready().then(() => {
  //       this.loginService.currentUserObs.subscribe(state => {
  //         if (state) {
  //           this.router.navigate(['menu']);
  //         } else {
  //           this.router.navigate(['login']);
  //         }
  //       });
  //     });
  // }
}
