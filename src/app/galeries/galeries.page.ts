import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.page.html',
  styleUrls: ['./galeries.page.scss'],
})
export class GaleriesPage implements OnInit {
  private reponse: any;

  constructor(private http: HttpClient, private authGuard: AuthGuardService) {
    this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=classe1&mdp=mdp1')
      .subscribe((data) => {
        this.reponse = data;
        this.reponse = this.reponse.galeries;
        console.log(this.reponse);
      });
   }

  ngOnInit() {
  }

  logout() {
    this.authGuard.disconnect();
  }

}
