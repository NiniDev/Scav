import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OverviewPageRoutingModule} from './overview-routing.module';

import {OverviewPage} from './overview.page';
import {LayerCardComponent} from '../../components/layer-card/layer-card.component';
import {LayerCardHeaderComponent} from '../../components/layer-card-header/layer-card-header.component';
import {LayerCardBodyComponent} from '../../components/layer-card-body/layer-card-body.component';
import {TimetableDayComponent} from '../../components/timetable-day/timetable-day.component';
import {TimetableDayHeaderComponent} from '../../components/timetable-day-header/timetable-day-header.component';
import {TimetableDayBodyComponent} from '../../components/timetable-day-body/timetable-day-body.component';
import {InfoCardComponent} from '../../components/info-card/info-card.component';
import {TimetableDayTimeslotComponent} from '../../components/timetable-day-timeslot/timetable-day-timeslot.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OverviewPageRoutingModule,
    ],
    exports: [
        InfoCardComponent,
        LayerCardComponent,
        LayerCardHeaderComponent,
        LayerCardBodyComponent,
        TimetableDayTimeslotComponent
    ],
    declarations: [OverviewPage,
      // eslint-disable-next-line max-len
        LayerCardComponent, LayerCardHeaderComponent, LayerCardBodyComponent, TimetableDayComponent, TimetableDayHeaderComponent, TimetableDayBodyComponent, InfoCardComponent, TimetableDayTimeslotComponent
    ]
})
export class OverviewPageModule {
}
