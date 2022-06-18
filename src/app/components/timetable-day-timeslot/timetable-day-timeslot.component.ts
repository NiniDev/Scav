import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-timetable-day-timeslot',
  templateUrl: './timetable-day-timeslot.component.html',
  styleUrls: ['./timetable-day-timeslot.component.scss'],
})
export class TimetableDayTimeslotComponent implements OnInit {
  @Input() event;
  @Input() subjects;
  @Input() homework;
  @Input() opacity = '26';
  @Input() editable = false;

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  hasUnfinishedHomework() {
    return this.homework.some(h => !h.done);
  }

  dismiss() {
    this.popoverController.dismiss();
  }

  save() {
    // TODO: Save new Time
    this.dismiss();
  }
}
