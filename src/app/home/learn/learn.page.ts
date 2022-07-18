import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
})
export class LearnPage implements OnInit {
  flashcardSets = {};
  flashcardSetKeys = Object.keys(this.flashcardSets);

  constructor(
    private dataService: DataService,
  ) {
    this.dataService.isReady.subscribe((r) => {
      if (!r) {
        return;
      }
      // get flashcardSets
      this.dataService.getFlashcardSets().subscribe(fcs => {
        this.flashcardSets = {};
        for (const key in fcs) {
          if (fcs.hasOwnProperty(key)) {
            this.flashcardSets[fcs[key].id] = fcs[key];
          }
        }
        this.flashcardSetKeys = Object.keys(this.flashcardSets);
      });
    });
  }

  ngOnInit() {
    const flashcardSet = {
      name: 'Flashcard Set 1',
      description: 'This is a flashcard set',
      flashcards: [],
    };
    // this.dataService.addFlashcardSet(flashcardSet).then(() => {
    //   console.log('added flashcard set');
    // });
  }

}
