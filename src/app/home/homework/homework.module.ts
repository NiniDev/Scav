import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworkPageRoutingModule } from './homework-routing.module';

import { HomeworkPage } from './homework.page';
import {OverviewPageModule} from "../overview/overview.module";
import {NgArrayPipesModule, NgObjectPipesModule} from "ngx-pipes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworkPageRoutingModule,
    OverviewPageModule,
    NgObjectPipesModule,
    NgArrayPipesModule
  ],
  declarations: [HomeworkPage]
})
export class HomeworkPageModule {}
