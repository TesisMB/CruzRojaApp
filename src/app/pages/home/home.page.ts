import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  currentUser: any;
  handlerProfile: any;
  users: User;
  service: ProfileService;

  constructor() { }

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
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
};
