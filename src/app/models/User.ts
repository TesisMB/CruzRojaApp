/* eslint-disable eol-last */
import {Person} from './index';
export interface User {
  persons: Person;
  userDni: string;
  userID: number;

  /*constructor(_person: Person, _userDni: string, _id: number){
    this.userID = _id;
    this.userPerson = _person;
    this.userDni = _userDni;
  }*/
}
