import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.page.html',
  styleUrls: ['./galerie.page.scss'],
})
export class GaleriePage implements OnInit {

  @Input() title: string;
  @Input() date_formated: string;
  @Input() class: number;
  @Input() text: string;
  @Input() photos: Array<any>;  

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
