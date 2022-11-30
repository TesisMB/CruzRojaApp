import { Observable, Subscription } from 'rxjs';
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
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
  previews: string = "";
  message: string = "";
  selectedFiles?: FileList;
  selectedFileNames: string= "";
  progressInfos: any[] = [];
  imageInfos?: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private service: LoginService
  ) {  }

  ngOnInit() {
    this.fg = this.initForm();
    this.getCurrentUser();
    console.log('LocalStorage', this.currentUser);

    this.previews = this.currentUser.avatar;
  }

  selectFiles(event: any): void {
    this.message = "";
    this.progressInfos = [];
    this.selectedFileNames = "";
    this.selectedFiles = event.target.files;
  //  this.previews = "";
    if (this.selectedFiles && this.selectedFiles[0]) {
      
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews = e.target.result;
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames = this.selectedFiles[i].name;
      }
       this.uploadFiles();
    }
  }

  uploadFiles(): void {
    this.message = "";
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.service.upload(file)
      .subscribe(
        (event: any) => {
         if (event.type === HttpEventType.UploadProgress) {
           this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
         } else if (event instanceof HttpResponse) {
         this.fg.get('avatar').patchValue(event.body);
            const msg = 'Se cargó la imagen exitosamente!: ' + file.name;
            this.message = msg;
           this.imageInfos = this.service.getFiles();
           }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'No se ha podido cargar la imagen: ' + file.name;
          this.message = msg;
        });
    }
  }


  initForm(): FormGroup{
    return this.formBuilder.group({
      persons: this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        phone: ['',[Validators.required,Validators.pattern('^((\\+54-?)|0)?[0-9]{10}$')]],
        address: ['',[Validators.required, Validators.maxLength(25)]],
        status: ['',[Validators.required]],
        locationName: ['',[Validators.required, Validators.maxLength(25)]],
      }),
      // estates: this.formBuilder.group({
      //   locationCityName: ['',[Validators.required, Validators.maxLength(25)]],
      // }),
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
