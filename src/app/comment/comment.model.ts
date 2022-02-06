export interface AddComment {
  author: string,
  article: string,
  content: string,
}

export interface GetComment {
  _id: string,
  author: {
    _id: string,
    firstName: string,
    lastName: string
  },
  article: string,
  content: string,
  date: string
}

export interface Comment {
  _id: string,
  author: {
    _id: string,
    firstName: string,
    lastName: string
  },
  article: string,
  content: string,
  date: string,
  displayTime: string
}
