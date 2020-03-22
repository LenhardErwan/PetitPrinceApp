import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AuthGuardService } from '../services/auth-guard.service';

import { ContactPage } from '../contact/contact.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private authGuard: AuthGuardService, private router: Router, private modalCtrl: ModalController, private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  logout() {
    this.authGuard.disconnect();
    this.close();
  }

  async contact() {
    const modal = await this.modalCtrl.create({
      component: ContactPage
    });

    modal.present();
    this.close();
  }

  tuto() {
    this.close();
    this.router.navigateByUrl('/tuto')
  }

  close() {
    this.popoverCtrl.dismiss();
  }

}
