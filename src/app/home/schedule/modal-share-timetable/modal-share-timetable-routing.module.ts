import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalShareTimetablePage } from './modal-share-timetable.page';

const routes: Routes = [
  {
    path: '',
    component: ModalShareTimetablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalShareTimetablePageRoutingModule {}
