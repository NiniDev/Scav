import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingPage } from './upcoming.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingPage
  },
  {
    path: 'modal-add-homework',
    loadChildren: () => import('./modal-add-homework/modal-add-homework.module').then( m => m.ModalAddHomeworkPageModule)
  },
  {
    path: 'modal-edit-homework',
    loadChildren: () => import('./modal-edit-homework/modal-edit-homework.module').then( m => m.ModalEditHomeworkPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingPageRoutingModule {}
