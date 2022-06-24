import { Component } from '@angular/core';
import {AvatarService} from './services/avatar.service';
import {Platform} from '@ionic/angular';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

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
    private authService: AuthService,
    private router: Router,
  ) {
    platform.ready().then(() => {
      setTimeout(() => {
        this.avatarService.getUserProfile().subscribe(avatar => {
          this.user = avatar;
          console.log(this.user);
        });
      }, 2000);
    });
  }

  logOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login'], {replaceUrl: true});
    });
  }
}
