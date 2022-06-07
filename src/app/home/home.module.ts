import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {LayerCardComponent} from '../components/layer-card/layer-card.component';
import {LayerCardBodyComponent} from '../components/layer-card-body/layer-card-body.component';
import {LayerCardHeaderComponent} from '../components/layer-card-header/layer-card-header.component';
import {InfoCardComponent} from '../components/info-card/info-card.component';
import {TimetableDayComponent} from '../components/timetable-day/timetable-day.component';
import {TimetableDayHeaderComponent} from '../components/timetable-day-header/timetable-day-header.component';
import {TimetableDayBodyComponent} from '../components/timetable-day-body/timetable-day-body.component';
import {TimetableDayTimeslotComponent} from '../components/timetable-day-timeslot/timetable-day-timeslot.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,
    LayerCardComponent,
    LayerCardBodyComponent,
    LayerCardHeaderComponent,
    InfoCardComponent,
    TimetableDayComponent,
    TimetableDayHeaderComponent,
    TimetableDayBodyComponent,
    TimetableDayTimeslotComponent]
})
export class HomePageModule {
}
