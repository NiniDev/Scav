import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";

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
              private router: Router) { }

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

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get passwordConfirm() {
    return this.credentials.get('passwordConfirm');
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

    // const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (1) {
      await this.router.navigateByUrl('/home', {replaceUrl: true});
    } else {
      const alert = await this.alertController.create({
        header: 'Registrierung fehlgeschlagen',
        message: 'Bitte überprüfe deine Eingaben.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
