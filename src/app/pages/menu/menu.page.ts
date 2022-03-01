import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'ionic';
import { LoginService } from 'src/app/services/login/login.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-menu',
  template: `
    <ion-fab horizontal='end'>
      <ion-fab-button (click)="pushPage()">
        <ion-icon name='person-outline'></ion-icon>
      </ion-fab-button>
    </ion-fab>`,
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.css'],
})
//'./profile.page.html'}
export class MenuPage implements OnInit {

  users: User;
  handlerProfile: any;
  service: ProfileService;
  id: number;
  currentUser: any;

  constructor(
   /*  private router: Router, */
    private menuCtrl: MenuController,
    private loginService: LoginService,
    private router: Router,
  ) {
  }

  ngOnInit(){
    /*  this.getProfile(); */
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getProfile(){
      this.handlerProfile = this.service.getById(this.currentUser.userID)
      .subscribe((x: User) =>{
      console.log('ingreso');
      this.users = x;
      console.log(this.users);
    });
  }

  /* Menu Functions */

  navigateAccount(){
    this.router.navigate(['/cuenta']);
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(){
    if(this.handlerProfile){
      this.handlerProfile.unsubscribe();
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle('end');
  }


/*   navigateTabHome(){
    this.router.navigate(['/home']);
  }

  navigateTabAlert(){
    this.router.navigate(['/alertas']);
  }

  navigateTabChat(){
    this.router.navigate(['/chat']);
  }

  navigateTabAlertProfile(){
    this.router.navigate(['/profile']);
  }
*/

}
