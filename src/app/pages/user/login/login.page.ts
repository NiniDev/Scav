import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
              private fb: FormBuilder,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private router: Router
  ) { }

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

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      await
      await loading.dismiss();
      console.log('login:', this.credentials.value);
      const toast = await this.alertController.create({
        message: `Überprüfe deine E-Mails, um dein Konto zu aktivieren.`,
      });
      await toast.present();
    } catch (e) {
      await loading.dismiss();
      const toast = await this.alertController.create({
        message: e.error_description || e.message,
      });
      await toast.present();
    }
    await loading.dismiss();

  }
}
