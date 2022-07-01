import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-add-homework',
  templateUrl: './modal-add-homework.page.html',
  styleUrls: ['./modal-add-homework.page.scss'],
})
export class ModalAddHomeworkPage implements OnInit {
  @Input() subjects: any;
  @Input() subjectKeys: any;
  title;
  description;
  until;
  subject;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  addHomework() {
    this.modalController.dismiss({
      title: this.title,
      description: this.description,
      until: this.until,
      subject: this.subject,
    }, 'add');
  }

  cancel() {
    this.modalController.dismiss({}, 'cancel');
  }
}
