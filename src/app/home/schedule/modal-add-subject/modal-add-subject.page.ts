import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

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
  ) { }

  ngOnInit() {
  }

  async cancel() {
    await this.modalController.dismiss({}, 'cancel');
  }

  addSubject() {
    this.modalController.dismiss({
      name: this.name,
      teacher: this.teacher,
      abbr: this.abbr,
      color: this.color,
    }, 'add');
  }
}
