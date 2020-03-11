import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  constructor(private authGuard: AuthGuardService) {}

  ngOnInit() {
  }

  logout() {
    this.authGuard.disconnect();
  }

}
