import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  private login: string;
  private passwd: string;
  private waiting: boolean;

  constructor(private authGuard: AuthGuardService, private toastCtrl: ToastController) {
    this.passwd = this.login = "";
    this.waiting = false;
  }

  ngOnInit() {}

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
        //ROUTE
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
