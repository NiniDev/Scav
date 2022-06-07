import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layer-card-body',
  templateUrl: './layer-card-body.component.html',
  styleUrls: ['./layer-card-body.component.scss'],
})
export class LayerCardBodyComponent implements OnInit {
  @Input() fade_header_height = '3.5rem';
  @Input() bottom_padding = '2.5rem';
  @Input() fade_header = '';
  headerh = '0';

  constructor() { }

  ngOnInit() {
    this.headerh = this.headerHeight();
  }

  headerHeight() {
    if (this.fade_header === 'fade') {
      return 'calc(' + this.fade_header_height + ' - 1rem)';
    }
    return '0';
  }

}
