import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {AvatarService} from '../services/avatar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user;

  constructor(
    private datePipe: DatePipe,
    private authService: AuthService,
    private avatarService: AvatarService
  ) {}

  ngOnInit() {

  }
}
