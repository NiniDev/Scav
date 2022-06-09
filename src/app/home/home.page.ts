import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {

  }
}
