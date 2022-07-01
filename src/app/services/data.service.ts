import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc, docData,
  Firestore,
  query, updateDoc,
  where
} from '@angular/fire/firestore';
import {Auth} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user;
  // subscribable ready
  isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.auth.onAuthStateChanged(user => {
      this.user = user;
      this.isReady.next(true);
    });
  }

  getSubjects() {
    const subjectsRef = collection(this.firestore, 'subjects');
    const que = query(subjectsRef, where('user', '==', this.user.uid));
    return collectionData(que, {idField: 'id'});
  }

  addSubject(subject) {
    subject.user = this.user.uid;
    const subjectsRef = collection(this.firestore, 'subjects');
    return addDoc(subjectsRef, subject);
  }

  deleteSubject(subjectID: string) {
    // TODO: delete event-connections
    const subjectRef = doc(this.firestore, `subjects/${subjectID}`);
    return deleteDoc(subjectRef);
  }

  getEvents() {
    const eventsRef = collection(this.firestore, `events`);
    const que = query(eventsRef, where('user', '==', this.user.uid));
    return collectionData(que, {idField: 'id'});
  }

  addEvent(event) {
    event.user = this.user.uid;
    const eventRef = collection(this.firestore, `events`);
    return addDoc(eventRef, event);
  }

  updateEvent(event: any) {
    const eventRef = doc(this.firestore, `events/${event.id}`);
    return updateDoc(eventRef, event);
  }

  deleteEvent(id) {
    const eventRef = doc(this.firestore, `events/${id}`);
    return deleteDoc(eventRef);
  }
}
