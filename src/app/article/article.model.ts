export interface ArticleModel {
  _id: string,
  author: {
    _id: string;
    avatarId: string;
    firstName: string;
    lastName: string;
  },
  date: number,
  title: string,
  content: string,
  likes: number,
  liked: boolean,
  tags: string[],
  pictureId: string;
}

export interface CreateOrUpdateArticleModel {
  title: string;
  content: string;
  picture: File | null;
  tags: string[] | string;
}
