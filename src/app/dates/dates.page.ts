import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthGuardService } from '../services/auth-guard.service';
import { APiInterfaceService } from '../services/api-interface.service';

import { ContactPage } from '../contact/contact.page';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {
  private dates: any;

  constructor(private authGuard: AuthGuardService, private apiInt: APiInterfaceService, private modalCtrl: ModalController) {
    const data = apiInt.getData();
    if(data.dates) this.dates = data.dates;

    this.dates.sort( (a:any, b:any) => {
      return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
    })

    this.dates.forEach(dates => {
      dates.date_formated = new Date(Date.parse(dates.date)).toLocaleString()
    });

    console.log(this.dates);

  }

  ngOnInit() {
  }

  logout() {
    this.authGuard.disconnect();
  }

  async contact() {
    const modal = await this.modalCtrl.create({
      component: ContactPage
    });

    modal.present();
  }

}
