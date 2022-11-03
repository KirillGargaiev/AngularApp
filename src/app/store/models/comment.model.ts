export interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  text: string,
  fatherId?: number,
}
