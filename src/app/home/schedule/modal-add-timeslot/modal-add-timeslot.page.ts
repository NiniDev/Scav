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
  @Input() previousEnd: any;

  start = '';
  end = '';
  subject;
  type = 'subject';
  breakDuration = 'short';
  room;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.start = this.previousEnd ? this.previousEnd : '08:00';
    // add 45 minutes to end
    const end = new Date();
    end.setMinutes(Number(this.start.substring(3, 5)));
    end.setHours(Number(this.start.substring(0, 2)));
    end.setMinutes(end.getMinutes() + 45);
    this.end = end.getHours().toString().padStart(2, '0') + ':' + end.getMinutes().toString().padStart(2, '0');
  }

  addSubject() {
    if (!((this.start && this.end && this.type === 'subject' && this.room) || (this.breakDuration && this.type === 'break'))) {
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
