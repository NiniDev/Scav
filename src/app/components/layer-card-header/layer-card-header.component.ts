import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layer-card-header',
  templateUrl: './layer-card-header.component.html',
  styleUrls: ['./layer-card-header.component.scss'],
})
export class LayerCardHeaderComponent implements OnInit {
  @Input() color_style = 'blue';
  @Input() fade = '';
  @Input() header_height = '3.5rem';

  constructor() { }

  ngOnInit() {
  }

}
