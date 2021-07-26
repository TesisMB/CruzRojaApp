import { Volunteer } from './../../models/Volunteer';
import { Skills } from 'src/app/models/Skills';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.page.html',
  styleUrls: ['./voluntarios.page.css'],
})
export class VoluntariosPage implements OnInit {
  volunteers: Volunteer[] = [];
  skills: Skills[] = [];
  textoBuscar = '';
  apiUrl = "/app/Volunteers"

  //Permite llamar cualquier metodo del componente
  @ViewChild('lista') lista: IonList;

  constructor(
    public http: HttpClient,
  ) {
    
  }

  ngOnInit() {
    this.volunteerService();
  }

  search(event: any){
    this.textoBuscar = event.target.value;
    console.log(this.textoBuscar);
  }

  volunteerService(){
    return this.http.get<Volunteer[]>(environment.apiURL + this.apiUrl).subscribe(x =>{
      console.log(x);
      this.volunteers = x;
    });
  }

  chat(){
    console.log("test");
    //Utilizo el método "close sliding Items" para que cierre el slide cuando se clickee a otra parte 
    this.lista.closeSlidingItems();
  }

  borrar(){
    console.log("test");
  }

}
