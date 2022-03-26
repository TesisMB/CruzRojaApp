import { LoginService } from 'src/app/services/login/login.service';
import { CurrentUser } from './../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.css'],
})
export class CuentaPage implements OnInit {
  currentUser: CurrentUser;
  fg: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  initForm(): FormGroup{
    return this.formBuilder.group({

      Password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      NewPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      RepeatPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      Email: ['',[Validators.required, Validators.email]],
      Phone: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Address: ['',[Validators.required, Validators.pattern, Validators.maxLength(25)]],
      Status: ['',[Validators.required]]
    })
  }

  ngOnInit() {
    this.fg = this.initForm();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', this.currentUser);
    this.fg.patchValue({
      'Email':this.currentUser.persons.email,
      'Phone':this.currentUser.persons.phone,
      'Address':this.currentUser.persons.address,
      'Status': this.currentUser.userAvailability
    })
  }
}
