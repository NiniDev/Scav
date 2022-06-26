import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ModalAddSubjectPage} from './modal-add-subject/modal-add-subject.page';
import {ModalAddTimeslotPage} from './modal-add-timeslot/modal-add-timeslot.page';
import {DataService} from '../../services/data.service';
import {SharingService} from '../../services/sharing.service';
import {ModalShareTimetablePage} from './modal-share-timetable/modal-share-timetable.page';

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
    private sharingService: SharingService,
    private loadingController: LoadingController
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
    await this.modalController.create({
      component: ModalAddTimeslotPage,
      componentProps: {
        subjects: this.subjects,
        subjectKeys: this.subjectKeys,
        previousEnd: this.events[day]?.[this.eventKeys[day]?.[this.eventKeys[day]?.length - 1]]?.end,
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
          const prevSlot = this.events[day][this.eventKeys[day][this.eventKeys[day].length - 1]].slot
          timeslot['slot'] = prevSlot + 1;
          timeslot['day'] = day;
          this.dataService.addEvent(timeslot).then(() => {
            this.toastController.create({
              message: 'Event hinzugefügt',
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

  subjectDown() {
    this.subjectHold = new Date();
  }

  async shareTimetable() {
    const alert = await this.alertController.create({
      header: 'Stundenplan teilen',
      message: 'Wenn du deinen Stundenplan teilst, können andere Nutzer deinen Stundenplan inklusive Fächer etc. importieren.',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'Teilen',
          handler: () => {
            this.shareTimetableInternal();
          }
        }
      ]
    });
    await alert.present();
  }

  async shareTimetableInternal() {
    const loading = await this.loadingController.create({
      message: 'Stundenplan wird geteilt...',
    });
    await loading.present();
    this.sharingService.getTimetableSharingCode().then(code => {
      loading.dismiss();
      const m = this.modalController.create({
        component: ModalShareTimetablePage,
        componentProps: {
          code,
        },
        cssClass: 'modal-round',
        initialBreakpoint: 0.6,
        breakpoints: [0, 0.6],
      }).then(
        modal => modal.present()
      );
    });
  }
}
