import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-fav',
  templateUrl: './popover-fav.component.html',
  styleUrls: ['./popover-fav.component.scss'],
})
export class PopoverFavComponent implements OnInit {
  @Input() onlyFav: boolean;
  @Input() setOnlyFav: Function;

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {}

  close() {
    this.popoverCtrl.dismiss();
  }

  HandleChangeFav() {
    this.setOnlyFav(this.onlyFav);
  }

}
