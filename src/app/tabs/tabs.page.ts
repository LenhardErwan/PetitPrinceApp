import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private needTuto: boolean = true;

  constructor(private router: Router) {
    this.isNeededTuto();
  }

  async isNeededTuto() {
    const needed = await this.getSavedNeedTuto();
    if(needed) {
      this.router.navigateByUrl('/tuto');
    }
  }

  async getSavedNeedTuto() {
    const data = await Storage.get({ key: 'needTuto' });
    return data.value ? JSON.parse(data.value) : true;
  }
}
