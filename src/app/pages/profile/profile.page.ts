import { ProfileService } from './../../services/profile/profile.service';
import { User } from './../../models/User';
import { LoginService } from './../../services/login/login.service';
import { Component, Injectable } from '@angular/core';

@Injectable()

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})

export class ProfilePage{
  users: User[];
  handlerProfile: any;
  service: ProfileService;
  id: number;
  constructor(
    private loginService: LoginService,
  ) {}

  getCurrentUser(){
    this.loginService.currentUserObs;
  }

  getProfile(){
      this.handlerProfile = this.service.getById(this.id)
      .subscribe((x: User[]) =>{
      console.log('ingreso');
      this.users = x;
      console.log(this.users);
    });
  }

  ngOnDestroy(){
      this.handlerProfile.unsubscribe();
  }
}
