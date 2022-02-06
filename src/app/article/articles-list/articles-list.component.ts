import { Component, OnInit } from '@angular/core';

import { ArticlesService } from "../articles.service";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles$ = this.articlesService.articles$;

  throttle = 300;
  distance = 10;

  limit = 10;
  page = 1;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    this.articlesService.getArticles(this.page, this.limit).subscribe();
  }
}
