import { Volunteer } from './../models/Volunteer';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(
    volunteers: Volunteer[], 
    texto: string): Volunteer[] 
    {
    console.log(volunteers);
    if(texto === ''){
      {return volunteers;}
    }
      texto = texto.toLowerCase();
      volunteers.filter(volunteer =>{
        return volunteer.users.persons.firstName.toLowerCase().includes(texto)
             ||volunteer.users.persons.lastName.toLowerCase().includes(texto);
      });
    }   
  }
