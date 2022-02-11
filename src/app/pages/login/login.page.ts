import { environment } from './../../../environments/environment';
/* eslint-disable no-trailing-spaces */
import { CurrentUser } from './../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { LoadingController, ToastController } from '@ionic/angular';
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
  loadingHandle: any;
  toastHandle: any;
  error: any = '';
  resultado: any;
  data: string;
  loading: any;

  constructor(
    private servicio: LoginService,
    public toastCtrl: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) {
    let currentUser: CurrentUser = this.servicio.currentUserValue;

    //Redirecciona si el usuario esta logeado
    if (currentUser) {
      console.log('Valor de currentUser:', currentUser)
      this.router.navigate(['/home']);
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

  /* Componentes de Ionic */

  // Ion-Toast

    //Si el usuario ingresa mal los datos, se le aparecera un toast para advertirle que los datos son erroneos
    async showToast(msg: string) {
      this.toastCtrl.dismiss();
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 3000,
        cssClass: "back-toast",
        color: 'danger'
      });
      return toast.present();
    }

  // Ion-Loading

 /*  async  showLoading() {
      this.loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Por favor espere...',
      });
      return this.loading.present();
    }
 */
  onSubmit() {
    this.handler = this.servicio
      .login(this.f.UserDni.value, this.f.UserPassword.value)
      .subscribe(
        res => {
          /* this.loadingCtrl.dismiss(); */
          this.router.navigateByUrl('/home', { replaceUrl: true });
          /* this.loading.dismiss(); */
        },

        error => {
          this.error = error;
          /* this.loadingCtrl.dismiss(); */
          this.showToast('Datos Incorrectos');
          console.log(error.message);
      }
    );
  }
}
