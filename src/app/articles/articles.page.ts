import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, PopoverController  } from '@ionic/angular';
import { APiInterfaceService } from '../services/api-interface.service';

import { PopoverComponent } from '../popover/popover.component';
import { ArticlePage } from './article/article.page';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private articles: Array<any>;

  constructor(private apiInt: APiInterfaceService, private modalCtrl: ModalController, private toastCtrl: ToastController, private popoverCtrl: PopoverController) {
    const data = apiInt.getData();
    if(data.articles) this.articles = data.articles;

    this.articles.sort( (a:any, b:any) => {
      return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
    })

    this.articles.forEach(async article => {
      article.date_formated = new Date(Date.parse(article.date)).toLocaleString();
      if (this.getSavedFav(article.id)) {
        article.fav = await this.getSavedFav(article.id);
      } else {
        await this.initFav(article.id);
        article.fav = await this.getSavedFav(article.id);
      }
      
    });
  }

  async initFav(id: string) {
    await Storage.set({
      key: 'fav_' + id,
      value: 'false'
    });
  }

  async setFav(artc: any) {
    if (artc.fav) {
      await Storage.set({
        key: 'fav_' + artc.id,
        value: 'false'
      });
    } else {
      await Storage.set({
        key: 'fav_' + artc.id,
        value: 'true'
      });
    }
  }

  async getSavedFav(id: string) {
    const data = await Storage.get({ key: 'fav_'+id });
    return data.value ? JSON.parse(data.value) : false;
  }

  ngOnInit() {
  }

  fav_change(artc: any) {
    console.log(artc.fav)
    this.setFav(artc);
    this.articles.forEach(async article => {
      if (article.id == artc.id) {
        article.fav = !article.fav;
      }
    });
  }

  async viewComplete(e) {
    const modal = await this.modalCtrl.create({
      component: ArticlePage,
      componentProps: {
        title: e.titre,
        date_formated: e.date_formated,
        category: e.categorie,
        important: e.important,
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

      if(data.articles) this.articles = data.articles;

      this.articles.sort( (a:any, b:any) => {
        return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
      })

      this.articles.forEach(article => {
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

