import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { CurrentUser } from '../../../models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { CustomValidators } from 'src/app/_helpers/CustomValidators';

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
//  CustomValidators.mustMatch('NewPassword', 'RepeatPassword')
  initForm(): void{
    this.fg =  this.formBuilder.group({
      Password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      NewPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      RepeatPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16),
        ]],
    });
  }
  get f(){
    return this.fg.controls;
  }
  get isOk(){
   return this.fg.get('NewPassword').value === this.fg.get('RepeatPassword');
  }
  getCurrentUser(){
    this.handleUser =  this.service.currentUserObs.subscribe(
      (user: CurrentUser) => {
        this.currentUser = user;
        this.model = _.cloneDeep(this.fg.value);
      });
    }

  onSubmit(){
    this.submitted = true;
    const patch = compare(this.model, this.fg.value);
    if (this.fg.invalid || !this.isOk) {
      return;
    }
    else if(this.fg.valid && patch && this.isOk){
      this.isLoading = true;
      // this.model.persons = this.fg.get('persons').value;
      console.log('Path => ', patch);
      console.log('Modelo! => ', this.model);
      this.handlerProfile = this.service.updateUser(this.currentUser,patch)
                            .subscribe(
                              (data) => {
                              this.isLoading = false;
                              this.showToast('Datos actualizados correctamente', 3000);
                              console.log(data);
                            },
                            (err) =>{
                              this.isLoading = false;
                              this.showToast('Ups! un error, intente mas tarde', 3000);
                              console.log('Error => ', err);
                            });
    }
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

