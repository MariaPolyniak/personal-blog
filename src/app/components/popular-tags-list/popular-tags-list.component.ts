import { Component } from '@angular/core';
import { ArticlesService } from "../../services/articles.service";

@Component({
  selector: 'app-popular-tags-list',
  templateUrl: './popular-tags-list.component.html',
  styleUrls: ['./popular-tags-list.component.scss']
})
export class PopularTagsListComponent {
  popularTags$ = this.articlesService.popularTags$;

  constructor(private articlesService: ArticlesService) {}
}
