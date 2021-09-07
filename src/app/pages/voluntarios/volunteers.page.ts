/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
import { VolunteersService } from '../../services/volunteers.service';
import { Router } from '@angular/router';
import { Volunteer } from '../../models/Volunteer';
import { Skills } from 'src/app/models/Skills';
import { Component, OnInit, ViewChild} from '@angular/core';
import { IonList, IonSearchbar } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.css'],
})

export class VolunteersPage implements OnInit {
  volunteers: Volunteer[] = [];
  skills: Skills[] = [];
  handlerVoluntarios: any;
  textoBuscar = '';
  public searchedItem: any;
  public list: Array<Volunteer> = [];

  //Permite llamar cualquier metodo del componente
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('lista') lista: IonList;
  @ViewChild('search') search: IonSearchbar;

  constructor(
    public router: Router,
    public service: VolunteersService
  ) {
    this.searchedItem = this.list;
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
  _ionChange(event){
    const val = event.target.value;
    this.searchedItem = this.list;
    if (val && val.trim() != ''){
      this.searchedItem = this.searchedItem.filter((item: any) =>{
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

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
    this.lista.closeSlidingItems();
  }

  borrar(){
    console.log('Borro al voluntario');
    this.lista.closeSlidingItems();
  }
}
