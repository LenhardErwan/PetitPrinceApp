import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthGuardService } from '../services/auth-guard.service';
import { APiInterfaceService } from '../services/api-interface.service';

import { ContactPage } from '../contact/contact.page';
import { ArticlePage } from './article/article.page';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})



export class ArticlesPage implements OnInit {
  private articles: Array<any>;
 
  constructor(private authGuard: AuthGuardService, private apiInt: APiInterfaceService, private modalCtrl: ModalController, private storage: Storage) {
    const data = apiInt.getData();
    if(data.articles) this.articles = data.articles;

    this.articles.sort( (a:any, b:any) => {
      return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1;
    })

    this.articles.forEach(article => {
      article.date_formated = new Date(Date.parse(article.date)).toLocaleString()
    });
    
  }

  ngOnInit() {
  }
  
  fav_change(event: any) {
    if (event.target.checked) { // Ajout aux favoris
      console.log("add fav")
    } else { // suppression des favoris
      console.log("del fav"); 
    }
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

}

