import { CurrentUser } from './../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
  loadingHandle: any;
  toastHandle: any;
  error: any = '';
  resultado: any;
  data: string;

  constructor(
    private servicio: LoginService,
    public toastCtrl: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private ionLoader: LoaderService
  ) {
    let currentUser: CurrentUser = this.servicio.currentUserValue;

    //Redirecciona si el usuario esta logeado
    if (currentUser) {
      console.log('Valor de currentUser:', currentUser)
      this.router.navigate(['home']);
    }
  }

  //Se inicializa las validaciones
  ngOnInit() {
    this.credentials = this.formBuilder.group({
      UserDni: ['',[Validators.required, Validators.maxLength(16)]],
      UserPassword: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
    console.log('Estoy en: ', window.location.pathname);
  }

  get f() { return this.credentials.controls; }

  /* Componentes de Ionic */

  // Ion-Toast

    //Si el usuario ingresa mal los datos, se le aparecera un toast para advertirle que los datos son erroneos
    async showToast(msg: string, duration: number) {
      // this.toastCtrl.dismiss();
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: duration,
        cssClass: "back-toast",
      });
      await toast.present();
    }

    showLoader() {
      this.ionLoader.showLoader();

      setTimeout(() => {
        this.hideLoader();
      }, 2000);
    }

    hideLoader() {
      this.ionLoader.hideLoader();
    }

  onSubmit() {
    this.showLoader();
    this.handler = this.servicio
      .login(this.f.UserDni.value, this.f.UserPassword.value)
      .subscribe(
        res => {
          this.hideLoader();
          this.router.navigateByUrl('/home', { replaceUrl: true });
        },

        error => {
          this.error = error;
          this.hideLoader();
          this.showToast('Datos Incorrectos', 3000);
          console.log(error.message);
      }
    );

}
}
