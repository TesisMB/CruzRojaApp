/* eslint-disable no-trailing-spaces */
import { CurrentUser } from './../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  errorToast: any;
  handler: any;
  error: any = '';
  resultado: any;
  data: string;
  loading: any;
  constructor(
    private servicio: LoginService,
    public toastCtrl: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    let currentUser: CurrentUser = this.servicio.currentUserValue;
    //Redirecciona si el usuario esta logeado
    if (currentUser) {
      console.log('Valor de currentUser:', currentUser)
      // this.router.navigate(['/home']);
    }
    const toasty = this.toastCtrl.create();
  }


  //Se inicializa las validaciones
  ngOnInit() {
    this.credentials = this.formBuilder.group({
      UserDni: ['', Validators.required],
      UserPassword: ['', Validators.required]
    });
    console.log('Estoy en: ', window.location.pathname);
  }

  get f() { return this.credentials.controls; }

  //Si el usuario ingresa mal los datos, se le aparecera un toast para advertirle que los datos son erroneos
  async FailToast(msg: string) {
    this.toastCtrl.dismiss();
    const toast = await this.toastCtrl.create({
      message: msg = 'Datos Erroneos',
      duration: 3000,
      position: 'bottom',
      cssClass: "backtoast"
    });
    toast.present();
  }

  onSubmit() {
    //const loading = await this.loadingCtrl.create();
    //await loading.present();

    this.handler = this.servicio
      .login(this.f.UserDni.value, this.f.UserPassword.value)
      .subscribe(
        res => {
          console.log('entro');
          this.router.navigateByUrl('/home', { replaceUrl: true });
          //await loading.dismiss();
        },

        error => {
          this.error = error;
          this.FailToast('Datos Incorrectos');
          console.log(error.message);
        }

      );
  }

}
