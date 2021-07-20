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
    this.volunteerService();
  }

  ngOnInit() {
    
  }

  search(event: any){
    const texto = event.target.value;
    this.textoBuscar = texto;
    console.log(texto);
  }

  volunteerService(){
    return this.http.get(environment.apiURL + this.apiUrl).subscribe((volunteers: Volunteer[]) =>{
      this.volunteers = volunteers;
      console.log(typeof this.volunteers);
    });
  }

  chat(){
    console.log("test");
    this.lista.closeSlidingItems();
  }

  borrar(){
    console.log("test");
    this.lista.closeSlidingItems();
  }

}
