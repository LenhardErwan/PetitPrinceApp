import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { Storage } = Plugins;

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  confirm() {
    this.saveNeedTuto(false);
    this.router.navigateByUrl('/tabs')
  }

  async saveNeedTuto(needTuto: boolean) {
    await Storage.set({
      key: 'needTuto',
      value: JSON.stringify(needTuto)
    });
  }

}
