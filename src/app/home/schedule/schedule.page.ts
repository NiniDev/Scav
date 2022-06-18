import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {ModalAddSubjectPage} from './modal-add-subject/modal-add-subject.page';

const distance = require('jaro-winkler');

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  segment = 'days';
  subjects = {
    1: {
      id: 1,
      name: 'Mathe',
      abbr: 'Ma',
      color: '#0000ff',
      teacher: 'Dr. Mathias',
    },
    2: {
      id: 2,
      name: 'Deutsch',
      abbr: 'De',
      color: '#ff0000',
      teacher: 'Dr. Mathias2',
    },
    3: {
      id: 3,
      name: 'Physik',
      abbr: 'Ph',
      color: '#b700ff',
      teacher: 'Dr. Mathias3',
    },
    4: {
      id: 4,
      name: 'Sport',
      abbr: 'Sp',
      color: '#ffffff',
      teacher: 'Dr. Mathias4',
    }
  };
  events = {
    monday: {
    1011: {
      id: 1011,
      break: true,
      duration: 'SHORT',
      slot: 9
    },
      1566: {
        id: 1566,
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
        slot: 2
      },
      4: {
        id: 4,
        break: false,
        start: '09:55',
        end: '10:40',
        name: 'Deutsch',
        subject: 2,
        room: 'A2',
        slot: 3
      },
      5: {
        id: 5,
        break: false,
        start: '10:40',
        end: '11:25',
        name: 'Deutsch',
        subject: 2,
        room: 'A2',
        slot: 4
      },
      6: {
        id: 6,
        break: true,
        duration: 'SHORT',
        slot: 5
      },
      7: {
        id: 7,
        break: false,
        start: '11:35',
        end: '12:20',
        name: 'Physik',
        subject: 3,
        room: 'A3',
        slot: 6
      },
      8: {
        id: 8,
        break: true,
        duration: 'LONG',
        slot: 7
      },
      9: {
        id: 9,
        break: false,
        start: '12:55',
        end: '13:40',
        name: 'Sport',
        subject: 4,
        room: 'A4',
        slot: 8
      },
      11: {
        id: 11,
        break: false,
        start: '13:50',
        end: '14:35',
        name: 'Sport',
        subject: 4,
        room: 'A4',
        slot: 10
      }
    },
    tuesday: {
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
    },
    wednesday: {
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
    },
    thursday: {
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
    },
    friday: {
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
    },
  };
  subjectKeys = Object.keys(this.subjects);
  filteredSubjectKeys = Object.keys(this.subjects);
  eventKeys = {};
  eventDays = {monday: 'Montag', tuesday: 'Dienstag', wednesday: 'Mittwoch', thursday: 'Donnerstag', friday: 'Freitag'};
  eventDayKeys = Object.keys(this.eventDays);

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
  ) {
    // eslint-disable-next-line guard-for-in
    for (const key in this.events) {
      this.eventKeys[key] = Object.keys(this.events[key]);
      this.eventKeys[key].sort((a, b) => this.events[key][a].slot - this.events[key][b].slot);
    }
  }

  ngOnInit() {
  }

  segmentChanged($event: any) {
    this.segment = $event.detail.value;
  }

  contrastColor(color: string) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const useBlack = (r * 0.299 + g * 0.587 + b * 0.114) > 186;
    return useBlack ? '#000000' : '#ffffff';
  }

  search(keys, dict, search, params) {
    const filteredKeys = [];
    if (search) {
      keys.forEach(key => {
        let match = false;
        params.forEach(param => {
          const toSearch = dict[key][param].substring(0, search.length);
          const dist = distance(toSearch, search, {caseSensitive: false});
          if (dist > 0.8) {
            match = true;
          }
        });
        if (match) {
          filteredKeys.push(key);
        }
      });
    } else {
      filteredKeys.push(...keys);
    }
    return filteredKeys;
  }

  searchSubjects() {
    const element = document.getElementById('searchSubjects') as HTMLInputElement;
    const searchTerm = element.value;
    this.filteredSubjectKeys = this.search(this.subjectKeys, this.subjects, searchTerm, ['name', 'teacher']);
  }

  addSubject() {
    this.modalController.create({
      component: ModalAddSubjectPage,
      componentProps: {
        subjects: this.subjects,
        subjectKeys: this.subjectKeys,
      },
      breakpoints: [0, 0.6],
      initialBreakpoint: 0.6,
      cssClass: 'modal-round',
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(result => {
        if (result.role !== 'cancel' && result.data) {
          const subject = result.data;
          subject.id = this.subjectKeys.length + 1;
          this.subjects[subject.id] = subject;
          this.subjectKeys.push(subject.id.toString());
          this.filteredSubjectKeys.push(subject.id.toString());
        }
      });
    });
  }

  reorder($event: any, day) {
    $event.detail.complete();
    const items = document.getElementsByClassName('monday-order');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.getAttribute('id');
      this.events[day][id].slot = i;
    }
    this.eventKeys[day].sort((a, b) => this.events[day][a].slot - this.events[day][b].slot);
    // sort events by slot
    console.log(this.eventKeys[day]);
    const sortedEvents = {};
    this.eventKeys[day].forEach(key => {
      sortedEvents[key] = this.events[day][key];
      console.log(key, this.events[day][key]);
    });
    this.events[day] = sortedEvents;
    console.log(sortedEvents);
  }
}
