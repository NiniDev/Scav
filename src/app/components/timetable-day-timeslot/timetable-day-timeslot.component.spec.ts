import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimetableDayTimeslotComponent } from './timetable-day-timeslot.component';

describe('TimetableDayTimeslotComponent', () => {
  let component: TimetableDayTimeslotComponent;
  let fixture: ComponentFixture<TimetableDayTimeslotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableDayTimeslotComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimetableDayTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
