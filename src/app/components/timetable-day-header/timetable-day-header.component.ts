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
      const eventKeys = Object.keys(this.events);
      eventKeys.sort((a, b) => this.events[a].slot - this.events[b].slot);
      this.start = this.events[eventKeys[0]]?.start;
      let end;
      for (let i = eventKeys?.length - 1; i >= 0; i--) {
        if (this.events?.[eventKeys?.[i]]?.end) {
          end = this.events?.[eventKeys?.[i]]?.end;
          break;
        }
      }
      this.end = end;
    }
  }

}
