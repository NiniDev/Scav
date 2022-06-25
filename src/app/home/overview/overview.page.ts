import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage {
  subjects = {};
  events = {};
  day = '';
  homework = {
    1: {
      id: 1,
      subject: 1,
      since: '2022-05-27',
      untilDate: '2022-05-29',
      untilSlot: 0,
      title: 'ABC-Formel',
      description: 'ABC-Formel -b +- sqrt(b^2-4ac) / 2a',
      done: true
    },
    2: {
      id: 2,
      subject: 3,
      since: '2022-05-27',
      untilDate: '2022-05-29',
      untilSlot: 4,
      title: 'Harmonische schwingung',
      description: 'Lies dir den text auf Seite 180 durch und...',
      done: false
    }
  };
  eventDays = {monday: 'Montag', tuesday: 'Dienstag', wednesday: 'Mittwoch', thursday: 'Donnerstag', friday: 'Freitag'};

  constructor(
    private dataService: DataService
  ) {
    // this.day = Object.keys(this.eventDays)[new Date().getUTCDay()-1];
    this.day = 'friday';
    this.dataService.isReady.subscribe((r) => {
      if (!r) {
        return;
      }
      // get subjects
      this.dataService.getSubjects().subscribe(subjects => {
        this.subjects = {};
        for (const key in subjects) {
          if (subjects.hasOwnProperty(key)) {
            this.subjects[subjects[key].id] = subjects[key];
          }
        }
      });
      dataService.getEvents().subscribe(events => {
        this.events = {};
        for (const key in events) {
          if (events.hasOwnProperty(key)) {
            if (events[key].day === this.day) {
              this.events[events[key].id] = events[key];
            }
          }
        }
      });
    });
  }
}
