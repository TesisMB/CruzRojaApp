import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { ToastController } from '@ionic/angular';
import { CurrentUser } from '../../../models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { User } from 'src/app/models';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.page.html',
  styleUrls: ['./personalinfo.page.css'],
})
export class PersonalinfoPage implements OnInit, OnDestroy {
  currentUser: CurrentUser;
  users: User;
  model: CurrentUser;
  originalUser: CurrentUser;
  handlerProfile: any;
  fg: FormGroup;
  handleUser: Subscription;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private service: LoginService
  ) {  }

  ngOnInit() {
    this.fg = this.initForm();
    this.getCurrentUser();
    console.log('LocalStorage', this.currentUser);
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      persons: this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        phone: ['',[Validators.required,Validators.pattern('^((\\+54-?)|0)?[0-9]{10}$')]],
        address: ['',[Validators.required, Validators.maxLength(25)]],
        status: ['',[Validators.required]]
      }),
      estates: this.formBuilder.group({
        locationCityName: ['',[Validators.required, Validators.maxLength(25)]],
      }),
    });
  }


  getCurrentUser(){
    this.handleUser =  this.service.currentUserObs.subscribe(
      (user: CurrentUser) => {
        this.currentUser = user;
        this.fg.patchValue(this.currentUser);
        this.model = _.cloneDeep(this.fg.value);
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

  onSubmit(){
    const patch = compare( this.model, this.fg.value);
    if(this.fg.valid && patch.length){
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

  ngOnDestroy(){
    this.handleUser.unsubscribe();
    if(this.handlerProfile){
      this.handlerProfile.unsubscribe();
    }
  }
}
