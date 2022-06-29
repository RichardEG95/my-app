export interface IComment {
  id: number;
  email: string;
  comment: string;
  parentId?: number;
  comments?: Omit<IComment, 'comments'>[];
}
