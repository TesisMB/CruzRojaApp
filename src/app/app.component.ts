import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private loginService: LoginService) {
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