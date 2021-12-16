export interface ArticleModel {
  id: number,
  author: string,
  date: number,
  title: string,
  content: string,
  likesAmount: number,
  tagList: string[]
}
