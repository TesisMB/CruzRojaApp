import { CurrentUser } from './models/CurrentUser';
import { filter, takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  closed$ = new Subject<any>();
  showTabs: CurrentUser; // <-- show tabs by default
  handler: any;
  constructor(
    private router: Router,
    private platform: Platform,
    private loginService: LoginService) {
    }

    
    ngOnInit() {
      this.handler = this.loginService.currentUserObs.subscribe(
      (data: CurrentUser) =>{ 
        this.showTabs = data;
      });
      /* this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this.closed$)
      ).subscribe(event => {
        if (event['url'] !== '/login') {
          this.showTabs = true; // <-- hide tabs on specific pages
        }
      });*/
    }
    
    ngOnDestroy() {
      this.closed$.next(); // <-- close subscription when component is destroyed
    }
   
    initializeApp() {
      this.platform.ready().then(() => { 
        this.loginService.authState.subscribe(state => {
          if (state) {
            this.router.navigate(['menu']);
          } else {
            this.router.navigate(['login']);
          }
        });
      });
  }
}