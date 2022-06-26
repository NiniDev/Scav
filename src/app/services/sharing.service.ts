import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import {AvatarService} from './avatar.service';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  events;
  subjects;
  code;

  constructor(
    private dataService: DataService,
    private firestore: Firestore,
    private avatarService: AvatarService
  ) {
    this.dataService.isReady.subscribe(ready => {
      if (ready) {
        this.dataService.getEvents().subscribe(data => {
          this.events = data;
        });
        this.dataService.getSubjects().subscribe(data => {
          this.subjects = data;
        });
        this.avatarService.getUserProfile().subscribe(profile => {
          if (profile.sharedTimetableCode) {
            this.code = profile.sharedTimetableCode;
          } else {
            this.code = ''
          }
        });
      }
    });
  }

  async getTimetableSharingCode() {
    if (this.code) {
      return this.code;
    }
    return this.shareTimetable();
  }

  async shareTimetable() {
    const code = this.generateCode();

    const events = this.events.map(event => event.id);
    let subjects = this.subjects.filter(subj => this.events.find(evnt => evnt.subject === subj.id));
    subjects = subjects.map(subj => subj.id);
    const document = {
      code,
      events,
      subjects,
      user: this.dataService.user.uid
    };
    const timetableRef = doc(this.firestore, `shared/${this.dataService.user.uid}`);
    await setDoc(timetableRef, document, {merge: true});
    await this.avatarService.setSharedTimetableCode(code);
    for (const event of this.events) {
      await this.dataService.setShared('events', event.id);
    }
    for (const subject of this.subjects) {
      await this.dataService.setShared('subjects', subject.id);
    }
    return code;
  }

  generateCode() {
    // Format: 1234-1234
    const code = Math.floor(Math.random() * 10000) + '-' + Math.floor(Math.random() * 10000);
    return code;
  }
}
