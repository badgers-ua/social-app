export type Post = {
  _id: string;
  text: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type User = {
  readonly uid: string;
  readonly email?: string;
  readonly displayName?: string;
  readonly photoURL?: string;
};
