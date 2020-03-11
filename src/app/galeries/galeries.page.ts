import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.page.html',
  styleUrls: ['./galeries.page.scss'],
})
export class GaleriesPage implements OnInit {

  constructor(private authGuard: AuthGuardService) { }

  ngOnInit() {
  }

  logout() {
    this.authGuard.disconnect();
  }

}
