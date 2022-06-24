import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timetable-day-body',
  templateUrl: './timetable-day-body.component.html',
  styleUrls: ['./timetable-day-body.component.scss'],
})
export class TimetableDayBodyComponent implements OnChanges {
  @Input() subjects;
  @Input() events;
  @Input() homework;
  eventKeys;


  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.eventKeys = Object.keys(this.events);
  }

  getHomework(untilSlot: number) {
    const homework = [];
    // eslint-disable-next-line guard-for-in
    for (const id in this.homework) {
      const h = this.homework[id];
      if (h.untilSlot === untilSlot) {
        homework.push(h);
      }
    }
    return homework;
  }

}
