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
  homework = {};
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
