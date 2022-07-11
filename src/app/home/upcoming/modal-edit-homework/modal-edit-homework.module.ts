import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditHomeworkPageRoutingModule } from './modal-edit-homework-routing.module';

import { ModalEditHomeworkPage } from './modal-edit-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditHomeworkPageRoutingModule
  ],
  declarations: [ModalEditHomeworkPage]
})
export class ModalEditHomeworkPageModule {}
