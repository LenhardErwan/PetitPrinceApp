import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthGuardService } from '../services/auth-guard.service';
import { ContactPage } from '../contact/contact.page';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  constructor(private authGuard: AuthGuardService, private modalCtrl: ModalController) {}

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
