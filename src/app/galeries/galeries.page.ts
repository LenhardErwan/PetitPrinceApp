import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, PopoverController  } from '@ionic/angular';
import { APiInterfaceService } from '../services/api-interface.service';

import { PopoverComponent } from '../popover/popover.component';
import { GaleriePage } from './galerie/galerie.page';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.page.html',
  styleUrls: ['./galeries.page.scss'],
})
export class GaleriesPage implements OnInit {
  private galeries: any;

  constructor(private apiInt: APiInterfaceService, private modalCtrl: ModalController, private toastCtrl: ToastController, private popoverCtrl: PopoverController) {
    const data = apiInt.getData();
    if(data.galeries) this.galeries = data.galeries;

    this.galeries.sort( (a:any, b:any) => {
      return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
    })

    this.galeries.forEach(article => {
      article.date_formated = new Date(Date.parse(article.date)).toLocaleString()
    });

  }

  ngOnInit() {
  }

  async viewComplete(e) {
    const modal = await this.modalCtrl.create({
      component: GaleriePage,
      componentProps: {
        title: e.titre,
        date_formated: e.date_formated,
        class: e.classe,
        text: e.texte,
        photos: e.photos
      }
    });

    modal.present();
  }

  async doRefresh(event) {
    try{
      const data:any = await this.apiInt.refreshData();

      if(data.articles) this.galeries = data.articles;

      this.galeries.sort( (a:any, b:any) => {
        return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
      })

      this.galeries.forEach(article => {
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
