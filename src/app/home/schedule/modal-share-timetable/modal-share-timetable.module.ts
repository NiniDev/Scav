import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalShareTimetablePageRoutingModule } from './modal-share-timetable-routing.module';

import { ModalShareTimetablePage } from './modal-share-timetable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalShareTimetablePageRoutingModule
  ],
  declarations: [ModalShareTimetablePage]
})
export class ModalShareTimetablePageModule {}
