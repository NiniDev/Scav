import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  subjects = {};
  subjectKeys = Object.keys(this.subjects);
  homework = {};
  homeworkKeys = Object.keys(this.homework);

  constructor(
    private dataService: DataService
  ) {
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
        console.log(this.subjects);
        this.subjectKeys = Object.keys(this.subjects);
      });
      // get homework
      this.dataService.getHomework().subscribe(events => {
        this.homework = {};
        for (const key in events) {
          if (events.hasOwnProperty(key)) {
            this.homework[events[key].id] = events[key];
          }
        }
        this.homeworkKeys = Object.keys(this.homework);
        this.sortHomework();
      });
    });
  }

  ngOnInit() {
  }

  getOrderedHomework() {
    const homework = [];
    const hw = this.getUnfinishedHomework();
    // eslint-disable-next-line guard-for-in
    for (const id in hw) {
      const h = hw[id];
      homework.push(h);
    }
    return homework.sort((a, b) => {
      const aDate = new Date(a.untilDate);
      const bDate = new Date(b.untilDate);
      return aDate.getTime() - bDate.getTime();
    });
  }

  getUnfinishedHomework() {
    const homework = [];
    // eslint-disable-next-line guard-for-in
    for (const id in this.homework) {
      const h = this.homework[id];
      if (!h.done) {
        homework.push(h);
      }
    }
    return homework;
  }

  getDiffDays(date: string) {
    const today = new Date();
    const until = new Date(date);
    return Math.abs(Math.floor((until.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  }


  private sortHomework() {
    this.homeworkKeys.sort((a, b) => this.homework[a].until - this.homework[b].until);
  }
}
