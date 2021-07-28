import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {

  constructor(
    private logOutEvent: LoginService
  ) {

  }

  logOutLogin(){
    this.logOutEvent.logout();
  }

  ngOnInit() {
  }



}
