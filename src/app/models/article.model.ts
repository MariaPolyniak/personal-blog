export interface ArticleModel {
  _id: string,
  author: {
    firstName: string;
    lastName: string;
  },
  date: number,
  title: string,
  content: string,
  likes: number,
  tags: { _id: string; name: string }[]
}
