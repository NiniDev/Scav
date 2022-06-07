import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timetable-day-header',
  templateUrl: './timetable-day-header.component.html',
  styleUrls: ['./timetable-day-header.component.scss'],
})
export class TimetableDayHeaderComponent implements OnInit {
  @Input() events;
  start = '';
  end = '';
  today = new Date();

  constructor() { }

  ngOnInit() {
    this.start = this.events[1].start;
    this.end = this.events[Object.keys(this.events).length].end;
  }

}
