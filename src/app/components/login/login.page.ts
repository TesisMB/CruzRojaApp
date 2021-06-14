import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular'
import { AuthenticationService  } from '../../services/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

  errorToast: any;
  handleError: any;
  error: any = "";
  dni: string;
  passWord:string;
  resultado: any;
  data: string;
  items: any[] = [];

  constructor(private servicio: LoginService, public toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    const toasty = this.toastCtrl.create();
   }

  ngOnInit() {
  }

  async showLoading(){
   let loading = await this.loadingCtrl.create({
      message: "Espere"
    });

    loading.present();
    setTimeout(()=>{
      loading.dismiss();
    }, 1000)
   }

  /*async presentToast(msg: string) {

     /*it dismisses the top overlay. so for me it does close any current toast on
    the overlay before showing another one. i tested it with button etc.
    this.toastCtrl.dismiss();

    const toast = await this.toastCtrl.create({
      message: msg="",
      duration: 2000,
      position: 'middle',
    });

    toast.present();

  }
  */

  async FailToast(msg: string) {
   this.toastCtrl.dismiss();

   const toast = await this.toastCtrl.create({
     message: msg="Datos Erroneos",
     duration: 3000,
     position: 'bottom',
   });

   toast.present();

 }

  async login(dni: string, passWord: string){

    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.handleError = this.servicio.login(dni,passWord).subscribe(

      rep => {
        this.resultado = rep;
              console.log(rep);
              },
      
      error => {
              this.error = error;
              this.FailToast("Datos Incorrectos")
              console.log(error.message);
              },  
      
    )

  }
  
}
