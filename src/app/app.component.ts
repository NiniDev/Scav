import { Component } from '@angular/core';
import {AvatarService} from './services/avatar.service';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user;

  constructor(
    private avatarService: AvatarService,
    private platform: Platform,
  ) {
    platform.ready().then(() => {
      setTimeout(() => {
        this.avatarService.getUserProfile().subscribe(avatar => {
          this.user = avatar;
          console.log(this.user);
        });
      }, 1000);
    });
  }
}
