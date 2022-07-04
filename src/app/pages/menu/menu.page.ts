import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { LoginService } from 'src/app/services/login/login.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-menu',
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
    private loginService: LoginService,
  ) {
  }

  ngOnInit(){
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

}
