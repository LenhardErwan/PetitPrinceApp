import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  private login: string;
  private passwd: string;
  private waiting: boolean;
  private keep: boolean;

  constructor(private authGuard: AuthGuardService, private toastCtrl: ToastController, private router: Router) {
    this.waiting = false;
    this.getSavedInfo();
  }

  ngOnInit() {}

  async getSavedInfo() {
    const data = await Storage.get({ key: 'authInfo' });
    const info = JSON.parse(data.value);
    if(info && info.keep) {
      this.login =info.login;
      this.passwd =info.passwd;
      this.keep = info.keep
    }
    else {
      this.login = this.passwd =  ""
      this.keep = true;
    }
  }

  async saveInfo(keep: boolean) {
    const o = keep ? {
      login: this.login,
      passwd: this.passwd,
      keep: this.keep
    } :
    {
      keep: this.keep
    }
    await Storage.set({
      key: 'authInfo',
      value: JSON.stringify(o)
    });
  }

  async connection() {
    if(this.login == "" || this.passwd == "") {
      if(this.login == "") this.toastError("Vous devez entrer un login");
      else if(this.passwd == "") this.toastError("Vous devez entrer un mot de passe");
      return;
    }
    this.waiting = true;

    try {
      let result = await this.authGuard.auth(this.login, this.passwd);
      if(result.error) this.toastError(result.error);
      else {
        if(!this.keep) this.login = this.passwd = ""; 
        this.saveInfo(this.keep);
        this.router.navigateByUrl('/tabs');
      }
    }
    catch(e) {
      this.toastError(`Erreur de connexion avec le serveur`);
    }

    this.waiting = false;
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

}
