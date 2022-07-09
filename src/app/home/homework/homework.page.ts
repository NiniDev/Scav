import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalController, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements AfterViewInit {
  subjects = {};
  subjectKeys = Object.keys(this.subjects);
  homework = {};
  homeworkKeys = Object.keys(this.homework);
  events = {};
  eventKeys = {};
  filters = {
    subject: {
      display: 'Fach',
      value: 'ZtgwUo4C6tTIeX2FsTRq',
      property: 'subject',
      valueDisplay: 'De',
    },
    status: {
      display: 'Status',
      value: true,
      property: 'done',
      valueDisplay: 'Erledigt'
    }
  };
  filteredHomeworkKeys;

  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    this.dataService.isReady.subscribe((r) => {
      if (!r) {
        return;
      }
      // get subjects
      this.dataService.getSubjects().subscribe(subjects => {
        this.subjects = {};
        for (const key in subjects) {
          if (subjects.hasOwnProperty(key)) {
            this.subjects[subjects[key].id] = subjects[key];
          }
        }
        this.subjectKeys = Object.keys(this.subjects);
      });
      // get homework
      this.dataService.getHomework().subscribe(events => {
        this.homework = {};
        for (const key in events) {
          if (events.hasOwnProperty(key)) {
            this.homework[events[key].id] = events[key];
          }
        }
        this.homeworkKeys = Object.keys(this.homework);
        console.log(this.homework);
        this.filteredHomeworkKeys = this.applyFilters(this.homework, this.filters);
      });
      // get events
      dataService.getEvents().subscribe(events => {
        this.events = {};
        for (const key in events) {
          if (events.hasOwnProperty(key)) {
            this.events[events[key].id] = events[key];
          }
        }
        this.eventKeys = Object.keys(this.events);
      });
    });
  }

  ngAfterViewInit(): void {
    document.getElementById('trigger-done')?.addEventListener('click', () => {
      this.toggleStatusFilter(!this.filters.status.value);
    });
  }

  toggleStatusFilter(value) {
    this.filters.status.value = value;
    this.filters.status.valueDisplay = this.filters.status.value ? 'Erledigt' : 'Nicht Erledigt';
    this.filteredHomeworkKeys = this.applyFilters(this.homework, this.filters);
  }

  private applyFilters(homework: object, filters: object) {
    const appliedFilters = this.appliedFilters();
    console.log(appliedFilters);
    if (appliedFilters.length === 0) {
      return homework;
    }
    let filteredHomeworkKeys = Object.keys(homework);
    for (const filter of appliedFilters) {
      filteredHomeworkKeys = filteredHomeworkKeys.filter(key => homework[key][filters[filter].property] === filters[filter].value);
    }
    return filteredHomeworkKeys;
  }

  private getDiffDays(date: string) {
    const today = new Date();
    const until = new Date(date);
    return (Math.floor((until.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) + 1;
  }

  private appliedFilters() {
    return Object.keys(this.filters).filter(key => this.filters[key].value !== null);
  }

  private toggleSelection(s) {
    if (this.filters.subject.value === s) {
      this.filters.subject.value = null;
      this.popoverController.dismiss();
      return;
    }
    this.filters.subject.value = s;
    this.filters.subject.valueDisplay = this.subjects[s].name;
    this.filteredHomeworkKeys = this.applyFilters(this.homework, this.filters);

  }

  disableFilter(filter) {
    this.filters[filter].value = null;
    this.filteredHomeworkKeys = this.applyFilters(this.homework, this.filters);
  }
}
