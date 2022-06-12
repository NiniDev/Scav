import { Component, OnInit } from '@angular/core';
var distance = require('jaro-winkler');

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  segment = 'subjects';
  subjects = {
    1: {
      id: 1,
      name: 'Mathe',
      abbr: 'Ma',
      color: '#0000ff',
      teacher: 'Dr. Mathias',
    },
    2: {
      id: 2,
      name: 'Deutsch',
      abbr: 'De',
      color: '#ff0000',
      teacher: 'Dr. Mathias2',
    },
    3: {
      id: 3,
      name: 'Physik',
      abbr: 'Ph',
      color: '#b700ff',
      teacher: 'Dr. Mathias3',
    },
    4: {
      id: 4,
      name: 'Sport',
      abbr: 'Sp',
      color: '#ffffff',
      teacher: 'Dr. Mathias4',
    }
  };
  subjectKeys = Object.keys(this.subjects);
  filteredSubjectKeys = Object.keys(this.subjects);

  constructor() { }

  ngOnInit() {
  }

  segmentChanged($event: any) {
    this.segment = $event.detail.value;
  }

  contrastColor(color: string) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const useBlack = (r*0.299 + g*0.587 + b*0.114) > 186;
    return useBlack ? '#000000' : '#ffffff';
  }

  search(keys, dict, search, params) {
    const filteredKeys = [];
    if (search) {
      keys.forEach(key => {
        const value = dict[key];
        let match = false;
        params.forEach(param => {
          const toSearch = dict[key][param].substring(0, search.length);
          const dist = distance(toSearch, search, { caseSensitive: false });
          if (dist > 0.8) {
            match = true;
          }
        });
        if (match) {
          filteredKeys.push(key);
        }
      });
    } else {
      filteredKeys.push(...keys);
    }
    return filteredKeys;
  }

  searchSubjects($event: any) {
    const element = document.getElementById('searchSubjects') as HTMLInputElement;
    const searchTerm = element.value;
    this.filteredSubjectKeys = this.search(this.subjectKeys, this.subjects, searchTerm, ['name', 'teacher']);
  }
}
