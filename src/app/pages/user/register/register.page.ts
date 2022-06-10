import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private router: Router,
              private authService: AuthService) { }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get passwordConfirm() {
    return this.credentials.get('passwordConfirm');
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
      passwordConfirm: ['', [
        Validators.required,
        Validators.minLength(6),
        this.matchValues('password')
      ]]
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => !!control.parent &&
    !!control.parent.value &&
    control.value === control.parent.controls[matchTo].value
      ? null
      : {isMatching: false};
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register({password: this.password.value, email: this.email.value});
    console.log({password: this.password, email: this.email});
    console.log(user);
    await loading.dismiss();

    if (user) {
      await this.router.navigateByUrl('/home', {replaceUrl: true});
    } else {
      const alert = await this.alertController.create({
        header: 'Registrierung fehlgeschlagen',
        message: 'Bitte überprüfe deine Eingaben',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
