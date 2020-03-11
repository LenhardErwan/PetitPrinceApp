import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {

  constructor(private authGuard: AuthGuardService) { }

  ngOnInit() {
  }

  logout() {
    this.authGuard.disconnect();
  }

}
