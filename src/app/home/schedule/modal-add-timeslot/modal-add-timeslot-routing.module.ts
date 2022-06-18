import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddTimeslotPage } from './modal-add-timeslot.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddTimeslotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddTimeslotPageRoutingModule {}
