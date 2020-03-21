import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  constructor(private authGuard: AuthGuardService, private apiInt: APiInterfaceService, private modalCtrl: ModalController, private toastCtrl: ToastController) {
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

  logout() {
    this.authGuard.disconnect();
  }

  async contact() {
    const modal = await this.modalCtrl.create({
      component: ContactPage
    });

    modal.present();
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

}
