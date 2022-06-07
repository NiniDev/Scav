import {AfterViewInit, Component} from '@angular/core';
import {DatePipe} from '@angular/common';

enum COLORS {
  MATH = '#0000ff',
  GERMAN = '#ff0000',
  PHYSICS = '#b700ff',
  PHYSICALEDUCATION = '#ffffff',
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
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
  events = {
    1: {
      id: 1,
      break: false,
      start: '08:00',
      end: '08:45',
      name: 'Mathe',
      subject: 1,
      room: 'A1',
      slot: 0
    },
    2: {
      id: 2,
      break: false,
      start: '08:50',
      end: '09:35',
      name: 'Mathe',
      subject: 1,
      room: 'A1',
      slot: 1
    },
    3: {
      id: 3,
      break: true,
      duration: 'LONG',
    },
    4: {
      id: 4,
      break: false,
      start: '09:55',
      end: '10:40',
      name: 'Deutsch',
      subject: 2,
      room: 'A2',
      slot: 2
    },
    5: {
      id: 5,
      break: false,
      start: '10:40',
      end: '11:25',
      name: 'Deutsch',
      subject: 2,
      room: 'A2',
      slot: 3
    },
    6: {
      id: 6,
      break: true,
      duration: 'SHORT',
    },
    7: {
      id: 7,
      break: false,
      start: '11:35',
      end: '12:20',
      name: 'Physik',
      subject: 3,
      room: 'A3',
      slot: 4
    },
    8: {
      id: 8,
      break: true,
      duration: 'LONG',
    },
    9: {
      id: 9,
      break: false,
      start: '12:55',
      end: '13:40',
      name: 'Sport',
      subject: 4,
      room: 'A4',
      slot: 5
    },
    10: {
      id: 10,
      break: true,
      duration: 'SHORT',
    },
    11: {
      id: 11,
      break: false,
      start: '13:50',
      end: '14:35',
      name: 'Sport',
      subject: 4,
      room: 'A4',
      slot: 6
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
  el;
  constructor(
    private datePipe: DatePipe
  ) {
  }

  ngAfterViewInit() {
    this.el = document.getElementById('grid');
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
