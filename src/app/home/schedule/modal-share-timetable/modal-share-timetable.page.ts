import {Component, Input, OnInit} from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-modal-share-timetable',
  templateUrl: './modal-share-timetable.page.html',
  styleUrls: ['./modal-share-timetable.page.scss'],
})
export class ModalShareTimetablePage implements OnInit {
  @Input() code: string;

  constructor(
    private socialSharing: SocialSharing
  ) {
  }

  ngOnInit() {
  }

  shareMail() {
    this.socialSharing.shareViaEmail(
      `
        Hallo,

        Mit diesem Code kannst du dir meinen Stundenplan in <a href="https://discord.gg/FXxDhEVFZQ">Scav</a> importieren:
        <h1>${this.code}</h1>
      `,
      `${this.code}`,
      null
    );
  }


  shareWA() {
    this.socialSharing.shareViaWhatsApp(
      `
        Mit diesem Code kannst du dir meinen Stundenplan in Scav importieren:
        **${this.code}**
      `,
      null,
      null
    );
  }
}
