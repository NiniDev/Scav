import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddHomeworkPage } from './modal-add-homework.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddHomeworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddHomeworkPageRoutingModule {}
