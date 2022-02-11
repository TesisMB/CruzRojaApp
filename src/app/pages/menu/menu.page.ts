import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) {

   }

  ngOnInit() {

  }

  navigateTabHome(){
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

}
