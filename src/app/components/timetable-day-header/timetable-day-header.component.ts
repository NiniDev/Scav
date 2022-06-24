import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timetable-day-header',
  templateUrl: './timetable-day-header.component.html',
  styleUrls: ['./timetable-day-header.component.scss'],
})
export class TimetableDayHeaderComponent implements OnChanges {
  @Input() events;
  start = '';
  end = '';
  today = new Date();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(this.events)) {
      this.start = this.events[Object.keys(this.events)[0]]?.start;
      this.end = this.events[Object.keys(this.events)[Object.keys(this.events).length - 1]]?.end;
    }
  }

}
