/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
import { VolunteersService } from '../../services/volunteers.service';
import { Router } from '@angular/router';
import { Volunteer } from '../../models/Volunteer';
import { Skills } from 'src/app/models/Skills';
import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { IonItemSliding, IonList, IonSearchbar } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.css'],
})

export class VolunteersPage implements OnInit {
  @Input('searchTerm')

  volunteers: Volunteer[] = [];
  skills: Skills[] = [];
  handlerVoluntarios: any;
  textoBuscar = '';
  searchTerm: string;
  public searchedItem: any;
  public list: Array<Volunteer> = [];

  //Permite llamar cualquier metodo del componente
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('lista') lista: IonList;
  @ViewChild('search', { static: false }) search: IonSearchbar;
  @ViewChild('slide') slide: IonItemSliding;

  constructor(
    public router: Router,
    public service: VolunteersService
  ) {
    this.searchedItem = this.volunteers;
  }

  ngOnInit() {
    this.getAllVolunteers();
  }

  ionViewDidEnter(){
    setTimeout(()=>{
      this.search.setFocus();
    });
  }

  //Evento del buscador
  /* _ionChange(event: any){
    const val = event;
    this.searchedItem = this.volunteers;
    if (val && val.trim != ''){
      this.searchedItem = this.searchedItem.filter((volunteers: Volunteer) =>{
        return (volunteers.users.persons.firstName.toString().indexOf(val.toLowerCase()) > -1);
      });
    }
    this.search.getInputElement();
  } */

   getAllVolunteers(){
      this.handlerVoluntarios = this.service.getAll().pipe(filter((x: Volunteer[], index) => x[index].users.persons.status == true))
     .subscribe((x: Volunteer[]) =>{
      console.log('ingreso');
      this.volunteers = x;
      console.log(this.volunteers);
     });
  }

   chat(){
    this.router.navigateByUrl('/chat', { replaceUrl: true });
    console.log('Ingreso al chat');
    //Utilizo el método "close sliding Items" para que cierre el slide cuando se clickee a otra parte
    //this.lista.closeSlidingItems();
  }

  borrar(){
    console.log('Borro al voluntario');
    //this.lista.closeSlidingItems();
  }
}
