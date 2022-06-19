import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-add-timeslot',
  templateUrl: './modal-add-timeslot.page.html',
  styleUrls: ['./modal-add-timeslot.page.scss'],
})
export class ModalAddTimeslotPage implements OnInit {
  @Input() subjects: any;
  @Input() subjectKeys: any;

  start = '08:00';
  end = '08:45';
  subject;
  type = 'subject';
  breakDuration = 'short';

  constructor() { }

  ngOnInit() {
  }

}
