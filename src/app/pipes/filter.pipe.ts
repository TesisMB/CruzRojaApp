import { Volunteer } from './../models/Volunteer';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(
    volunteers: Volunteer[] = [],
      texto: string,
      column: string
    ): Volunteer[] {
      if(texto === ''){
        return volunteers;
      }

      texto = texto.toLowerCase();

      return volunteers.filter(
        volunteer =>{
          return volunteer[column].toLowerCase().includes(texto);
      });
    }
  }
