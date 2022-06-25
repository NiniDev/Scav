import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePage } from './schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  },
  {
    path: 'modal-add-subject',
    loadChildren: () => import('./modal-add-subject/modal-add-subject.module').then( m => m.ModalAddSubjectPageModule)
  },
  {
    path: 'modal-add-timeslot',
    loadChildren: () => import('./modal-add-timeslot/modal-add-timeslot.module').then( m => m.ModalAddTimeslotPageModule)
  },  {
    path: 'modal-share-timetable',
    loadChildren: () => import('./modal-share-timetable/modal-share-timetable.module').then( m => m.ModalShareTimetablePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
