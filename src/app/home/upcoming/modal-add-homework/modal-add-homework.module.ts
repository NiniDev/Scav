import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddHomeworkPageRoutingModule } from './modal-add-homework-routing.module';

import { ModalAddHomeworkPage } from './modal-add-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddHomeworkPageRoutingModule
  ],
  declarations: [ModalAddHomeworkPage]
})
export class ModalAddHomeworkPageModule {}
