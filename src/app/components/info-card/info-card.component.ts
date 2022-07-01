import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input() icon = '';
  @Input() icon_bg = '#3AD2A1';
  @Input() padding = '';
  @Input() extraClasses = '';

  constructor() { }

  ngOnInit() {}

}
