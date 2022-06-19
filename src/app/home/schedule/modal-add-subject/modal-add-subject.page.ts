import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-add-subject',
  templateUrl: './modal-add-subject.page.html',
  styleUrls: ['./modal-add-subject.page.scss'],
})
export class ModalAddSubjectPage implements OnInit {
  name: any;
  teacher: any;
  abbr: any;
  color: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async cancel() {
    await this.modalController.dismiss({}, 'cancel');
  }

  addSubject() {
    if (!(this.name && this.teacher && this.abbr && this.color)) {
      this.alertController.create({
        header: 'Es ist ein Fehler aufgetreten',
        message: 'Füll bitte alle Felder aus',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }
    this.modalController.dismiss({
      name: this.name,
      teacher: this.teacher,
      abbr: this.abbr,
      color: this.color,
    }, 'add');
  }
}
