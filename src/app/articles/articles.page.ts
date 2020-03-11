import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthGuardService } from '../services/auth-guard.service';
import { ContactPage } from '../contact/contact.page';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private reponse: any;

  constructor(private authGuard: AuthGuardService, private modalCtrl: ModalController, private http: HttpClient) {
    this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=classe1&mdp=mdp1')
      .subscribe((data) => {
        this.reponse = data;
        this.reponse = this.reponse.articles;

        this.reponse.forEach(article => {
          article.date_formated = new Date(Date.parse(article.date)).toLocaleString()
        });
        console.log(this.reponse);
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

}

