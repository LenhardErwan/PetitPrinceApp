import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthGuardService } from '../services/auth-guard.service';
import { APiInterfaceService } from '../services/api-interface.service';

import { ContactPage } from '../contact/contact.page';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.page.html',
  styleUrls: ['./galeries.page.scss'],
})
export class GaleriesPage implements OnInit {
  private galeries: any;

  constructor(private authGuard: AuthGuardService, private apiInt: APiInterfaceService, private modalCtrl: ModalController) {
    const data = apiInt.getData();
    if(data.galeries) this.galeries = data.galeries;

    this.galeries.sort( (a:any, b:any) => {
      return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
    })

    this.galeries.forEach(article => {
      article.date_formated = new Date(Date.parse(article.date)).toLocaleString()
    });

    console.log(this.galeries);

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
