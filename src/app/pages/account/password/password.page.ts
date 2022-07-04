/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Platform, LoadingController } from '@ionic/angular';
import { CurrentUser } from '../../../models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.css'],
})
export class PasswordPage implements OnInit {
  currentUser: CurrentUser;
  users: User;
  model: CurrentUser;
  originalUser: CurrentUser;
  handlerProfile: any;
  fg: FormGroup;
  service: ProfileService;

  constructor(
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fg = this.initForm();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', this.currentUser);
    this.fg.patchValue(this.currentUser);
    this.model = _.cloneDeep(this.currentUser);
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      Password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      NewPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      RepeatPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  onSubmit(){
    if(this.fg.valid){
      const patch = compare(this.model, this.fg.value);
    }
  }

}
