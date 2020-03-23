import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ArticlesPageRoutingModule } from './articles-routing.module';

import { ArticlesPage } from './articles.page';
import { ArticlePageModule } from './article/article.module';
import { PopoverFavComponent } from './popover-fav/popover-fav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ArticlesPageRoutingModule,
    ArticlePageModule
  ],
  entryComponents: [PopoverFavComponent],
  declarations: [ArticlesPage, PopoverFavComponent]
})
export class ArticlesPageModule {}
