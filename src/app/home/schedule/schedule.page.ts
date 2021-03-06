import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {ModalAddSubjectPage} from './modal-add-subject/modal-add-subject.page';
import {ModalAddTimeslotPage} from './modal-add-timeslot/modal-add-timeslot.page';
import {DataService} from '../../services/data.service';

const distance = require('jaro-winkler');

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  segment = 'timetable';

  subjects = {};
  subjectKeys = Object.keys(this.subjects);
  selectedSubjects: any = [];
  filteredSubjectKeys = Object.keys(this.subjects);

  events = {};
  eventKeys = {};

  eventDays = {monday: 'Montag', tuesday: 'Dienstag', wednesday: 'Mittwoch', thursday: 'Donnerstag', friday: 'Freitag'};
  eventDayKeys = Object.keys(this.eventDays);

  maxSlot = 0;
  maxSlotKeys = [];
  showTime = false;

  subjectHold;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private dataService: DataService,
  ) {
    this.sortEvents();
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
        this.subjectKeys = Object.keys(this.subjects);
        this.filteredSubjectKeys = Object.keys(this.subjects);
      });

      dataService.getEvents().subscribe(events => {
        this.events = {};
        this.eventKeys = [];
        for (const key in events) {
          if (events.hasOwnProperty(key)) {
            if (!this.events[events[key].day]) {
              this.events[events[key].day] = {};
            }
            if (!this.eventKeys[events[key].day]) {
              this.eventKeys[events[key].day] = [];
            }
            this.events[events[key].day][events[key].id] = events[key];
            this.eventKeys[events[key].day].push(events[key].id);
          }
        }
        this.sortEvents();
      });
    });
  }

  getCommonStartTime(slot) {
    const startTime = [];
    for (const day in this.events) {
      for (const key in this.events[day]) {
        if (this.events[day][key].slot === slot) {
          startTime.push(this.events[day][key].start);
        }
      }
    }
    // get most frequent start time
    const counts = {};
    startTime.forEach(time => {
        if (!counts[time]) {
          counts[time] = 0;
        }
        counts[time]++;
      }
    );
    if (Object.keys(counts).length === 0) {
      return '';
    }
    const max = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return max ? max : '';
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
      breakpoints: [0, 0.6, 1, 0.3],
      initialBreakpoint: 0.6,
      cssClass: 'modal-round',
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(result => {
        if (result.role !== 'cancel' && result.data) {
          this.dataService.addSubject(result.data).then(() => {
            this.toastController.create({
              message: 'Fach hinzugef??gt',
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
      this.dataService.updateEvent(this.events[day][id]);
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
    let prevEnd;
    let prevSlot;
    try {
      prevSlot = this.events[day][this.eventKeys[day][this.eventKeys[day]?.length - 1]].slot;
    } catch (e) {
      prevSlot = -1;
    }
    if (this.getCommonStartTime(prevSlot + 1) !== '') {
      prevEnd = this.getCommonStartTime(prevSlot + 1);
    } else {
      for (let i = this.eventKeys[day]?.length - 1; i >= 0; i--) {
        if (this.events[day]?.[this.eventKeys[day]?.[i]]?.end) {
          prevEnd = this.events[day]?.[this.eventKeys[day]?.[i]]?.end;
          break;
        }
      }
    }
    await this.modalController.create({
      component: ModalAddTimeslotPage,
      componentProps: {
        subjects: this.subjects,
        subjectKeys: this.subjectKeys,
        previousEnd: prevEnd,
      },
      breakpoints: [0, 0.6, 1, 0.3],
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
          timeslot['slot'] = prevSlot + 1;
          timeslot['day'] = day;
          this.dataService.addEvent(timeslot).then(() => {
            this.toastController.create({
              message: 'Event hinzugef??gt',
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

  toggleSubjectSelection(subject) {
    // TODO: add animation
    const oldDate = this.subjectHold;
    this.subjectHold = new Date();
    if (this.selectedSubjects.length > 0) {
    } else {
      if (!(this.subjectHold - oldDate > 450)) {
        return;
      }
    }
    if (this.selectedSubjects.includes(subject)) {
      this.selectedSubjects = this.selectedSubjects.filter(s => s !== subject);
    } else {
      this.selectedSubjects.push(subject);
    }
  }

  deleteSubjects() {
    this.alertController.create({
      header: 'F??cher L??schen',
      message: 'M??chtest du die ausgew??hlten F??cher (' +
        this.selectedSubjects.map(s => this.subjects[s].name).join(', ') +
        ') l??schen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'L??schen',
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
          this.dataService.deleteEvent(event);
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
    this.dataService.deleteEvent(event).then(() => {
      this.toastController.create({
        message: 'Event gel??scht',
        duration: 3000,
        position: 'bottom',
      }).then(toast => toast.present());
    });
  }

  subjectDown() {
    this.subjectHold = new Date();
  }
}
