import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authInfo: any;

  constructor(private router: Router) {
    this.authInfo = {
      authenticated: false,
      login: null,
      passwd: null
    }
  }

  private setAuthenticated(value: boolean) {
    this.authInfo.authenticated = value;
  }

  private toogleAuth() {
    this.authInfo.authenticated = !this.authInfo.authenticated;
  }

  private setAuth(login: string, passwd: string) {
    this.authInfo.login = login;
    this.authInfo.passwd = passwd;
    this.setAuthenticated(true);
  }

  async auth(login: string, passwd: string) {
    let result = await fetch(`http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login=${login}&mdp=${passwd}`);
    let data = await result.json();

    if(data.resultat != "OK") return {auth: this.authInfo.authenticated, error: data.erreur};
    else {
      this.setAuth(login, passwd);
      return {auth: this.authInfo.authenticated, error: false};
    }
  }

  disconnect() {
    this.authInfo.authenticated = false;
    this.authInfo.login = null;
    this.authInfo.passwd = null;
    this.router.navigate(["auth"]);
  }

  canActivate(): boolean {
    if(!this.authInfo.authenticated) this.router.navigate(["auth"]);

    return this.authInfo.authenticated;
  }
}