import { filter, takeUntil } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  closed$ = new Subject<any>();
  showTabs = true; // <-- show tabs by default
  constructor(
    private router: Router,
    private platform: Platform,
    private loginService: LoginService) {
    }

    ngOnInit() {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this.closed$)
      ).subscribe(event => {
        if (event['url'] === '/login') {
          this.showTabs = false; // <-- hide tabs on specific pages
        }
      });
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