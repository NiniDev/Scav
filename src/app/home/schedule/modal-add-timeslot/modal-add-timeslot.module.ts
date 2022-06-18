import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddTimeslotPageRoutingModule } from './modal-add-timeslot-routing.module';

import { ModalAddTimeslotPage } from './modal-add-timeslot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddTimeslotPageRoutingModule
  ],
  declarations: [ModalAddTimeslotPage]
})
export class ModalAddTimeslotPageModule {}
