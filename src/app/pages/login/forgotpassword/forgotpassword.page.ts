import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.css'],
})
export class ForgotpasswordPage implements OnInit {
  handleForgotPassword: any;
  emailForm: FormGroup;
  isLoading = false;
  constructor(
    private servicio: LoginService,
    private formBuilder: FormBuilder,
    public toastController: ToastController
  ){

  }

  ngOnInit(){
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  /* ionViewWillEnter(){
  } */
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      mode: 'md',
    });
    toast.present();
  }

  sendInfo(){
    if(this.emailForm.valid){
    this.isLoading = true;
    const email = this.emailForm.value;
    console.log('E-mail', email);

    this.handleForgotPassword = this.servicio.sendEmail(email).
    subscribe(data =>{
      this.presentToast('Operación exitosa, revise su email');
      this.isLoading = false;
      console.log('enviando email', data);
      this.emailForm.reset();
    },
    error =>{
      this.presentToast('Ha ocurrido un error, intentelo nuevamente');
      console.log(error);
      this.isLoading = false;
    });
 }
}
}
