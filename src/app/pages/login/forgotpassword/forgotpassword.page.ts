import { LoginService } from './../../../services/login/login.service';
import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.css'],
})
export class ForgotpasswordPage {
  handleForgotPassword: any;
  emailForm: FormGroup;

  constructor(
    private servicio: LoginService,
    private formBuilder: FormBuilder,
  ){
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
  }

  sendInfo(){
    const email = this.emailForm.value;
    console.log('E-mail', email);

    this.handleForgotPassword = this.servicio.sendEmail(email).
    subscribe(data =>{
      console.log('enviando email', data);
    },
    error =>{
      console.log(error);
    });
    this.emailForm.reset();
  }
}
