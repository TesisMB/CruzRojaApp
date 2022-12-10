import { Observable, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { CurrentUser } from '../../../models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { User } from 'src/app/models';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { finalize } from 'rxjs/operators';
const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.page.html',
  styleUrls: ['./personalinfo.page.css'],
})
export class PersonalinfoPage implements OnInit, OnDestroy {
  currentUser: CurrentUser;
  users: User;
  user: User;
  model: CurrentUser;
  originalUser: CurrentUser;
  handlerProfile: any;
  fg: FormGroup;
  handleUser: Subscription;
  isLoading = false;
  previews = '';
  message = '';
  selectedFiles?: FileList;
  selectedFileNames= '';
  progressInfos: any[] = [];
  imageInfos?: Observable<any>;
  registrationForm: any;
  images: LocalFile[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private service: LoginService,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
		private plt: Platform,
  ) {  }

  ngOnInit() {
    this.fg = this.initForm();
    this.getCurrentUser();
    console.log('LocalStorage', this.currentUser);
    this.getUser();
  }



  get email(){
    return this.registrationForm.get('persons.email');
  }

  get phone(){
    return this.registrationForm.get('persons.phone');
  }

  get address(){
    return this.registrationForm.get('persons.address');
  }

  get locationName(){
    return this.registrationForm.get('persons.locationName');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public errorMessages = {
    email: [
      {type: 'required', message: 'El correo electrónico es requerido'},
        {type: 'pattern', message: 'Ingrese un correo electónico valido'}
    ],

    phone: [
      {type: 'required', message: 'El telefono es requerido'},
        {type: 'pattern', message: 'Ingrese un telefono valido'}
    ],

    address: [
      {type: 'required', message: 'El domicilio es requerido'},
        {type: 'maxlength', message: 'El domicilio debe tener como maximo 25 caracteres'}
    ],
    locationName: [
      {type: 'required', message: 'La cuidad es requerida'},
        {type: 'maxlength', message: 'La cuidad debe tener como maximo 25 caracteres'}
    ],
  };



  // selectFiles(event: any): void {
  //   this.message = '';
  //   this.progressInfos = [];
  //   this.selectedFileNames = '';
  //   this.selectedFiles = event.target.files;
  // //  this.previews = "";
  //   if (this.selectedFiles && this.selectedFiles[0]) {

  //     const numberOfFiles = this.selectedFiles.length;
  //     for (let i = 0; i < numberOfFiles; i++) {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         console.log(e.target.result);
  //         this.previews = e.target.result;
  //       };
  //       reader.readAsDataURL(this.selectedFiles[i]);
  //       this.selectedFileNames = this.selectedFiles[i].name;
  //     }
  //      this.uploadFiles();
  //   }
  // }

  // uploadFiles(): void {
  //   this.message = '';
  //   if (this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }

  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };
  //   if (file) {
  //     this.service.upload(file)
  //     .subscribe(
  //       (event: any) => {
  //        if (event.type === HttpEventType.UploadProgress) {
  //          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
  //        } else if (event instanceof HttpResponse) {
  //        this.fg.get('avatar').patchValue(event.body);
  //           const msg = 'Se cargó la imagen exitosamente!: ' + file.name;
  //           this.message = msg;
  //          this.imageInfos = this.service.getFiles();
  //          }
  //       },
  //       (err: any) => {
  //         this.progressInfos[idx].value = 0;
  //         const msg = 'No se ha podido cargar la imagen: ' + file.name;
  //         this.message = msg;
  //       });
  //   }
  // }


  initForm(): FormGroup{
   this.registrationForm = this.formBuilder.group({
     avatar: [],
      persons: this.formBuilder.group({
        email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        phone: ['',[Validators.required,Validators.pattern('^((\\+54-?)|0)?[0-9]{10}$')]],
        address: ['',[Validators.required, Validators.maxLength(25)]],
        status: ['',[Validators.required]],
        locationName: ['',[Validators.required, Validators.maxLength(25)]],
      }),
      // estates: this.formBuilder.group({
      //   locationCityName: ['',[Validators.required, Validators.maxLength(25)]],
      // }),
    });

    return this.registrationForm;
  }




  getUser(){
    this.service.getUser(this.currentUser.userID).subscribe(data => {
      this.user = data;
      this.previews = this.user.avatar;
      console.log('Email!!', this.user.persons.email);
      // this.email.patchValue(this.user.persons.email);
     this.fg.patchValue(this.user);
      this.model = _.cloneDeep(this.fg.value);
      // console.log('USUARIOS!!', this.user);
    }, error =>{
      console.log(error);
    });
  }




  getCurrentUser(){
    this.handleUser =  this.service.currentUserObs.subscribe(
      (user: CurrentUser) => {
        this.currentUser = user;
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


  // and create  formData with it
async startUpload(file: LocalFile) {
  const response = await fetch(file.data);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob, file.name);
  // this.uploadData(formData);

}

// // Upload the formData to our API
// async uploadData(formData: FormData) {
//   const loading = await this.loadingCtrl.create({
//       message: 'Uploading image...',
//   });
//   await loading.present();

//   // Use your own API!
//  // const url = 'http://localhost:8888/images/upload.php';

//   this.http.post(url, formData)
//       .pipe(
//           finalize(() => {
//               loading.dismiss();
//           })
//       )
//       .subscribe(res => {
//           // eslint-disable-next-line @typescript-eslint/dot-notation
//           if (res['success']) {
//               this.presentToast('File upload complete.');
//           } else {
//               this.presentToast('File upload failed.');
//           }
//       });
// }

async deleteImage(file: LocalFile) {
  await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
  });
  this.loadFiles();
  this.presentToast('File removed.');
}


  async loadFiles() {
		this.images = [];

		const loading = await this.loadingCtrl.create({
			message: 'Loading data...'
		});
		await loading.present();

		Filesystem.readdir({
			path: IMAGE_DIR,
			directory: Directory.Data
		})
			.then(
				(result) => {
					this.loadFileData(result.files);
				},
				async (err) => {
					// Folder does not yet exists!
					await Filesystem.mkdir({
						path: IMAGE_DIR,
						directory: Directory.Data
					});
				}
			)
			// eslint-disable-next-line @typescript-eslint/no-shadow
			.then((_) => {
				loading.dismiss();
			});
	}

	// Get the actual base64 data of an image
	// base on the name of the file
	async loadFileData(fileNames: string[]) {
		for (const f of fileNames) {
			const filePath = `${IMAGE_DIR}/${f}`;

			const readFile = await Filesystem.readFile({
				path: filePath,
				directory: Directory.Data
			});

			this.images.push({
				name: f,
				path: filePath,
				data: `data:image/jpeg;base64,${readFile.data}`
			});
		}
	}

	// Little helper
	async presentToast(text) {
		const toast = await this.toastCtrl.create({
			message: text,
			duration: 3000
		});
		toast.present();
	}

  async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
        this.saveImage(image);
    }
}

// Create a new file from a capture image
async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data
    });

    this.service.upload(photo);

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
}

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });

        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.base64String);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    }
}

// Helper function
// eslint-disable-next-line @typescript-eslint/member-ordering
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});




  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy(){
    this.handleUser.unsubscribe();
    if(this.handlerProfile){
      this.handlerProfile.unsubscribe();
    }
  }
}
