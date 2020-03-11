import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { APiInterfaceService } from './api-interface.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authInfo: any;

  constructor(private router: Router, private apiInt: APiInterfaceService) {
    this.authInfo = {
      authenticated: false,
      login: null,
      passwd: null
    }
  }

  private setAuthenticated(value: boolean) {
    this.authInfo.authenticated = value;
  }

  private setAuth(login: string, passwd: string) {
    this.authInfo.login = login;
    this.authInfo.passwd = passwd;
    this.setAuthenticated(true);
  }

  async auth(login: string, passwd: string) {
    let result = await this.apiInt.connection(login, passwd);
    if( result.success ) this.setAuth(login, passwd);

    return {auth: this.authInfo.authenticated, error: result.error};
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

  get info() {
    return new Map().set("login", this.authInfo.login).set("mdp", this.authInfo.passwd);
  }
}