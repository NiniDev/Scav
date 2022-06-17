import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddSubjectPageRoutingModule } from './modal-add-subject-routing.module';

import { ModalAddSubjectPage } from './modal-add-subject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddSubjectPageRoutingModule
  ],
  declarations: [ModalAddSubjectPage]
})
export class ModalAddSubjectPageModule {}
