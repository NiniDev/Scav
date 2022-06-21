import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {ModalAddSubjectPage} from './modal-add-subject/modal-add-subject.page';
import {ModalAddTimeslotPage} from './modal-add-timeslot/modal-add-timeslot.page';
import {DataService} from "../../services/data.service";

const distance = require('jaro-winkler');

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  segment = 'subjects';
  subjects = {};
  events = {
    monday: {
      1011: {
        id: 1011,
        break: true,
        duration: 'SHORT',
        slot: 10
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
        slot: 17
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
  maxSlot = 0;
  maxSlotKeys = [];
  showTime: boolean = false;
  selectedSubjects: any = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private dataService: DataService,
  ) {
    this.sortEvents();
    this.dataService.isReady.subscribe((r) => {
      if (!r) {return;}
      this.dataService.getSubjects().subscribe(subjects => {
        this.subjects = {};
        for (const key in subjects) {
          if (subjects.hasOwnProperty(key)) {
            this.subjects[subjects[key].id] = subjects[key];
          }
        }
        this.subjectKeys = Object.keys(this.subjects);
        this.filteredSubjectKeys = Object.keys(this.subjects);
        console.log(this.subjects);
      });
    });
  }

  sortEvents() {
    for (const key in this.events) {
      this.eventKeys[key] = Object.keys(this.events[key]);
      this.eventKeys[key].sort((a, b) => this.events[key][a].slot - this.events[key][b].slot);
      if (this.eventKeys[key].length > this.maxSlot) {
        this.maxSlot = this.eventKeys[key].length;
        this.maxSlotKeys = Array(this.maxSlot).fill(0).map((_, i) => i);
      }
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
    // Add selected
    this.selectedSubjects.forEach(subject => {
      this.filteredSubjectKeys.push(subject);
    });
    // remove empty
    this.filteredSubjectKeys.forEach(key => {
      if (key.length < 0) {
        this.filteredSubjectKeys.splice(this.filteredSubjectKeys.indexOf(key), 1);
      }
    });
    // sort by if selected
    this.filteredSubjectKeys.sort((a, b) => {
      if (this.selectedSubjects.includes(a) && !this.selectedSubjects.includes(b)) {
        return -1;
      } else if (!this.selectedSubjects.includes(a) && this.selectedSubjects.includes(b)) {
      }
    });
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
          this.dataService.addSubject(result.data).then(() => {
            this.toastController.create({
              message: 'Fach hinzugefügt',
              duration: 4000,
              position: 'bottom',
              color: 'success'
            }).then(toast => {
              toast.present();
            });
          });
        }
      });
    });
  }

  reorder($event: any, day) {
    $event.detail.complete();
    const items = document.getElementsByClassName(day + '-order');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.getAttribute('id');
      this.events[day][id].slot = i;
    }
    this.eventKeys[day].sort((a, b) => this.events[day][a].slot - this.events[day][b].slot);
    // sort events by slot
    const sortedEvents = {};
    this.eventKeys[day].forEach(key => {
      sortedEvents[key] = this.events[day][key];
    });
    this.events[day] = sortedEvents;
  }

  async addTimeslot(day) {
    await this.modalController.create({
      component: ModalAddTimeslotPage,
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
          const timeslot = {};
          if (result.data.type === 'break') {
            timeslot['break'] = true;
            timeslot['duration'] = result.data.breakDuration;
          }
          if (result.data.type === 'subject') {
            timeslot['break'] = false;
            timeslot['start'] = result.data.start;
            timeslot['end'] = result.data.end;
            timeslot['name'] = this.subjects[result.data.subject].name;
            timeslot['subject'] = result.data.subject;
            timeslot['room'] = result.data.room;
          }
          const prevSlot = this.events[day][this.eventKeys[day][this.eventKeys[day].length - 1]].slot
          timeslot['slot'] = prevSlot + 1;
          const id = this.eventKeys[day].length + 1; // TODO: let firebase generate id
          this.events[day][id] = timeslot;
          this.eventKeys[day].push(id.toString());
          this.filteredSubjectKeys.push(id.toString());
          this.sortEvents();
        }
      });
    });
  }

  toggleSubjectSelection(subject) {
    // TODO: add animation
    if (this.selectedSubjects.includes(subject)) {
      this.selectedSubjects = this.selectedSubjects.filter(s => s !== subject);
    } else {
      this.selectedSubjects.push(subject);
    }
  }

  deleteSubjects() {
    this.alertController.create({
      header: 'Fächer Löschen',
      message: 'Möchtest du die ausgewählten Fächer (' +
        this.selectedSubjects.map(s => this.subjects[s].name).join(', ') +
        ') löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'Löschen',
          handler: () => {
            for (const subject of this.selectedSubjects) {
              this.deleteSubject(subject);
            }
            this.selectedSubjects = [];
          }
        }
      ]
    }).then(a => a.present());
  }

  deleteSubject(subjectID) {
    let usageCount = 0;
    for (const day in this.events) {
      for (const event in this.events[day]) {
        if (this.events[day][event].subject == subjectID) {
          usageCount++;
          delete this.events[day][event];
          console.log("event");
          this.eventKeys[day] = this.eventKeys[day].filter(key => key !== event);
        }
      }
    }
    if (usageCount > 0) {
      this.toastController.create({
        message: 'Es wurde ein Zeitraum von deinem Stundenplan entfernt, ' +
          'da das Fach ' + this.subjects[subjectID].name + ' nicht mehr vorhanden ist. (' + usageCount + ')',
        duration: 3000,
        position: 'bottom',
      }).then(toast => toast.present());
    }
    this.dataService.deleteSubject(subjectID);
    this.sortEvents();
  }

  deleteEvent(day, event) {
    delete this.events[day][event];
    this.eventKeys[day] = this.eventKeys[day].filter(key => key !== event);
    this.filteredSubjectKeys = this.filteredSubjectKeys.filter(key => key !== event);
    this.sortEvents();
  }
}
