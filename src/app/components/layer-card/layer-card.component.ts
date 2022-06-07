import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layer-card',
  templateUrl: './layer-card.component.html',
  styleUrls: ['./layer-card.component.scss'],
})
export class LayerCardComponent implements OnInit {
  @Input() top = '0';
  @Input() color_style = 'blue';

  constructor() { }

  ngOnInit() {}

}
