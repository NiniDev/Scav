import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-edit-homework',
  templateUrl: './modal-edit-homework.page.html',
  styleUrls: ['./modal-edit-homework.page.scss'],
})
export class ModalEditHomeworkPage implements OnInit {
  @Input() subjects: any;
  @Input() subjectKeys: any;
  @Input() events;
  @Input() id: string;
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
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getHomeworkByID(this.id).subscribe(homework => {
      this.title = homework.title;
      this.description = homework.description;
      this.until = homework.until;
      this.subject = homework.subject;
      this.subjectChanged();   
    });
  }

  updateHomework() {
    this.modalController.dismiss({
      title: this.title,
      description: this.description,
      until: this.until,
      subject: this.subject,
    }, 'update');
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
    dt?.reset();
  }

  logNewUntil() {
    console.log(this.until);
  }
}
