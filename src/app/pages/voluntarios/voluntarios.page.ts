/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Volunteer } from './../../models/Volunteer';
import { Skills } from 'src/app/models/Skills';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { IonList } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.page.html',
  styleUrls: ['./voluntarios.page.css'],
})

export class VoluntariosPage implements OnInit {
  volunteers: Volunteer[] = [];
  skills: Skills[] = [];
  handlerVoluntarios: any;
  textoBuscar = '';
  apiUrl = '/app/Volunteers';

  //Permite llamar cualquier metodo del componente
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('lista') lista: IonList;

  constructor(
    public http: DataService,
    public router: Router,
    private popoverCtrl: PopoverController
  ) {

  }

  async presentPopOver(){
    const popover = await this.popoverCtrl.create({
      component: VoluntariosPage
    });

    await popover.present();
  }

  ngOnInit() {
    this.volunteerService();
  }
   volunteerService(){
     return this.handlerVoluntarios = this.http.getAll().pipe(filter((x: Volunteer[], index) => x[index].users.persons.status == true))
     .subscribe((x: Volunteer[]) =>{
      console.log('ingreso');
      this.volunteers = x;
      console.log(this.volunteers);
     });
  }

  search(event: any){
    this.textoBuscar = event.target.value;
    console.log(this.textoBuscar);
  }

  chat(){
    console.log('test');
    //Utilizo el método "close sliding Items" para que cierre el slide cuando se clickee a otra parte
    this.lista.closeSlidingItems();
  }

  borrar(){
    this.volunteerService();
    console.log('borrar');
    this.lista.closeSlidingItems();
  }

}
