import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, PopoverController  } from '@ionic/angular';
import { APiInterfaceService } from '../services/api-interface.service';

import { PopoverComponent } from '../popover/popover.component';
import { PopoverFavComponent } from './popover-fav/popover-fav.component'
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
  private showedArticles: Array<any>;
  private onlyFav: boolean = false;
  private filter: string = "";

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

    this.showedArticles = this.articles;
  }

  async initFav(id: string) {
    await Storage.set({
      key: 'fav_' + id,
      value: 'false'
    });
  }

  async setFav(artc: any) {
    const value = !artc.fav;
    await Storage.set({
      key: 'fav_' + artc.id,
      value: JSON.stringify(value)
    });
  }

  async getSavedFav(id: string) {
    const data = await Storage.get({ key: 'fav_'+id });
    return data.value ? JSON.parse(data.value) : false;
  }

  ngOnInit() {
  }

  fav_change(artc: any) {
    this.setFav(artc);
    this.articles.forEach(async article => {
      if (article.id == artc.id) {
        article.fav = !article.fav;
      }
    });
    this.sortArtcileFilter();
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

  async doRefresh(event: any) {
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

  sortArtcileFilter() {
    this.showedArticles = new Array();

    this.articles.forEach(article => {
      if(article.titre.toLowerCase().includes(this.filter) || article.texte.toLowerCase().includes(this.filter)) {
        if(this.onlyFav) {
          if(article.fav) this.showedArticles.push(article);
        }
        else {
          this.showedArticles.push(article);
        }
      }
    });
  }

  handleChangeSearch(e: any) {
    this.filter = e.detail.value.toLowerCase();
    this.sortArtcileFilter();
  }

  setOnlyFav(bool: boolean) {
    this.onlyFav = bool;
    this.sortArtcileFilter();
  }

  async popoverOnlyFav(event: any) {
    let popover = await this.popoverCtrl.create({
      component: PopoverFavComponent,
      event: event,
      translucent: true,
      componentProps: {
        onlyFav: this.onlyFav,
        setOnlyFav: this.setOnlyFav.bind(this)
      }
    });

    return await popover.present();
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

