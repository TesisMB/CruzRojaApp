export class Person {
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    birthdate: Date;
    address: string;
    gender: string;
    status: boolean;

    constructor(_phone: string,_email: string,_gender: string,_birthdate: Date,_status: boolean, _lastname?: string, _firstname?:string)
{
    this.phone = _phone;
    this.email = _email;
    this.gender = _gender;
    this.birthdate = _birthdate;
    this.status = _status;
    this.firstName = _firstname;
    this.lastName = _lastname;
}

}