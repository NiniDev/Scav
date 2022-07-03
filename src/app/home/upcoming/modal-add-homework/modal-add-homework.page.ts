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
  @Input() events;
  eventKeys: any;
  title;
  description;
  until;
  subject;
  allowedDays = [];
  eventDays = {
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag'
  };

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

  isDateEnabled = (dateIsoString: any) => {
    const day = new Date(dateIsoString).getUTCDay() - 1;
    return this.allowedDays.includes(Object.keys(this.eventDays)[day]);
  };

  subjectChanged() {
    // get days where there is an event
    this.eventKeys = Object.keys(this.events);
    const days = [];
    for (const eventId of this.eventKeys) {
      if (this.events[eventId].subject === this.subject) {
        days.push(this.events[eventId].day);
      }
    }
    this.allowedDays = days;
    const dt = document.querySelector('ion-datetime');
    dt.reset();
  }
}
