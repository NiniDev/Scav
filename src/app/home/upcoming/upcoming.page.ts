import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  subjects = {};
  homework = {};

  constructor() {
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
}
