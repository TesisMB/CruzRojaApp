import { CurrentUser } from './../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  currentUser: CurrentUser;
  credentials: FormGroup;
  errorToast: any;
  handler: any;
  error: any = "";
  resultado: any;
  data: string;

  constructor(
    private servicio: LoginService, 
    public toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder,
  ) 
    {
      this.currentUser = this.servicio.currentUserValue;
         //Redirecciona si el usuario esta logeado
         if (this.servicio.currentUserValue) {
            this.router.navigate(['/']);
        }
      const toasty = this.toastCtrl.create();
    }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      UserDni: ['', Validators.required],
      UserPassword: ['', Validators.required]
    });
  }

  get f() { return this.credentials.controls; }

  async showLoading(){
   let loading = await this.loadingCtrl.create({
      message: "Espere"
    });
    loading.present();
    setTimeout(()=>{
      loading.dismiss();
    }, 1000)
   }

  async FailToast(msg: string) {
   this.toastCtrl.dismiss();
   const toast = await this.toastCtrl.create({
     message: msg="Datos Erroneos",
     duration: 3000,
     position: 'bottom',
   });
   toast.present();
 }

  async onSubmit(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.handler = this.servicio.login(this.f.UserDni.value, this.f.UserPassword.value)
    .subscribe(
      async(res)=>{
        await loading.dismiss();//////
        this.router.navigateByUrl('/home', { replaceUrl: true });
        this.resultado = res;
        console.log(res);
      },
     
      error => {
              this.error = error;
              this.FailToast("Datos Incorrectos")
              console.log(error.message);
              },  
    )
  }
}
