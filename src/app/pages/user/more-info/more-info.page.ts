import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../services/avatar.service';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss']
})
export class MoreInfoPage implements AfterViewInit {
  el;
  user;
  displayName: any;

  constructor(
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.avatarService.getUserProfile().subscribe(avatar => {
      this.user = avatar;
    });
  }

  ngAfterViewInit() {
    this.el = document.getElementById('step-1');
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      await loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }


  async finishedAccount() {
    const alert = await this.alertController.create({
      header: 'Account angelegt',
      message: 'Du bist nun mit der Einrichtung deines Account fertig.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigateByUrl('', {replaceUrl: true});
        }
      }],
    });
    await alert.present();
  }

  saveName() {
    this.avatarService.setUserName(this.displayName);
  }
}
