import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { CurrentUser } from '../../../models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { first } from 'rxjs/operators';
// import { CustomValidators } from 'src/app/_helpers/CustomValidators';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.css'],
})
export class PasswordPage implements OnInit, OnDestroy {
  currentUser: CurrentUser;
  users: User;
  model: CurrentUser;
  originalUser: CurrentUser;
  fg: FormGroup;
  isLoading = false;
  handlerProfile: Subscription;
  handleUser: Subscription;
  submitted = false;
  constructor(
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private service: LoginService) {}

  ngOnInit() {
    this.initForm();
    this.getCurrentUser();
  }


  get Password(){
    return this.fg.get('userPassword');
  }


  get NewPassword(){
    return this.fg.get('userNewPassword');
  }

  get RepeatPassword(){
    return this.fg.get('passwordRepeat');
  }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  public errorMessages = {
    Password: [
      {type: 'required', message: 'La contraseña es requerida'},
      {type: 'minlength', message: 'La contraseña debe tener como minimo 8 caracteres'},
      {type: 'maxlength', message: 'La contraseña debe tener como maximo 16 caracteres'}
    ],

    NewPassword: [
      {type: 'required', message: 'La nueva contraseña es requerida'},
      {type: 'minlength', message: 'La contraseña debe tener como minimo 8 caracteres'},
      {type: 'maxlength', message: 'La contraseña debe tener como maximo 16 caracteres'}
     ],

    RepeatPassword: [
      {type: 'required', message: 'La repetición de la contraseña es requerida'},
      {type: 'minlength', message: 'La contraseña debe tener como minimo 8 caracteres'},
      {type: 'maxlength', message: 'La contraseña debe tener como maximo 16 caracteres'},
    ],
  };

//  CustomValidators.mustMatch('NewPassword', 'RepeatPassword')
  initForm(): void{
    this.fg =  this.formBuilder.group({
      userPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      userNewPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      passwordRepeat: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
    }
    ,{validators: this.password.bind(this)
    });
  }

  get f(){
    return this.fg.controls;
  }
  get isOk(){
   return this.fg.get('userNewPassword').value === this.fg.get('passwordRepeat').value;
  }


  getCurrentUser(){
    this.handleUser =  this.service.currentUserObs.subscribe(
      (user: CurrentUser) => {
        this.currentUser = user;
        this.model = _.cloneDeep(this.fg.value);
      });
    }


    password(formGroup: FormGroup) {
      const { value: password } = formGroup.get('userNewPassword');
      const { value: confirmPassword } = formGroup.get('passwordRepeat');
      return password === confirmPassword ? null : { passwordNotMatch: true };
    }

  onSubmit(){
    this.submitted = true;
    let patch = compare(this.model, this.fg.value);
    patch = patch.filter( obj => obj.path !== '/passwordRepeat');

    // if (this.fg.invalid || !this.isOk) {
    //   return;
    // }
    // else if(this.fg.valid && patch && this.isOk){
      //}
      this.isLoading = true;
      // this.model.persons = this.fg.get('persons').value;
      console.log('Path => ', patch);
      console.log('Modelo! => ', this.model);
      this.handlerProfile = this.service.updateUser(this.currentUser,patch)
                        .pipe(first())
                        .subscribe(
                              data => {
                              this.isLoading = false;
                              this.showToast('Datos actualizados correctamente', 3000);
                              console.log(data);
                            },
                            error =>{
                              this.isLoading = false;
                              this.showToast('La contraseña es errónea', 3000);
                              console.log('Error => ', error.message);
                            });
  }

  async showToast(msg: string, duration: number) {
    // this.toastCtrl.dismiss();
    const toast = await this.toastCtrl.create({
      message: msg,
      duration,
    });
    await toast.present();
  }


  ngOnDestroy(){
    if(this.handlerProfile){
      this.handlerProfile.unsubscribe();
    }
  }
    }

