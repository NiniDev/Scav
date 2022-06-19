import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";

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
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  addSubject() {
    if (!((this.start && this.end && this.type==='subject' && this.room) || (this.breakDuration && this.type==='break'))) {
      this.alertController.create({
        header: 'Es ist ein Fehler aufgetreten',
        message: 'Füll bitte alle Felder aus',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }
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
