import { ProfilePage } from './../profile/profile.page';
import { Component, OnInit } from '@angular/core';

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

  ) {

   }

  ngOnInit() {

  }
}
