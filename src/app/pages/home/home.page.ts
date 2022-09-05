import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ProfileService } from 'src/app/services/profile/profile.service';
const card = [
  {
    img: '../../../assets/img-client/vidadona.png',
    body: 'Sumate a nuestro banco virtual de donantes de sangre',
    href: 'https://www.cruzroja.org.ar/filiales-banco-de-sangre/'
  },
  {
    img: '"../../../assets/img-client/convivir.png',
    body: 'Centros de Prevención, Asesoramiento y Diagnóstico de VIH',
    href: 'https://www.cruzroja.org.ar/filiales-vih/'
  },
  {
    img: '../../../assets/img-client/CruzRoja -Ilustracion.png',
    body: 'Sumate a nuestras campañas. Mas información en nuestra pagina web',
    href: 'https://www.cruzroja.org.ar/'
  },
  {
    img: '../../../assets/img-client/emergencia2.jpg',
    body: 'Acompañamos a las comunidades antes, durante y después de emergencias y desastres.',
    href: 'https://www.cruzroja.org.ar/emergencias/'
  },
  {
    img: '../../../assets/img-client/abuelos.jpg',
    body: 'Servicio de teleasistencia para adultos mayores y personas con discapacidad.',
    href: 'https://cruzroja.org.ar/teleasistencia/'
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  currentUser: any;
  handlerProfile: any;
  cards = card;
  users: User;
  service: ProfileService;
  option =  {
     slidesPerView: 1.5,
     centeredSlides: true,
     loop: true,
     spaceBetween: 10,
   };

  constructor(
    private router: Router,
  ) { }

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
