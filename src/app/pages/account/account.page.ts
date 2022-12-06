/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { CurrentUser } from '../../models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { finalize } from 'rxjs/operators';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { FcmService } from 'src/app/fcm.service';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.css'],
})
export class AccountPage implements OnInit, OnDestroy {
  currentUser: CurrentUser;
  users: User;
  model: CurrentUser;
  originalUser: CurrentUser;
  handlerProfile: any;
  fg: FormGroup;
  images: LocalFile[] = [];
  service: ProfileService;
  option: string;

  constructor(
    private formBuilder: FormBuilder,
		private plt: Platform,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController,
    private tokenService: FcmService,
    private toastCtrl: ToastController
  ) { }

  initForm(): FormGroup{
    return this.formBuilder.group({
      Password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      NewPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      RepeatPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      volunteerAvatar: [''],
        persons: this.formBuilder.group({
          email: ['',[Validators.required, Validators.email]],
          phone: ['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
          address: ['',[Validators.required,  Validators.maxLength(25)]],
          status: ['',[Validators.required]]
        })
    });
  }

  ngOnInit() {
    this.fg = this.initForm();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', this.currentUser);
    this.fg.patchValue(this.currentUser);
    this.model = _.cloneDeep(this.currentUser);
  }

  getProfile(){
    this.handlerProfile = this.service.getById(this.currentUser.userID)
    .subscribe((x: User) =>{
    console.log('ingreso');
    this.users = x;
    console.log(this.users);
  });
}

  onSubmit(){
    if(this.fg.valid){
      const patch = compare(this.model, this.fg.value);
    }
  }

  /* Funciones de navegación */

  navigateToPersonalInfo(){
    this.router.navigate(['personalinfo']);
  }

  navigateToPassword(){
    this.router.navigate(['password']);
  }

  navigateToVolunteerCredentials(){
    this.router.navigate(['volunteercredentials']);
  }

  navigateToVolunteerSkills(){
    this.router.navigate(['volunteerskills']);
  }

  sendDeviceToken(){
    // const deviceToken = 'Estoy enviando el token hardcodeado';
    // this.tokenService.sendToken(deviceToken)
    // .subscribe(resp => console.log(resp), err => console.log(err));
    const data = {
      alertId: '242'
    };
    this.router.navigateByUrl(`/tabs/alertas/alerta/${data.alertId}`);

  }

  /* Alerta */



  async logOut() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Está seguro que quiere cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) =>{
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Ok',
          handler:() =>{
            this.loginService.logout();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  /* Cerrar sesión */

  /* public async logout(){
    const confirmation = await this.confirmLogout();
    if(confirmation){
      this.loginService.logout();
    }
    // this.router.navigateByUrl('/login');
  } */


// and create  formData with it
async startUpload(file: LocalFile) {
  const response = await fetch(file.data);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob, file.name);
  this.uploadData(formData);
}

// Upload the formData to our API
async uploadData(formData: FormData) {
  const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
  });
  await loading.present();

  // Use your own API!
  const url = 'http://localhost:8888/images/upload.php';

  this.http.post(url, formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          if (res['success']) {
              this.presentToast('File upload complete.');
          } else {
              this.presentToast('File upload failed.');
          }
      });
}

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
        const response = await fetch(photo.webPath);
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
    console.log('Salí de tabs');
    if(this.handlerProfile){
      this.handlerProfile.unsubscribe();
    }
  }
}


