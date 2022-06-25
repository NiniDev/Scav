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

  contrastColor(color: string) {
    // TODO: utility function to get contrast color
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const useBlack = (r * 0.299 + g * 0.587 + b * 0.114) > 186;
    return useBlack ? '#000000' : '#ffffff';
  }
}
