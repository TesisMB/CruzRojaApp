import { ProfileService } from './../../services/profile/profile.service';
import { User } from './../../models/User';
import { LoginService } from './../../services/login/login.service';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})

export class ProfilePage implements OnDestroy, OnInit{
  users: User;
  handlerProfile: any;
  service: ProfileService;
  id: number;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(){
    this.getProfile();

  }

  getProfile(){
      this.handlerProfile = this.service.getById(this.id)
      .subscribe((x: User) =>{
      console.log('ingreso');
      this.users = x;
      console.log(this.users);
    });
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(){
    this.handlerProfile.unsubscribe();
  }
}
