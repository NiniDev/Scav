import { Injectable } from '@angular/core';
import {getDownloadURL, ref, Storage, uploadString} from '@angular/fire/storage';
import {doc, docData, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';
import {Photo} from '@capacitor/camera';
import {Auth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,
    private storage: Storage,
    private firestore: Firestore
  ) {
  }

  getUser() {
    return this.auth.currentUser;
  }

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  async uploadImage(image: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, image.base64String, 'base64');
      const  imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {imageUrl}, {merge: true});
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  setUserName(name) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return setDoc(userDocRef, {displayName: name}, {merge: true});
  }
}
