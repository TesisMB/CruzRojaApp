import { User } from './../../models/User';
import { Person } from './../../models/Person';
import { DataService } from './../../services/data.service';
import { LoginService } from './../../services/login.service';
import { Component, Injectable } from '@angular/core';

@Injectable()

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage{
  user: User;
  handlerProfile: any;
  constructor(
    private logOutEvent: LoginService,
    public http: DataService,
  ) {}

  logOut(){
    this.logOutEvent.logout();
  }

}
