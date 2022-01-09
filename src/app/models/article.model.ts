export interface ArticleModel {
  _id: string,
  author: string,
  date: number,
  title: string,
  content: string,
  likes: number,
  tags: { _id: string; name: string }[]
}
