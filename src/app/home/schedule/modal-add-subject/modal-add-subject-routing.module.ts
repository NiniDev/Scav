import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddSubjectPage } from './modal-add-subject.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddSubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddSubjectPageRoutingModule {}
