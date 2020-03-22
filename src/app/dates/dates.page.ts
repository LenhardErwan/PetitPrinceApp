import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, PopoverController  } from '@ionic/angular';
import { APiInterfaceService } from '../services/api-interface.service';

import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {
  private dates: any;

  constructor(private apiInt: APiInterfaceService, private modalCtrl: ModalController, private toastCtrl: ToastController, private popoverCtrl: PopoverController) {
    const data = apiInt.getData();
    if(data.dates) this.dates = data.dates;

    this.dates.sort( (a:any, b:any) => {
      return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
    })

    this.dates.forEach(dates => {
      dates.date_formated = new Date(Date.parse(dates.date)).toLocaleString()
    });
  }

  ngOnInit() {
  }

  async doRefresh(event) {
    try{
      const data:any = await this.apiInt.refreshData();

      if(data.articles) this.dates = data.articles;

      this.dates.sort( (a:any, b:any) => {
        return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
      })

      this.dates.forEach(article => {
        article.date_formated = new Date(Date.parse(article.date)).toLocaleString()
      });
    }
    catch (e) {
      this.toastError(`Erreur de connexion avec le serveur. Rechargement impossible !`);
    }
    finally {
      event.target.complete();
    }
  }

  async toastError(error: string) {
    const toast = await this.toastCtrl.create({
      message: error,
      duration: 4000,
      position: "bottom",
      color: "danger"
    });
    await toast.present();
  }

  async presentPopover(event: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: event,
      translucent: true
    });
    return await popover.present();
  }

}
