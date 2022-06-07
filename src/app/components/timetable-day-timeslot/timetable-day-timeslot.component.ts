import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timetable-day-timeslot',
  templateUrl: './timetable-day-timeslot.component.html',
  styleUrls: ['./timetable-day-timeslot.component.scss'],
})
export class TimetableDayTimeslotComponent implements OnInit {
  @Input() event;
  @Input() subjects;
  @Input() homework;

  constructor() { }

  ngOnInit() {}

  hasUnfinishedHomework() {
    return this.homework.some(h => !h.done);
  }

}
