import { Volunteer } from './../models/Volunteer';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(volunteers: Volunteer[], texto: string): Volunteer[] {
    if(texto.length == 0){
      {return volunteers;}
    }
      texto = texto.toLocaleLowerCase();
      volunteers.filter(volunteer =>{
        return volunteer.users.userPerson.firstName.toLowerCase().includes(texto)
             ||volunteer.users.userPerson.lastName.toLowerCase().includes(texto);
      });
    
  }

}
