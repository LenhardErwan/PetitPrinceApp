import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  @Input() title: string;
  @Input() date_formated: string;
  @Input() category: string;
  @Input() important: boolean;
  @Input() class: number;
  @Input() text: string;
  @Input() photos: Array<any>;

  constructor(private modalCtrl: ModalController) {
    console.log(this.title)
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
