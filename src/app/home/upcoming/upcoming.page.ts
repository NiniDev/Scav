import {Component, OnInit} from '@angular/core';
enum COLORS {
  MATH = '#0000ff',
  GERMAN = '#ff0000',
  PHYSICS = '#b700ff',
  PHYSICALEDUCATION = '#ffffff',
}
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  subjects = {
    1: {
      id: 1,
      name: 'Mathe',
      abbr: 'Ma',
      color: COLORS.MATH,
      teacher: 'Dr. Mathias',
    },
    2: {
      id: 2,
      name: 'Deutsch',
      abbr: 'De',
      color: COLORS.GERMAN,
      teacher: 'Dr. Mathias2',
    },
    3: {
      id: 3,
      name: 'Physik',
      abbr: 'Ph',
      color: COLORS.PHYSICS,
      teacher: 'Dr. Mathias3',
    },
    4: {
      id: 4,
      name: 'Sport',
      abbr: 'Sp',
      color: COLORS.PHYSICALEDUCATION,
      teacher: 'Dr. Mathias4',
    }
  };
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
