import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  reponse: any;
  photos: any;
  constructor(private http: HttpClient) { 
    this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=classe1&mdp=mdp1')
      .subscribe((data) => {
        this.reponse = data;
        this.reponse = this.reponse.articles;
        console.log(this.reponse);
      });

  }

  ngOnInit() {
  }






}

