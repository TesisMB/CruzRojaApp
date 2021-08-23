import { User } from './../../models/User';
import { Person } from './../../models/Person';
import { DataService } from './../../services/data.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {
  user: User;
  handler: any;
  constructor(
    private logOutEvent: LoginService,
    public http: DataService,
  ) {}

  logOut(){
    this.logOutEvent.logout();
  }

  ngOnInit() {
  }
}
