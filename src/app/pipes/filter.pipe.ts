import { UserChatRooms } from './../models/UserChatRooms';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(
    volunteers: UserChatRooms[] = [],
      texto: string,
      column: string
    ): UserChatRooms[] {
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
