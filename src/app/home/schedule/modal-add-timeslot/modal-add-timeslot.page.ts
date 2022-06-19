import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-add-timeslot',
  templateUrl: './modal-add-timeslot.page.html',
  styleUrls: ['./modal-add-timeslot.page.scss'],
})
export class ModalAddTimeslotPage implements OnInit {
  @Input() subjects: any;
  @Input() subjectKeys: any;

  start = '08:00';
  end = '08:45';
  subject;
  type = 'subject';
  breakDuration = 'short';
  room;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  addSubject() {
    console.log(this.subject);
    this.modalController.dismiss({
      start: this.start,
      end: this.end,
      subject: this.subject,
      type: this.type,
      breakDuration: this.breakDuration,
      room: this.room
    }, 'add');
  }

  cancel() {
    this.modalController.dismiss({}, 'cancel');
  }
}
