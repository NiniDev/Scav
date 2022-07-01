import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ModalController} from '@ionic/angular';
import {ModalAddHomeworkPage} from "./modal-add-homework/modal-add-homework.page";
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
    private dataService: DataService,
    private modalController: ModalController,
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
        this.homework = this.getOrderedHomework();
        console.log(this.homework);
        this.homeworkKeys = Object.keys(this.homework);
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
      const aDate = new Date(a.until);
      const bDate = new Date(b.until);
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
    return Math.abs(Math.floor((until.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) + 1;
  }

  addHomework() {
    this.modalController.create({
      component: ModalAddHomeworkPage,
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
        if (result.data && result.role === 'add') {
          result.data.since = new Date().getDate();
          result.data.done = false;
          this.dataService.addHomework(result.data).then(() => {
            console.log('added');
          });
        }
      });
    });
  }
}
