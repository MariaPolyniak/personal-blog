import { Component, OnInit } from '@angular/core';

import { ArticlesService } from "../article/articles.service";

@Component({
  selector: 'app-popular-tags-list',
  templateUrl: './popular-tags-list.component.html',
  styleUrls: ['./popular-tags-list.component.scss']
})
export class PopularTagsListComponent implements OnInit {
  popularTags$ = this.articlesService.popularTags$;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    this.articlesService.getPopularTags().subscribe();;
  }
}
