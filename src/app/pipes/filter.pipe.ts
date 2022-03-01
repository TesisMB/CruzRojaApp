import { Volunteer } from './../models/Volunteer';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(
    volunteers: Volunteer[],
    texto: string): Volunteer[] {
    console.log(volunteers);
    if(texto === ''){
      {return volunteers;}
    }
      texto = texto.toLowerCase();
      volunteers.filter(volunteer =>volunteer.name);
    }
  }
