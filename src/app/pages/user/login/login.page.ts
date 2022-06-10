import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private router: Router
  ) {
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      await this.router.navigateByUrl('/home', {replaceUrl: true});
    } else {
      const alert = await this.alertController.create({
        header: 'Login fehlgeschlagen',
        message: 'Bitte überprüfe deine Eingaben',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register', {replaceUrl: true});
  }
}
